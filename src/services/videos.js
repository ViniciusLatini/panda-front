import axiosClient from "@/plugins/axios";

export async function getVideosService() {
  const { data } = await axiosClient.get("/videos");
  return data.videos;
}

export async function getVideoByIdService(id) {
  const { data } = await axiosClient.get(`/videos/${id}`);
  return data;
}

export async function editVideoInfoService(videoId, values) {
  const { data } = await axiosClient.put(`/videos/${videoId}`, values);
  return data;
}