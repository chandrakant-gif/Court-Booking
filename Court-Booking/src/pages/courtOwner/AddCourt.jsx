import React from 'react'
import Title from '../../components/home/Title'
import { assets } from '../../assets/quickStay-assets/assets/assets'
import api from '../../utils/api'
import httpAction from '../../utils/httpAction'
import toast from 'react-hot-toast'

const AddCourt = () => {

  const [image,setImage] = React.useState({
    1:null,
    2:null,
    3:null,
    4:null
  })

  const [inputs, setInputs] = React.useState({
    
    
    sportName:"",
    sportEnvironment:"",
    address:"",
    pricePerNight:"",

    pricing:{
      slotName:"morning",
      startTime:"",
      endTime:"",
      pricePerHour:""
    },

    amenities:{
      'Flood Lights':false,
      'Seating Area':false,
      'Parking':false,
      'Changing Rooms':false,
      'Restrooms':false,
      'Water Dispenser':false
    },

    isAvailable:true
  })

  const [loading, setLoading] = React.useState(false);

  const onSubmitHandler = async (e) => {
  e.preventDefault();

  if (
    !inputs.sportName ||
    !inputs.sportEnvironment ||
    !inputs.pricing.startTime ||
    !inputs.pricing.endTime ||
    !inputs.pricing.pricePerHour
  ) {
    alert("Please fill all the fields");
    return;
  }

  setLoading(true);

  try {

    const formData = new FormData();

    formData.append("sportName", inputs.sportName);
    formData.append("sportEnvironment", inputs.sportEnvironment);

    const pricingArray = [
      {
        slotName: inputs.pricing.slotName,
        startTime: inputs.pricing.startTime,
        endTime: inputs.pricing.endTime,
        pricePerHour: inputs.pricing.pricePerHour
      }
    ];

    formData.append("pricing", JSON.stringify(pricingArray));

    const amenitiesArray = Object.keys(inputs.amenities)
      .filter((key) => inputs.amenities[key]);

    formData.append("amenities", JSON.stringify(amenitiesArray));

    Object.keys(image).forEach((key) => {
      if (image[key]) {
        formData.append("images", image[key]);
      }
    });

    const data = {
      url: api().addCourt,
      method: "POST",
      body: formData
    };

    const result = await httpAction(data);

    if (result?.success) {
      toast.success("Court added successfully");
        setInputs({
    sportName: "",
    sportEnvironment: "",
    address: "",
    pricePerNight: "",
    pricing: {
      slotName: "morning",
      startTime: "",
      endTime: "",
      pricePerHour: ""
    },
    amenities: {
      'Flood Lights': false,
      'Seating Area': false,
      'Parking': false,
      'Changing Rooms': false,
      'Restrooms': false,
      'Water Dispenser': false
    },
    isAvailable: true
  });

  // reset images
  setImage({
    1: null,
    2: null,
    3: null,
    4: null
  });
    }

  } catch (error) {
    console.log(error);
    toast.error("Failed to add court");
  }

  setLoading(false);
};


  return (
    <form onSubmit={onSubmitHandler}>
      <Title align='left' font='outfit' title='Add Court' subTitle='Fill in the details to add your court'/>

     <p className='text-gray-800'>Images</p>

<div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>

{Object.keys(image).map((key) => (

<label
  htmlFor={`courtImage${key}`}
  key={key}
  className="w-24 h-24 border border-gray-300 rounded flex items-center justify-center overflow-hidden cursor-pointer"
>

<img
  src={image[key] ? URL.createObjectURL(image[key]) : assets.uploadArea}
  alt=""
  className="w-full h-full object-cover"
/>

<input
  type="file"
  accept="image/*"
  id={`courtImage${key}`}
  hidden
  onChange={e =>
    setImage({
      ...image,
      [key]: e.target.files[0]
    })
  }
/>

</label>

))}

</div>

      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>

        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Sport Name</p>
          <select
            value={inputs.sportName}
            onChange={e=> setInputs({...inputs, sportName: e.target.value})}
            className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'
          >
              <option value="">Select Sport</option>
              <option value="Badminton">Badminton</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
              <option value="Football">Football</option>
              <option value="Volleyball">Volleyball</option>
          </select>
        </div>

        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Environment</p>
          <select
            value={inputs.sportEnvironment}
            onChange={e=> setInputs({...inputs, sportEnvironment: e.target.value})}
            className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'
          >
              <option value="">Select Environment</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
          </select>
        </div>

        <div>
          <p className='mt-4 text-gray-800'>
            Price <span className='text-xs'> /hour</span>
          </p>
          <input
            type="number"
            placeholder='0'
            value={inputs.pricing.pricePerHour}
            onChange={e=> setInputs({
              ...inputs,
              pricing:{...inputs.pricing, pricePerHour:e.target.value}
            })}
            className='border border-gray-300 mt-1 rounded p-2 w-24'
          />
        </div>

      </div>


      {/* PRICING SLOT */}

      <p className='text-gray-800 mt-4'>Pricing Slot</p>

      <div className='flex gap-4 flex-wrap'>

        <div>
          <p className='text-gray-800'>Slot</p>
          <select
            value={inputs.pricing.slotName}
            onChange={e=> setInputs({
              ...inputs,
              pricing:{...inputs.pricing, slotName:e.target.value}
            })}
            className='border border-gray-300 mt-1 rounded p-2'
          >
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>
        </div>

        <div>
          <p className='text-gray-800'>Start Time</p>
          <input
            type="time"
            value={inputs.pricing.startTime}
            onChange={e=> setInputs({
              ...inputs,
              pricing:{...inputs.pricing, startTime:e.target.value}
            })}
            className='border border-gray-300 mt-1 rounded p-2'
          />
        </div>

        <div>
          <p className='text-gray-800'>End Time</p>
          <input
            type="time"
            value={inputs.pricing.endTime}
            onChange={e=> setInputs({
              ...inputs,
              pricing:{...inputs.pricing, endTime:e.target.value}
            })}
            className='border border-gray-300 mt-1 rounded p-2'
          />
        </div>

      </div>


      {/* AMENITIES */}

      <p className='text-gray-800 mt-4'>Amenities</p>

      <div>
        {Object.keys(inputs.amenities).map((amenity, index)=> (
          <div key={index}>
            <input
              type="checkbox"
              id={`amenities${index+1}`}
              checked={inputs.amenities[amenity]}
              onChange={() => setInputs({
                ...inputs,
                amenities:{
                  ...inputs.amenities,
                  [amenity]:!inputs.amenities[amenity]
                }
              })}
            />
            <label htmlFor={`amenities${index+1}`}> {amenity}</label>
          </div>
        ))}
      </div>


      {/* AVAILABILITY */}

     

      <button className='bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer' disabled={loading}>
        {loading ? "Adding..." : "Add Court"}
      </button>

    </form>
  )
}

export default AddCourt