import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {authService} from './appwrite/auth'
import { useEffect } from 'react';
import {login,logout} from './store/slices/Auth'
import {Header,Footer} from './components/index'

function App() {
  
const dispatch = useDispatch()

const [loading,setLoading] = useState(true);


useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    }
    else{
      dispatch(logout())
    }
  })
  .finally(()=>setLoading(false))

},[])
console.log('test');


 
if(!loading){
  return(
    <>
    
  
    <div className='bg-[#1E0342] h-screen'>a</div>
    
    </>

  )
 









  
}
else{
  return
  (
  <>

  <div className='bg-[#1E0342] h-screen'>s</div>
  
  </>

  )

  
}


}

export default App