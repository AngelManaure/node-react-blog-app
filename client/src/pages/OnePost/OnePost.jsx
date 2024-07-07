import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { usePosts } from "../../context/PostContext";
import { useNav } from "../../context/NavContext";
import CreateComent from "../../components/Post/CreateComent";
import "./OnePost.css";

function OnePost() {
  const {
    getPost,
    createComentModal,
    activeComentModal,
    reportPost,
    reportMessage,
  } = usePosts();
  const{ setSearchActive } = useNav();
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState([]);
  const navigate = useNavigate();
  const id = params.id

  useEffect(() => {
    const loadPost = async () => {
      try {
        setSearchActive(false)
        const res = await getPost(params.id);

        if (!res) {
          throw new Error("Error al renderizar la publicacion");
        } else {
          setPost(res);
          setComments(res.comments);
          setAuthor(res.author);
        }
      } catch (error) {
        return error.messages;
      }
    };
    loadPost();
  }, [id]);

  const handleReport = () => {
    reportPost(params.id);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <article className="onePostCard">
      {reportMessage && (
        <div className="reportMessageContainer">
          <p className="reportMessage">{reportMessage}</p>
        </div>
      )}
      <div className="topOnePostCard">
        <div>
          <button onClick={goBack} className="goBack">
            <i className="ri-arrow-left-circle-fill"></i>
          </button>
          <h3>{post.title}</h3>
        </div>
        <Link className="oneDenLink" onClick={handleReport} title="Denunciar">
          denunciar<i className="ri-error-warning-fill"></i>
        </Link>
      </div>
      <div className="onPostDescription">
        <p>{post.description}</p>
        <div className="onePostAuthor">Autor: {author.username}</div>
      </div>
      <div className="commentTop">
        <h4>Comentarios:</h4>
        <button className="addCommentButton" onClick={activeComentModal}>
          {createComentModal == false ? "añadir comentario" : "cerrar"}
        </button>
      </div>
      <div className="commentsContainer">
        {comments.map((comment) => (
          <div key={comment.id} className="commentItemsContainer">
            <p className="commentItem">
              <span>{comment.author.username}:</span> {comment.description}
            </p>
          </div>
        ))}
      </div>
      <CreateComent />
    </article>
  );
}

export default OnePost;
