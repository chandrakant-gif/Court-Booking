import React from 'react'
import Title from '../../components/home/Title';
import {useEffect} from 'react'

import { courtsDummyData } from '../../assets/quickStay-assets/assets/assets';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { useAppContext } from '../../Context/App.Context';
import httpAction from '../../utils/httpAction';

const ListCourt = () => {
  const [rooms, setRooms] = React.useState([]);
  const {user, currency} = useAppContext();


  const fetchCourts = async () => {
    try {
      const data ={
        url: api().ownerCourts,
        method: 'GET'
      }
      const result = await httpAction(data);
      
      if(result?.success){
        setRooms(result?.courtDetails)
      }else{
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(error.message);
      
    }
  }

  
  const toggleAvailability = async(courtId) =>{
    try {
      const data ={
        url: api().toggleCourtAvailability,
        method: 'POST',
        body: {courtId}
      }
      const result = await httpAction(data);
      if(result?.success){
        fetchCourts();
      }
      }
    catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=> {
    if(user){
      fetchCourts();
    }
  },[user])


  
  return (
    <div>
      <Title title="Your Courts" subTitle="Manage your listed courts" align="left" font="outfit"/>

      <p className='text-gray-500 mt-8'>All Courts</p>
      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'> 
        <table className='w-full'>
           <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
              <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>Price / hour</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>Slot</th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>Actions</th>
            </tr>


          </thead>
          <tbody className='text-sm'>
            {rooms.map((item,index) =>(
              <tr key={index}>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                  {item.sportName}
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                  {item.amenities.join(', ')}
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 '>
                  {item.pricing[0]?.pricePerHour ? `${currency} ${item.pricing[0].pricePerHour} / hr` : "N/A"}
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 '>
                  {item.pricing[0]?.slotName ? item.pricing[0].slotName : "N/A"}
                </td>
                <td className='py-3 px-4 text-red-500 border-t border-gray-300 text-sm text-center '>
                  <label className='relative inline-flex items-center cursor-pointer gap-3 text-gray-900'><input onChange ={()=> toggleAvailability(item._id)} type="checkbox" className='sr-only peer' checked={item.isAvailable}/>
                  <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'>


                  </div>
                  <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>

                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListCourt