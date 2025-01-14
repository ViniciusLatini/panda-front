import axiosClient from "@/plugins/axios";

export async function signInService(body) {
  const { data } = await axiosClient.post("/users/auth", body);
  return data;
}

export async function signUpService(body) {
  const { data } = await axiosClient.post("/users", body);
  return data;
}