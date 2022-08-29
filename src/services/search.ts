import api from "_/api";

type QueryType = "more" | "less";

export const getUsers = async (q: string, type: QueryType = "less", page: number = 1) => {
  const res = await api.get("/users/search", {
    params: { q, type, page },
  });
  const data = res.data;

  return data;
}