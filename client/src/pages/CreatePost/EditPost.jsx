import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { usePosts } from "../../context/PostContext";

import './EditPost.css'

function EditPost() {
  const { getPost, updatePost, badWords } = usePosts();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadPost() {
      try {
        const post = await getPost(params.id)
        setValue('title', post.title)
        setValue('description', post.description)
      } catch (error) {
        throw new Error(error)
      }
    }
    loadPost();
  }, [])

  const onSubmit = handleSubmit((data) => {
    updatePost(params.id, data)
    navigate('/profile')
  })

  return (
    <article className="editPostContainer">
      <form onSubmit={onSubmit} className="editForm">
      {badWords && <p className="reportMessage">{badWords}</p>}
        <input 
        className="editPostInput"
        type="text" 
        id="title" 
        {...register("title")}
        autoFocus
        />

        <textarea 
        className="editPostTextarea"
        id="description"
        {...register("description")}
        >
        </textarea>
        <button className="editPostButton" type="submit">Guardar</button>
      </form>
    </article>
  )
}

export default EditPost