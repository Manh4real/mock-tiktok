import { useEffect, useMemo, useState } from "react";
import { ResponseWithPagination } from "_/types";

// type Data<T> = ResponseWithPagination<T>;
type FetchApiFunc<T> = (page?: number) => Promise<ResponseWithPagination<T> | undefined>;
// type HashMapResults<T> = {
//     [key: string]: T
// }
/**
 * fetchApi function must be memoized, otherwise component re-renders infinitely
*/
const usePagesFetch =
    <T extends { id: number }>(
        fetchApi: FetchApiFunc<T>,
        pauseCallCheck: boolean = false,
        options: Partial<{
            errorMessage: string,
            reachEndFunc: () => void,

        }>
    ) => {
        const { reachEndFunc = () => { } } = options;

        const [results, setResults] = useState<T[]>([]);
        const [loading, setLoading] = useState<boolean>(false);
        const [page, setPage] = useState<number>(-1);
        const [totalPage, setTotalPage] = useState<number>(1);

        // const hashMapResults = useRef(new Map<number, T>([])).current;

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
                    // setResults([...data.data]);

                    //
                    const currentPage = data.meta.pagination.current_page;

                    setPage(currentPage);
                })
                .catch(() => {
                    console.log("Error: ", options.errorMessage);
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

                    setResults(data.data);

                    //
                    const currentPage = data.meta.pagination.current_page;
                    const total = data.meta.pagination.total_pages;

                    setPage(currentPage);
                    setTotalPage(total);
                })
                .catch(() => {
                    console.log("Error: ", options.errorMessage);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, [pauseCallCheck, fetchApi, options.errorMessage]);


        return {
            results: saveResults,
            loading,
            hasMore: page < totalPage,
            end: page >= totalPage,
            setResults,
            setPage,
            handleFetchNext
        }
    };

export default usePagesFetch