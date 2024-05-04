import React,{useEffect,useState} from 'react'
import service from '../appwrite/config'
import PostCard from '../components/PostCard' 

function AllPost() {

  const [posts,setPosts] = useState([])

  useEffect(()=>{
    service.getPosts([]).then((posts)=>{
      if(posts){
        setPosts(posts.documents)
      }
    })
  },[])

  return (
    <div className='bg-[#151515] h-screen w-full flex flex-wrap'>

      {posts.map((post)=>(
        <PostCard key={post.$id} post={post}/>
      ))}




    </div>
  )
}

export default AllPost