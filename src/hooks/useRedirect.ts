import { useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import routes from "_/config/routes";

const useRedirect = () => {
    const [searchParams] = useSearchParams();
    const redirect_url = searchParams.get("redirect_url") || "";
    const redirectSearchParams = redirect_url
        ? `?redirect_url=${redirect_url}`
        : "";
    const navigate = useNavigate();
    const redirect = useCallback(() => {
        navigate(redirect_url || routes.root, {
            replace: true,
        })
    }, [navigate, redirect_url]);

    return { redirectSearchParamString: redirectSearchParams, redirect_url, redirect };
}

export default useRedirect;