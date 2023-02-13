import { useEffect, useMemo, useState, useCallback } from "react";
import { ResponseWithPagination, Video, IVideoListType } from "_/types";

// Redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "_/features/hooks";

import { selectAllVideos, setVideos } from "_/features/videos/videosSlice";
import { setAccounts } from "_/features/accounts/accountsSlice";

// services
import { useGetVideoListQuery } from "_/services/video";

type FetchApiFunc<T> = (page?: number) => Promise<ResponseWithPagination<T> | undefined>;
// type Status = "idle" | "pending" | "resolved" | "error";

enum Status {
    IDLE = "idle",
    PENDING = "pending",
    RESOLVED = "resolved",
    ERROR = "error"
}

/**
 * fetchApi, onSuccess function must be memoized, otherwise component will re-render infinitely
*/
const usePagesFetch = <T extends { id: number }> (
        fetchApi: FetchApiFunc<T>,
        pauseCallCheck: boolean = false,
        options: Partial<{
            errorMessage: string,
            reachEndFunc: () => void,
            /**
             * This function must be memoized, otherwise the component will re-render infinitely
             */
            onSuccess: (result: T[]) => void
        }>
    ) => {
    const {
        reachEndFunc = () => { },
        onSuccess
    } = options;

    const [results, setResults] = useState<T[]>([]);

    const [status, setStatus] = useState<Status>(Status.IDLE);

    const [page, setPage] = useState<number>(-1);
    const [totalPage, setTotalPage] = useState<number>(1);

    const saveResults = useMemo(() => {
        const hashMapResults = new Map<number, T>([]);
        results.forEach((result) => {
            hashMapResults.set(result.id, result);
        })

        return Array.from(hashMapResults.values());
    }, [results]);

    const handleFetchNext = () => {
        if (pauseCallCheck) return;

        if (page >= totalPage) {
            reachEndFunc();
            return;
        }

        if(status === Status.PENDING) return;
        setStatus(Status.PENDING);

        fetchApi(page + 1)
            .then((data) => {
                if (!data) return;

                setResults((prev) => [...prev, ...data.data]);

                const currentPage = data.meta.pagination.current_page;

                setPage(currentPage);
                if (onSuccess) onSuccess(data.data);
                setStatus(Status.RESOLVED);
            })
            .catch(() => {
                setStatus(Status.ERROR);

                console.log("Error: ", options.errorMessage);
            })
    }

    const refetch = useCallback(() => {
        setStatus(Status.PENDING);
        fetchApi()
            .then((data) => {
                if (!data) return;

                setResults(data.data);

                //
                const currentPage = data.meta.pagination.current_page;
                const total = data.meta.pagination.total_pages;

                setPage(currentPage);
                setTotalPage(total);

                setStatus(Status.RESOLVED);
                if (onSuccess) onSuccess(data.data);
            })
            .catch(() => {
                setStatus(Status.ERROR);
                console.log("Error: ", options.errorMessage);
            })
    }, [fetchApi, onSuccess, options.errorMessage]);

    //
    useEffect(() => {
        if (pauseCallCheck) return;

        setStatus(Status.PENDING);

        fetchApi()
            .then((data) => {
                if (!data) return;

                setResults(data.data);

                //
                const currentPage = data.meta.pagination.current_page;
                const total = data.meta.pagination.total_pages;

                setPage(currentPage);
                setTotalPage(total);

                setStatus(Status.RESOLVED);
                if (onSuccess) onSuccess(data.data);
            })
            .catch(() => {
                setStatus(Status.ERROR);
                console.log("Error: ", options.errorMessage);
            })
    }, [pauseCallCheck, fetchApi, options.errorMessage, onSuccess]);


    return {
        results: saveResults,
        idle: status === Status.IDLE,
        loading: status === Status.PENDING,
        error: status === Status.ERROR,
        hasMore: page < totalPage,
        end: page >= totalPage,
        setResults,
        setPage,
        handleFetchNext,
        refetch
    }
};

export default usePagesFetch

// ==================================================================================
export const usePagesFetch__videos =
    <T extends Video>(
        fetchApi: FetchApiFunc<T>,
        pauseCallCheck: boolean = false,
        options: Partial<{
            errorMessage: string,
            reachEndFunc: () => void
        }>
    ) => {
    const { reachEndFunc = () => { } } = options;

    const videos = useSelector(selectAllVideos);
    const dispatch = useAppDispatch();

    const [status, setStatus] = useState<Status>(Status.IDLE);

    const [page, setPage] = useState<number>(-1);
    const [totalPage, setTotalPage] = useState<number>(1);

    const f = useCallback(async (page: number) => {
        setStatus(Status.PENDING);

        try {
            const data = await fetchApi(page + 1);

            if(!data) return null;

            dispatch(setVideos(data.data));
            dispatch(setAccounts(data.data.map(vids => vids.user)))

            const currentPage = data.meta.pagination.current_page;

            setPage(currentPage);
            setStatus(Status.RESOLVED)
            
            return data;
        } catch(e: any) {
            console.log("Error: ", options.errorMessage);
            setStatus(Status.ERROR);

            throw new Error(options.errorMessage);
        }
    }, [dispatch, fetchApi, options.errorMessage]);

    const handleFetchNext = () => {
        if (pauseCallCheck) return;

        if (page >= totalPage) {
            reachEndFunc();
            return;
        }

        f(page);
    }

    useEffect(() => {
        if (pauseCallCheck) return;

        f(page)
        .then((data) => {
            if(!data) return;

            const total = data.meta.pagination.total_pages;
            setTotalPage(total);
        });

    }, [pauseCallCheck, f, page]);

    return {
        results: videos,
        loading: status === Status.PENDING,
        error: status === Status.ERROR,
        hasMore: page < totalPage,
        end: page >= totalPage,
        setPage,
        handleFetchNext
    }
};

// ==================================================================================
export const useInfiniteScrollVideosQuery =
    (
        type: IVideoListType = "for-you",
        pauseCallCheck: boolean = false,
        options: Partial<{
            errorMessage: string,
            reachEndFunc: () => void,
        }>
    ) => {
    const { reachEndFunc = () => { } } = options;

    const videos = useSelector(selectAllVideos);
    const dispatch = useAppDispatch();

    const [page, setPage] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);

    const { data, isLoading, isError } = useGetVideoListQuery({
      type: type,
      page: page + 1
    });

    //
    // const location = useLocation();

    const handleFetchNext = () => {
        if (pauseCallCheck) return;

        if (page >= totalPage) {
            reachEndFunc();
            return;
        }

        setPage((page) => page + 1);
    }

    useEffect(() => {
        if (pauseCallCheck) return;

        // let lastAction;
        // if(typeof location.state === "object" && location.state) {
        //     let locationState = location.state as ILocationState;
        //     lastAction = locationState.action;
        //     console.log("lastAction", lastAction);
        // }
        // console.log({l: location.state, lastAction});
        // && lastAction === undefined

        if (data) {
            // dispatch(resetVideos());
            // dispatch(clearVideoId());

            dispatch(setVideos(data.data));
            dispatch(setAccounts(data.data.map(vids => vids.user)))
        }

    }, [pauseCallCheck, data, dispatch]);

    useEffect(() => {
        if(data) {
            setTotalPage(data.meta.pagination.total_pages);
        }
    }, [data]);

    return {
        results: videos,
        loading: isLoading,
        error: isError,
        hasMore: page < totalPage,
        end: page >= totalPage,
        setPage,
        handleFetchNext
    }
};


/*
   dependencies should contain 'videos.length'.
   Redux actions of videoSlice make 'videos' changes.
   Meanwhile RTK Query memoized API calls' result so that 'data' doesn't change often.
   => This callback doesn't execute properly
        makes 'videos' act not right
        makes UI not show videos correctly
*/