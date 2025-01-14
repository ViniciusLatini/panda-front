import axiosClient from "@/plugins/axios";

export async function getVideosService() {
  const { data } = await axiosClient.get("/videos");
  return data.videos;
}