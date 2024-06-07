import { Link } from "react-router-dom";
import { usePosts } from "../../context/PostContext";

import './PostUser.css'

function PostUserCard({ post }) {
    const { deletePost } = usePosts();

    const handleClick = () => {
        deletePost(post.id)
      }

  return (
    <article className="postUserCard">
      <div className="topPostUserCard">
    <h3>{post.title}</h3>
      </div>
    <p>{post.description}</p>

      <div className="bottomPostUserCard">
        <div className="bottomLinksUserCard">
    <Link to={`/post/${post.id}`} className="viewPost">
    <i className="ri-eye-fill"></i>
    </Link>
    <Link to={`/edit-post/${post.id}`} className="viewPost">
    <i className="ri-pencil-fill"></i>
    </Link>
        </div>
      <button onClick={handleClick}>eliminar</button>
      </div>

  </article>
  )
}

export default PostUserCard