import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";

import { useAuth } from "../../context/AuthContext"
import { usePosts } from "../../context/PostContext";

import './createPostForm.css'

function CreatePost() {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const { createPost, badWords } = usePosts();

    useEffect(() => {
        if (!isAuthenticated) {
          navigate("/")
        }
      }, [isAuthenticated])
      
    const onSubmit = handleSubmit((data) => {
        createPost(data)
        navigate("/profile")
    })

  return (
        <>
           <form 
           onSubmit={onSubmit}
           className="createPostForm"
           >
            {badWords && <p className="reportMessage">{badWords}</p>}
                <input 
                type="text" 
                className="createPostInput"
                {...register("title", { required: true })}
                placeholder="Titulo"
                />
                <textarea
                className="createPostTextarea"
                {...register("description", { required: true })}
                placeholder="description"
                ></textarea>
                <button
                className="createPostSave"
                type="submit"
                >crear</button>
            </form> 
        </>
    )
}

export default CreatePost