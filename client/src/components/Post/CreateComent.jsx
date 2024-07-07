import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { usePosts } from "../../context/PostContext";
import { useAuth } from "../../context/AuthContext";
import { useNav } from "../../context/NavContext";

function CreateComent() {
  const { createComment, createComentModal, activeComentModal, badWords } =
    usePosts();
  const { isAuthenticated } = useAuth();
  const { setLoginActive } = useNav();
  const { register, handleSubmit, setValue } = useForm();
  const params = useParams();

  const onSubmit = handleSubmit((data) => {
    const id = params.id;
    if (!isAuthenticated) {
      setLoginActive(false);
      setValue("description", "");
      activeComentModal();
    } else {
      createComment(id, data);
      setValue("description", "");
      window.location.reload(true);
    }
  })

  return (
    <>
      <form
        className={
          createComentModal == false
            ? "createCommentForm"
            : "showCreateCommentModal"
        }
        onSubmit={onSubmit}
      >
        {badWords && <p className="reportMessage">{badWords}</p>}
        <textarea
          className="textareaCreateComment"
          {...register("description", { required: true })}
        ></textarea>
        <button type="submit" className="createCommentButton">crear</button>
      </form>
    </>
  );
}

export default CreateComent;
