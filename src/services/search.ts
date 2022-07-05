import api from "_/api";

export const getUsers = async (q: string, type = "less") => {
    const res = await api.get("/users/search", {
        params: { q, type },
      });

    return res.data;
}