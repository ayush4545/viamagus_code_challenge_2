import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PostCreate = () => {
  const [remainingCharacter,setRemainingCharacter]=useState(1000)
  const naviage=useNavigate()
  const [success,setSuccess]=useState(null)
  const [inputs,setInputs]=useState({
    title:'',
    description:""
  })
  const [titleError,setTitleError]=useState(null)
  const handleUpdateCharacter=(e)=>{
   setRemainingCharacter(e.target.maxLength - e.target.value.length)
  }
  
  const handleChange=(e)=>{
    if(e.target.name === "title"){
      setTitleError(false)
    }
    setInputs(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
  const handleSubmit=async(e)=>{
    try {
      e.preventDefault()
      if(!inputs?.title){
        setTitleError(true)
        return
      }
       const obj={
        id: Date.now(),
        title:inputs?.title,
        description:inputs?.description
       }
       const res= await axios.post(`https://jsonplaceholder.typicode.com/posts`,obj)
       const resData=await res.data
       const posts=JSON.parse(localStorage.getItem("posts"))
       if(posts){
        posts.unshift(obj)
        localStorage.setItem("posts", JSON.stringify(posts))
        setTitleError(false)
        setInputs({title:'',description:''})
        setSuccess(true)

        setTimeout(()=>{
          naviage("/")
        },1000)
       }
       console.log(resData)
    } catch (error) {
      alert("Something goes wrong while getting posts")
    }
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
       <div className='w-2/3 aspect-auto rounded-xl p-5 shadow-2xl flex flex-col gap-10'>
          <form className='flex flex-col gap-4'>
             <div className='flex flex-col gap-4'>
              <label htmlFor="title">Title</label>
              <input type="text" className='w-full outline-none px-3 py-2' id="title" name="title" placeholder='Enter title for post' required={true} value={inputs?.title} onChange={handleChange}/>
              {titleError && <p className='text-[10px] mt-1 text-red-500'>Title is required</p>}
             </div>

             <div className='flex flex-col gap-4'>
              <label htmlFor="description">Description</label>
              <textarea type="text" className='w-full outline-none px-3 py-2' maxLength={1000} id="description" name="description" placeholder='Description for post' required={true} rows={10} onInput={handleUpdateCharacter} value={inputs?.description} onChange={handleChange}></textarea>
              <p className='text-[10px] mt-1'>Remaining Characters : {remainingCharacter}</p>
             </div>

             <button type="submit" onClick={handleSubmit} className='px-3 py-2 bg-purple-500 text-white font-semibold rounded-lg mt-3'>
              Create Post
             </button>
          </form>

         {success && <p className='text-center font-semibold text-green-700'>Post is created successfully</p>}
       </div>
    </div>
  )
}

export default PostCreate