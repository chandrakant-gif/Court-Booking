import React, { useEffect, useState } from 'react'
import api from '../../utils/api';
import httpAction from '../../utils/httpAction';
import { Navigate,Outlet } from 'react-router-dom';

const Super = () => {

  const [isloading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const getUserAccess = async () =>{
      const data = {
        url: api().getAccess,
      };
     
     try {
       const result = await httpAction(data);
      
       if(result?.status){
         setIsAuth(true);
       }
     } catch (error) {
      setIsAuth(false);
      
     }finally {
      setIsLoading(false);
    };}
    getUserAccess();
  }, []);
 

  if(isloading){
    return <p>Loading...</p>;
  }

  if(!isAuth){
    return <Navigate to='/login'/>;
  }else {
    return <Outlet/>
  }

  
}

export default Super