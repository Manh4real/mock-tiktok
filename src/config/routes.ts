const routes = {
    root: "/",
    following: "/following",
    live: "/live",
    search: "/search",
    profile: "/@:usernameParam",
    upload: "/upload",
    signup: "/signup",
    login: "/login",
    logout: "/logout",
    reset: "/reset",
}

export const pagesTitle = {
    [routes.root]: "Tiktok | Make Your Day",
    [routes.following]: "Following | Watch videos from creators you follow | Tiktok",
    [routes.live]: "Tiktok LIVE | Tiktok",
    [routes.search]: (search: string) => `Find '${search}' on Tiktok | Tiktok Search`,
    [routes.profile]: (name: string, username: string) => `${name} (@${username}) Tiktok | Watch ${name}'s Newest Tiktok Videos`,
    [routes.upload]: "Upload | Tiktok",
}

export default routes;