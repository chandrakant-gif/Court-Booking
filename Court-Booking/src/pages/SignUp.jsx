import React,{useState} from 'react'
import api from '../utils/api';
import httpAction from '../utils/httpAction';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    // profilePicture: null,
  });
  const [profilePicture, setProfilePicture] = useState(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfilePicture(file)
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        
      };
      reader.readAsDataURL(file);
    }
  };

 
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isInvalid,setIsInvalid] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isWeak, setIsWeak] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  
  const checkStrength = (value) => {
      
  const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  
  if (strongPattern.test(value)) {
    setIsStrong(true);
    setIsWeak(false)
  } else {
    setIsWeak(true);
    setIsStrong(false);
  }
    };
    const handleChange = (e) => {
       const value = e.target.value;
      
      setFormData({...formData, password: value})
      checkStrength(value);
      
    };
    const handlePassword = (e) =>{
     const value = e.target.value;
      setConfirmPassword(value);
      if(formData.password !== "" && formData.password === value){
        setIsValid(true);
        setIsInvalid(false);

      }
      else{
         setIsValid(false);
        setIsInvalid(true);
      }

      
    };
     const loginWithGoogle = (values) => {
    window.location.href = "http://localhost:5000/auth/google"; 
     }

     const submitHandler = async (e) => {
      e.preventDefault();
      const bodyFields = new FormData();

      bodyFields.append("name", formData.name);
      bodyFields.append("email", formData.email);
      bodyFields.append("password", formData.password);
     if (profilePicture) {
      bodyFields.append("profilePicture", profilePicture);
}


      
      const  data = {
        url: api().registerUser,
        method: 'POST',
        body: bodyFields,
      };
      const result = await httpAction(data);
      console.log(result)
      if(result?.status){
        toast.success(result?.message);
        navigate('/login');
      }};


   


  
  return (
        <div className="flex h-screen w-full">
            <div className="w-full hidden md:inline-block">
                <img className=" h-full" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png" alt="leftSideImage" />
            </div>
        
            <div className="w-full flex flex-col items-center justify-center">
        
                <form  onSubmit={submitHandler} className="md:w-96 w-80 flex flex-col items-center justify-center">
                  
                    <h2 className="text-4xl text-gray-900 font-medium">Sign Up</h2>
                    <p className="text-sm text-gray-500/90 mt-3">Sign up to start your journey with<span className='px-1 text-blue-500'>QuickCourt</span></p>
        
                    {/* <button type="button" className="w-full mt-8 bg-gray-500/10 flex items-center cursor-pointer justify-center h-12 rounded-full">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" />
                    </button> */}
        
                   <div className="flex flex-col items-center justify-center gap-5 w-full my-5">
  <div className="border w-15 h-15 rounded-full flex items-center justify-center cursor-pointer border-gray-300/60  relative">
    {/* Hidden file input */}
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
    
    {/* Show text or preview */}
    {image ? (
      <img
        src={image}
        alt="preview"
        className="w-full h-full object-cover rounded-full"
      />
    ) : (
      <span className="text-gray-500 text-sm"><i className="fa-solid fa-file-image"></i></span>
    )}
    
  </div>
  <span className='text-sm -mt-3 text-gray-500'>Profile picture</span>
 
                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <i className=" text-gray-500 fa-solid fa-user"></i>
                        <input type="text" placeholder="name" 
                        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required />                 
                    </div>

                    </div>
                    
        
                    
                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
                        </svg>
                        <input type="email" placeholder="Email id" 
                        value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required />                 
                    </div>
                    
        
                    <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
                        </svg>
                        <input type="password" 
                         onChange={handleChange}
                         value={formData.password}
                        placeholder="Password" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required />
                       
                    </div>

                    {isWeak && <div className="w-85 mt-2 font-sm text-sm text-red-500">
                      <i className="fa-solid fa-circle-info mr-2"></i>
                      Password is weak</div>}
                    {isStrong && <div className="w-85 mt-2 font-sm text-sm text-green-500">
                      <i class="fa-solid fa-circle-info mr-2"></i>
                      Password is Strong</div>}
                     


                      <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
                        </svg>
                        <input type="password" 
                         onChange={handlePassword}
                        placeholder="Confirm Password" className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required />
                       
                    </div>
                    {isInvalid && <div className="w-85 mt-2 font-sm text-sm text-red-500">
                      <i class="fa-solid fa-circle-info mr-2"></i>
                      Password do not match</div>}
                    {isValid && <div className="w-85 mt-2 font-sm text-sm text-green-500">
                      <i class="fa-solid fa-circle-info mr-2"></i>
                      Password matched</div>}

        
                    <button type="submit" className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity" disabled={!(isStrong && isValid)}>
                        Sign UP
                    </button>
                    <p className="text-gray-500/90 text-sm mt-4">Already have an account? <a className="text-indigo-400 hover:underline" href="/login">Sign in</a></p>
                    

                    <button onClick={loginWithGoogle} type="button" className="w-full mt-8 bg-gray-500/10 flex items-center cursor-pointer justify-center h-12 rounded-full">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" />
                    </button>
        
                   

                    
                </form>
            </div>
        </div>
  )
}

export default SignUp