import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usercontext } from '../App'


const Logout = () => {
    const {dispatch} = useContext(usercontext)
    const navigate = useNavigate()
  useEffect(()=>{
    navigate('/Register')
    dispatch({type : "user" , payload : false})
  })
  return (
    <>
      
    </>
  )
}

export default Logout
