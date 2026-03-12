import React, { useEffect, useState } from "react";
import Title from "../../components/home/Title";
import CourtReg from "../../components/home/CourtReg";
import { assets} from "../../assets/quickStay-assets/assets/assets";
import api from "../../utils/api";
import httpAction from "../../utils/httpAction";
import { useAppContext } from "../../Context/App.Context";
import toast from "react-hot-toast";


const Dashboard = () => {



  const {currency, user} = useAppContext();
  const [dashboardData,setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const data ={
        url: api().getCourtBookings,
        method: 'GET'
      }
      const res = await httpAction(data);
      if(res?.success){
        setDashboardData(res.dashboardData)
      }else{
        toast.error(res.message)
      }
    } catch (error) {
      toast.error("Failed to fetch dashboard data")
    }
  }

  useEffect(() => {
    if(user){
      fetchDashboardData();
    }
  },[user])


 

  const [courtDashboardData, setCourtDashboardData] = useState(null);
  
  useEffect(() => {
    const checkCourt = async () => {

   const data = {
      url: api().myCourt,
      method: 'GET',
      
    }
      try {
        const res = await httpAction(data);
      } catch (err) {
        toast.error(err?.message)
      }
    };

    checkCourt();
  }, []);

  useEffect(() => {
    const getRegisteredCourt = async () => {

   const data = {
      url: api().getRegisteredCourt,
      method: 'GET',
      
    }
      try {
        const res = await httpAction(data);
       
        if(res?.court){
          setCourtDashboardData(res?.court);
         
        }
        
        
      } catch (err) {
        setCourtDashboardData(null);
      }
    };

    getRegisteredCourt();
  }, []);


  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your court bookings"
      />
      
      
<div className="bg-primary/3 border border-primary/10 rounded-lg p-6 mb-8 max-w-3xl">
  <div className="flex justify-between items-start">
    <div>
      <h2 className="text-lg font-semibold text-blue-900">
        Court Details
      </h2>

      <p className="text-gray-600 mt-2 text-sm">
        <span className="font-medium text-gray-700">Court Name:</span>{" "}
        {courtDashboardData?.courtName || "N/A"}
      </p>

      <p className="text-gray-600 mt-1 text-sm">
        <span className="font-medium text-gray-700">Address:</span>{" "}
        {courtDashboardData?.courtAddress || "N/A"}
      </p>
    </div>

    {/* ✏️ EDIT BUTTON (UI ONLY) */}
    <button
      className="text-indigo-500 hover:text-indigo-600 text-sm font-medium border border-indigo-500 px-4 py-1.5 rounded transition"
    >
      Edit
    </button>
  </div>
</div>

          <div className="flex gap-4 my-8">
            <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
              <img src={assets.totalBookingIcon} alt="" className="max-sm:hidden h-10" />
              <div className="flex flex-col sm:ml-4 font-medium">
                <p className="text-blue-500 text-lg">Total Booking</p>
                <p className="text-neutral-400">{dashboardData.totalBookings}</p>
              </div>
            </div>
            <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
            <img src={assets.totalRevenueIcon} alt="" className="max-sm:hidden h-10" />
            <div className="flex flex-col sm:ml-4 font-medium"> <p className="text-blue-500 text-lg">Total Revenue</p> <p className="text-neutral-400 text-base"> {currency} {dashboardData.totalRevenue} </p> 
            </div>
            </div>
          </div>
          <h2 className="text-xl text-blue-950/70 font-medium mb-5"> Recent Bookings </h2>
         <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
  <table className="w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="py-3 px-4">User Name</th>
        <th className="py-3 px-4 max-sm:hidden">Court</th>
        <th className="py-3 px-4 text-center">Total Amount</th>
        <th className="py-3 px-4 text-center">Payment Status</th>
      </tr>
    </thead>

    <tbody className="text-sm">
      {dashboardData.bookings.map((item, index) => (
        <tr key={index}>
          <td className="py-3 px-4 border-t">
            {item.user.name}
          </td>

          <td className="py-3 px-4 border-t max-sm:hidden">
            {item.sport.sportName}
          </td>

          <td className="py-3 px-4 border-t text-center">
            {currency} {item.totalPrice}
          </td>

          <td className="py-3 px-4 border-t text-center">
            <span
              className={`py-1 px-3 text-xs rounded-full ${
                item.isPaid
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {item.isPaid ? "Completed" : "Pending"}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
          
        
      
    </div>
  );
};

export default Dashboard;

