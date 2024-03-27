import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PostCreate from './pages/PostCreate'
import PostDetails from './pages/PostDetails'

function App() {
  
  const routes=[
    {
      path:'/',
      component: <Home/>
    },
    {
      path:"/createPost",
      component:<PostCreate />
    },
    {
      path:"/post/:id",
      component:<PostDetails/>
    }
  ]

  return (
    <BrowserRouter> 
      <Routes>
        {
          routes.map((route)=>{
            return <Route key={route?.path} exact path={route?.path} element={route?.component}/>
          })
        }
      </Routes>
     
    </BrowserRouter>
  )
}

export default App
