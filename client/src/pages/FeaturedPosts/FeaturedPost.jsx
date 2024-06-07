import { useEffect } from "react"
import { usePosts } from "../../context/PostContext"
import PostCard from "../../components/Post/PostCard";
import Spinner from '../../components/Spinner/Spinner'

function FeaturedPost() {
  const { getFeaturedPosts, featuredPosts } = usePosts();

  useEffect(() => {
    getFeaturedPosts()
}, [])

  if (featuredPosts.length === 0) {
    return (
     <Spinner />
    )
  }

  return (
    <section className="allPostContainer">
      {featuredPosts.map((post) => (
        <PostCard post={post} key={post.id} />
    ))}
    </section>
  )
}

export default FeaturedPost