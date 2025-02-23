import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router'

function SignUp() {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [age, setAge] = useState();
  const [gender, setGender] = useState('');
  const [adNo, setADNO] = useState();
  const [vId, setVID] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState();
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');

  const navigate=useNavigate();

  const submitClick = async () => {
    if (name.trim() === "" || user.trim() === "" || gender.trim() === "" || vId.trim() === "" || email.trim() === "" || pass1.trim() === "" || pass2.trim() === "" || !age || !adNo || !mobile) {
      alert("Fill all the fields!");
      return;
    }
    if(age<18)
    {
      alert("Age must be above 18!");
      return;
    }
    if(pass1!==pass2)
    {
      alert('Passwords mismatch!');
      return;
    }

    const obj={
      name:name,
      age:age,
      gender:gender,
      aadharNo:adNo,
      voterId:vId,
      email:email,
      mobileNo:mobile,
      username:user,
      password:pass1,
      isVoted:false
    }
    let response=await fetch('https://votingapp-avio.onrender.com/signUp',{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify(obj)
    })
    if(response.status===200)
    {
      alert("SignUp Successful! Login to Vote!")
      navigate('/login');
      
    }

    const result=await response.json();
    if(response.status>200 && response.status<500)
    {
      alert(result.message);
    }

    if(response.status===500)
    {
      alert('Internal server error')
    }
    // console.log(result);
  }

  return (
    <div className='min-h-lvh flex justify-center place-items-center'>
      <div className='min-w-[70%] bg-slate-300 md:p-10 p-5 rounded-xl mt-16 md:mt-32 md:m-5 m-2'>
        <div className="max-w-4xl max-sm:max-w-lg mx-auto text-sm md:text-lg font-[sans-serif] p-8 rounded-xl bg-white" style={{ boxShadow: "0px 0px 20px rgb(0,0,0,0.3)" }}>
          <div className="text-center mb-2 md:mb-12 sm:mb-8">
            <h4 className="text-gray-600 text-xl md:text-3xl">Sign-up</h4>
          </div>
          <form>
            <div className="grid sm:grid-cols-2 gap-3 md:gap-6">
              <div>
                <label className="text-gray-600 mb-2 block">Name</label>
                <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-100 w-full text-gray-800  md:px-4 px-3 md:py-3 py-1.5 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" />
              </div>
              <div>
                <label className="text-gray-600  mb-2 block">User Name</label>
                <input name="lname" type="text" value={user} onChange={(e) => setUser(e.target.value)} className="bg-gray-100 w-full text-gray-800 md:px-4 px-3 md:py-3 py-1.5 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter user name" />
              </div>
              <div>
                <label className="text-gray-600  mb-2 block">Age</label>
                <input name="password" type="number" value={age} onChange={(e) => setAge(e.target.value)} className="bg-gray-100 w-full text-gray-800  md:px-4 px-3 md:py-3 py-1.5 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter age" />
              </div>
              <div>
                <label className="text-gray-600 md:mb-2 block">Gender</label>
                <div className='flex justify-center py-2 md:py-3'>
                  <input name="gender" id='male' type="radio" value={'male'} onChange={(e) => setGender(e.target.value)} className="bg-gray-100 w-full text-gray-800  md:px-4 px-3 md:py-3 py-1.5 rounded focus:bg-transparent outline-blue-500 transition-all" />
                  <label htmlFor='male' className='hover:cursor-pointer'>Male</label>
                  <input name="gender" id='female' type="radio" value={'female'} onChange={(e) => setGender(e.target.value)} className="bg-gray-100 w-full text-gray-800  md:px-4 px-3 md:py-3 py-1.5 rounded focus:bg-transparent outline-blue-500 transition-all" />
                  <label htmlFor='female' className='hover:cursor-pointer'>Female</label>
                  <input name="gender" id='other' type="radio" value={'other'} onChange={(e) => setGender(e.target.value)} className="bg-gray-100 w-full text-gray-800  md:px-4 px-3 md:py-3 py-1.5 rounded focus:bg-transparent outline-blue-500 transition-all" />
                  <label htmlFor='other' className='hover:cursor-pointer'>Other</label>
                </div>
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">Aadhar No</label>
                <input name="aNumber" type="number" value={adNo} onChange={(e) => setADNO(e.target.value)} className="bg-gray-100 w-full text-gray-800  md:px-4 px-3 md:py-3 py-1.5 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter aadhar number " />
              </div>
              <div>
                <label className="text-gray-600  mb-2 block">Voter Id</label>
                <input name="vId" type="text" value={vId} onChange={(e) => setVID(e.target.value)} className="bg-gray-100 w-full text-gray-800 md:px-4 px-3 md:py-3 py-1.5 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter voter id" />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">Email Id</label>
                <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 w-full text-gray-800 md:px-4 px-3 md:py-3 py-1.5 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" />
              </div>

              <div>
                <label className="text-gray-600 mb-2 block">Mobile No.</label>
                <input name="number" type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="bg-gray-100 w-full text-gray-800 md:px-4 px-3 md:py-3 py-1.5 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter mobile number" />
              </div>
              <div>
                <label className="text-gray-600  mb-2 block">Password</label>
                <input name="password" type="password" value={pass1} onChange={(e) => setPass1(e.target.value)} className="bg-gray-100 w-full text-gray-800  md:px-4 px-3 md:py-3 py-1.5 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">Confirm Password</label>
                <input name="cpassword" type="password" value={pass2} onChange={(e) => setPass2(e.target.value)} className="bg-gray-100 w-full text-gray-800  md:px-4 px-3 md:py-3 py-1.5 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter confirm password" />
              </div>

            </div>

            <div className="mt-8">
              <button type="button" onClick={submitClick} className="mx-auto block py-3 px-6 tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Sign up
              </button>
            </div>
            <div className='flex justify-center gap-5 pt-5'>
              <p className='text-gray-600  mb-2 block'>Already have an account?</p>
              <NavLink to={'/login'} className={'text-blue-600 hover:text-blue-500 underline underline-offset-4'}>Login</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
