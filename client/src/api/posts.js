import axios from "./axios";

//publicaciones

export const getPostsRequest = () => axios.get("/posts");

export const getPostRequest = (id) => axios.get(`/post/${id}`);

export const getMyPostRequest = () => axios.get("/my-posts");

export const createPostRequest = (post) => axios.post("/post", post);

export const updatePostRequest = (id, post) => axios.put(`/post/${id}`, post);

export const deletePostRequest = (id) => axios.delete(`/post/${id}`);

//publicaciones destacadas

export const getFeaturedPostRequest = () => axios.get("post-featured")

//Comentarios

export const createCommentRequest = (id, comment) =>
  axios.post(`/post/${id}/comments`, comment);

// export const updateCommentRequest = (id, commentId, comment) =>
//   axios.put(`/post/${id}/comments/${commentId}`, comment);

// export const deleteCommentRequest = (id, commentId) => axios.delete(`/post/${id}/comments/${commentId}`)

export const searchPost = (query) => axios.get('/search', {
  params: { q: query },
});

export const reportPostRequest = (id) => axios.post(`/report/${id}`)