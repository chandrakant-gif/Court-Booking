import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../utils/api";
import httpAction from "../utils/httpAction";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY || '₹';
  const navigate = useNavigate(); 
  const [isOwner, setIsOwner] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courts, setCourts] = useState([]);
  const [selectedSport, setSelectedSport] = useState("");


  const fetchCourts = async () =>{
    try {
      const data = {
        url : api().getCourts,
        method: 'GET'

      }
      const res = await httpAction(data);
      if(res.success){
        setCourts(res.courts);
        

      }else{
        toast.error(res.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const data ={
          url: api().userProfile
        }
        const result = await httpAction(data);
        
        if (result?.user) {
          setUser(result.user);
        
        }
      } catch(error) {
        console.log(error.message);
        setUser(null);
      } finally {
      setLoading(false); // 🔑 REQUIRED
    }
    };
    getUser();
  }, []);

  useEffect(() =>{
    fetchCourts();
  },[])

  const value = {
    currency,
    navigate,
    isOwner,
    user,
    setUser,
    loading,
    setLoading,
    setIsOwner,
    courts,
    setCourts,
    selectedSport,
    setSelectedSport
  }
  return (
    <AppContext.Provider value={ value }>
    {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);