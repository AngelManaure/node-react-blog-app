import { Link } from "react-router-dom"

import './PostCard.css'

function PostCard({ post }) {

  return (
    <article className="postCard">
        <div className="topCard">
          <div className="topInfoCard">
          <h3>{post.title}</h3>
            <span>{post.author.username}</span>
          </div>
          <div className="topLeftButtonsCard">
        <Link to={`/post/${post.id}`} className="viewPost">
        <i className="ri-eye-fill"></i>
        </Link>
          </div>
        </div>
        <div className="bottomCart">
        <p>{post.description}</p>
        </div>
    </article>
  )
}

export default PostCard