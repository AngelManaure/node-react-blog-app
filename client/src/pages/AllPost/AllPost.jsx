import { useEffect } from "react"
import { usePosts } from "../../context/PostContext"
import PostCard from "../../components/Post/PostCard"
import Spinner from '../../components/Spinner/Spinner'
import './AllPost.css'

function AllPost() {
  const { getPosts, posts } = usePosts();

  useEffect(() => {
    getPosts();
  }, [])

  if (posts.length === 0) {
    return (
      <Spinner />
    )
  }

  return (
    <section className="allPostContainer">
      
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}

    </section>
  )
}

export default AllPost