import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';
import Loader from '../components/Loader';

const Home = () => {
    const [posts,setPosts]=useState(()=>{
        if(localStorage.getItem('posts')) return JSON.parse(localStorage.getItem('posts'))
        return []
    })
    const PAGE_SIZE=5
    const [page,setPage]=useState(0)
    const fetchPost=async()=>{
     try {
        const start=page * PAGE_SIZE
        console.log(start)
        const res= await axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${PAGE_SIZE}`)
        const resData=await res.data
        setPosts(resData)
        console.log("resData",resData)
     } catch (error) {
        console.log(error)
        alert("Something goes wrong while getting posts")
     }
    } 
    useEffect(()=>{
     
      fetchPost()
      
      return ()=>{
        localStorage.setItem("posts",JSON.stringify(posts))
       }
    },[page])
  return (
    <div className='grid grid-cols-1 gap-2 place-items-center py-5 relative'>

       <Link className='fixed right-3 top-3 text-4xl' title='create post' to="/createPost">
         <IoIosAddCircle/>
       </Link>
        {
            posts && posts?.length > 0 ? posts?.map((post)=>(
                <Link to={`/post/${post?.id}`} key={post?.id} className='bg-white shadow-lg p-4 rounded-lg w-3/4'>
                    <h2 className='text-md lg:text-xl font-bold'>{post?.title}</h2>
                    <p className='mt-2'>{post?.body}</p>
                </Link>
            )) : <Loader />
        }

        <div className='flex items-center justify-center gap-10 mt-4'>
            {
                page > 0 &&   <button className='px-3 py-2 bg-purple-500 text-white font-semibold rounded-lg' onClick={()=>{
                    setPage(prev => prev-1)
                }}>Previous</button>
            }
            
            {
                page <20 && (
                    <button className='px-3 py-2 bg-purple-500 text-white font-semibold rounded-lg' onClick={()=>{
                        setPage(prev => prev+1)
                    }}>Next</button>
                )
            }
            
        </div>
    </div>
  )
}

export default Home