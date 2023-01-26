import { useEffect, useMemo, useState, useCallback } from "react";
import { ResponseWithPagination, Video, IVideoListType } from "_/types";

// Redux
import { useAppDispatch } from "_/features/hooks";
import { selectAllVideos, setVideos } from "_/features/videos/videosSlice";
import { useSelector } from "react-redux";
import { setAccounts } from "_/features/accounts/accountsSlice";

// services
import { useGetVideoListQuery } from "_/services/video";

// type Data<T> = ResponseWithPagination<T>;
type FetchApiFunc<T> = (page?: number) => Promise<ResponseWithPagination<T> | undefined>;

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
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
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

        if (loading) return;

        setLoading(true);
        fetchApi(page + 1)
            .then((data) => {
                if (!data) return;

                setResults((prev) => [...prev, ...data.data]);

                const currentPage = data.meta.pagination.current_page;

                setPage(currentPage);
                if (onSuccess) onSuccess(data.data);
                setError(false);
            })
            .catch(() => {
                setError(true);
                console.log("Error: ", options.errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const refetch = useCallback(() => {
        setLoading(true);
        fetchApi()
            .then((data) => {
                if (!data) return;

                setResults(data.data);

                //
                const currentPage = data.meta.pagination.current_page;
                const total = data.meta.pagination.total_pages;

                setPage(currentPage);
                setTotalPage(total);

                setError(false);
                if (onSuccess) onSuccess(data.data);
            })
            .catch(() => {
                setError(true);
                console.log("Error: ", options.errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [fetchApi, onSuccess, options.errorMessage]);

        //
    useEffect(() => {
        if (pauseCallCheck) return;

        setLoading(true);
        fetchApi()
            .then((data) => {
                if (!data) return;

                setResults(data.data);

                //
                const currentPage = data.meta.pagination.current_page;
                const total = data.meta.pagination.total_pages;

                setPage(currentPage);
                setTotalPage(total);

                setError(false);
                if (onSuccess) onSuccess(data.data);
            })
            .catch(() => {
                setError(true);
                console.log("Error: ", options.errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [pauseCallCheck, fetchApi, options.errorMessage, onSuccess]);


    return {
        results: saveResults,
        loading,
        error,
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
        reachEndFunc: () => void,

    }>
    ) => {
    const { reachEndFunc = () => { } } = options;

    const videos = useSelector(selectAllVideos);
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [page, setPage] = useState<number>(-1);
    const [totalPage, setTotalPage] = useState<number>(1);

    const handleFetchNext = () => {
        if (pauseCallCheck) return;

        if (page >= totalPage) {
            reachEndFunc();
            return;
        }

            // user scrolls too fast, faster than setLoading update
            // if (loading) return;

        setLoading(true);
        fetchApi(page + 1)
        .then((data) => {
            if (!data) return;

            dispatch(setVideos(data.data));
            dispatch(setAccounts(data.data.map(vids => vids.user)))

            const currentPage = data.meta.pagination.current_page;

            setPage(currentPage);
            setError(false);
        })
        .catch(() => {
            console.log("Error: ", options.errorMessage);
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        });
    }

        //
    useEffect(() => {
        if (pauseCallCheck) return;

        setLoading(true);
        fetchApi()
        .then((data) => {
            if (!data) return;

            dispatch(setVideos(data.data));
            dispatch(setAccounts(data.data.map(vids => vids.user)))

                    //
            const currentPage = data.meta.pagination.current_page;
            const total = data.meta.pagination.total_pages;

            setPage(currentPage);
            setTotalPage(total);
            setError(false);
        })
        .catch(() => {
            console.log("Error: ", options.errorMessage);
            setError(true);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [pauseCallCheck, fetchApi, options.errorMessage, dispatch]);


    return {
        results: videos,
        loading,
        error,
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

        if (data) {
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