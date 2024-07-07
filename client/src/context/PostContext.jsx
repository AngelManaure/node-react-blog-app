import { createContext, useContext, useState } from "react";

import {
  getPostsRequest,
  getPostRequest,
  getFeaturedPostRequest,
  getMyPostRequest,
  createPostRequest,
  updatePostRequest,
  deletePostRequest,
  createCommentRequest,
  reportPostRequest,
} from "../api/posts";

const PostContext = createContext();

export const usePosts = () => {
    const context = useContext(PostContext);

    if (!context) {
        throw new Error("UsePosts deberia estar dentro de un PostProvider");
    }

    return context;
};

export function PostProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [featuredPosts, setFeacturedPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [createComentModal, setCreateComentModal] = useState(false);
    const [reportMessage, setReportMessage] = useState('');
    const [badWords, setBadWords] = useState('');

        //publicaciones

    const getPosts = async () => {
        try {
            const res = await getPostsRequest();
            setPosts(res.data)
        } catch (error) {
            throw new Error(error.message)
        }
    };

    const getFeaturedPosts = async () => {
        try {
            const res = await getFeaturedPostRequest();
            setFeacturedPosts(res.data)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const userPosts = async () => {
        try {
            const res = await getMyPostRequest();
            setMyPosts(res.data);
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const getPost = async (id) => {
        try {
            const res = await getPostRequest(id);
            return res.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const createPost = async (post) => {
        try {
            await createPostRequest(post);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message === "ofensa") {
                setBadWords('Por favor evita el uso de palabras que pueda resultar ofensivas')
                setTimeout(() => {
                    setBadWords('')
                }, 3000)
            }
            throw new Error(error.message)
        }
    }

    const updatePost = async (id, post) => {
        try {
            await updatePostRequest(id, post)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message === "ofensa") {
                alert("Tu publicación contiene lenguaje ofensivo, por favor no escribas malas palabras :D");
            }
            throw new Error(error.message)
        }
    }

    const deletePost = async (id) => {
        try {
            const res = await deletePostRequest(id);
            if (res.status === 204) {
                setMyPosts(myPosts.filter((post) => post.id !== id))
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const reportPost = async (id) => {
        try {
            const res =await reportPostRequest(id);
            if (res.status == 200) {
                setReportMessage('Publicación denunciada, la revisaremos en breve')
                setTimeout(() => {
                    setReportMessage('')
                }, 3000)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

        //comentarios
    
    const createComment = async (id, comment) => {
        try {
            await createCommentRequest(id, comment)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message === "ofensa") {
                setBadWords('Por favor evita el uso de palabras que pueda resultar ofensivas')
                setTimeout(() => {
                    setBadWords('')
                }, 3000)
            }
            throw new Error(error.message)
        }
    }

    // const updateComment = async (id, commentId, comment) => {
    //     try {
    //         await updateCommentRequest(id, commentId, comment)
    //     } catch (error) {
    //         throw new Error(error.message)
    //     }
    // }

    // const deleteComment = async (id) => {
    //     try {
    //         await deleteCommentRequest(id)
    //     } catch (error) {
    //         throw new Error(error.message)
    //     }
    // }

    const activeComentModal = () => {
        if (createComentModal == false) {
            setCreateComentModal(true)
        } else {
            setCreateComentModal(false)
        }
      }

    return (
        <PostContext.Provider
            value={{
                posts,
                featuredPosts,
                myPosts,
                getPosts,
                getPost,
                getFeaturedPosts,
                userPosts,
                createPost,
                updatePost,
                deletePost,
                reportPost,
                createComment,
                // updateComment,
                // deleteComment,
                activeComentModal,
                createComentModal,
                reportMessage,
                badWords,
            }}
        >
            {children}
        </PostContext.Provider>
    )
}