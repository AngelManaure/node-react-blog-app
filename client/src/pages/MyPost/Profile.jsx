import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { usePosts } from "../../context/PostContext";

import PostUserCard from "../../components/Post/PostUserCard";

import './Profile.css'

function Profile() {
  const { isAuthenticated } = useAuth();
  const { userPosts, myPosts } = usePosts();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    userPosts();
  }, []);

  return (
      <section className="userProfileContainer">
        <div className="createPostPerfilContainer">
        <Link to={"/add-post"} className="createPost">
        crear Post
      </Link>
        </div>
        <div className="userProfile">

        {myPosts.map((post) => (
          <PostUserCard key={post.id} post={post} />
        ))}
        </div>
      </section>
  );
}

export default Profile;
