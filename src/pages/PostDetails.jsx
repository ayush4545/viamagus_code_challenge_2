import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";
import Loader from '../components/Loader';
const PostDetails = () => {
   const {id}=useParams()
   const [post,setPost]=useState(null)
   const navigate=useNavigate()
   const fetchData=async()=>{
    try {
      const res= await axios.get( `https://jsonplaceholder.typicode.com/posts/${id}`)
      const resData= await res.data
      setPost(resData)
      console.log(resData)
    } catch (error) {
      alert("Something goes wrong while getting posts")
    }
   }

   useEffect(()=>{
      if(id){
        fetchData()
      }

      return ()=>{}
   },[id])
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='fixed left-5 top-5 text-2xl cursor-pointer' onClick={()=>{
       navigate(-1)
      }}>
        <FaArrowLeft/>
      </div>
       {
        post ? (
          <div className='w-2/3 aspect-auto rounded-xl p-5 shadow-2xl flex flex-col gap-10'>
            <h1 className='text-4xl font-bold'>{post?.title}</h1>
            <p className='text-xl'>{post?.body}</p>
          </div>
        ) : <Loader />
       }
    </div>
  )
}

export default PostDetails