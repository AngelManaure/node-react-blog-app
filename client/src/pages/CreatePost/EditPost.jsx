import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { get, useForm } from "react-hook-form";

import { usePosts } from "../../context/PostContext";

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
    <>
      <form onSubmit={onSubmit}>
      {badWords && <p className="reportMessage">{badWords}</p>}
        <input 
        type="text" 
        id="title" 
        {...register("title")}
        autoFocus
        />

        <textarea 
        id="description"
        rows={5}
        {...register("description")}
        >
        </textarea>
        <button type="submit">Guardar</button>
      </form>
    </>
  )
}

export default EditPost