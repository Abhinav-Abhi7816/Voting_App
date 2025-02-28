import React, {useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useDataContext from './../../Contexts/DataContext';

function Login() {

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const{setLogName}=useDataContext()
  
  const navigate = useNavigate();

  async function onLogin() {
    try {
      const obj = {
        username: user,
        password: pass
      }

      let response = await fetch('https://votingapp-whl5.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      const result = await response.json();
      if (response.status > 200 && response.status < 500) {
        alert(result.message);
        return;
      }
      if (response.status === 500) {
        alert("Internal server error!");
        return;
      }
      
      localStorage.setItem('token',JSON.stringify(result.token));
      let tempName=result.logName.split(' ')[0];
      localStorage.setItem('logName',JSON.stringify(tempName));
      setLogName(tempName)
      if (result.message === "Admin logged in") {
        localStorage.setItem('isAdmin',JSON.stringify(true));
        navigate('/admin');
        return;
      }
      if (result.message === "Voter logged in") {
        localStorage.setItem('isAdmin',JSON.stringify(false));
        navigate('/');
        return;
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='min-h-lvh flex justify-center place-items-center'>
      <div className='min-w-[50%] bg-slate-300 p-5 md:p-10 md:px-20 rounded-xl  m-2 md:mt-10'>
        <div className="max-w-4xl max-sm:max-w-lg mx-auto text-sm min-w-72 md:text-xl font-[sans-serif] md:p-10 p-5 rounded-xl bg-white" style={{ boxShadow: "0px 0px 20px rgb(0,0,0,0.3)" }}>
          <div className="text-center mb-3 md:mb-8 sm:mb-8">
            <h4 className="text-gray-600 text-xl md:text-3xl md:mt-6">Log-in</h4>
          </div>

          <form>
            <div className="grid sm:grid-cols-1 gap-6">
              <div>
                <label className="text-gray-600 mb-2 block">User Name</label>
                <input name="name" type="text" value={user} onChange={(e) => setUser(e.target.value)} className="bg-gray-100 w-full text-gray-800  md:px-4 md:py-3 px-2 py-2   rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" />
              </div>

              <div>
                <label className="text-gray-600  mb-2 block">Password</label>
                <input name="password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="bg-gray-100 w-full text-gray-800  px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" />
              </div>
            </div>

            <div className="md:mt-8 mt-4">
              <button type="button" onClick={onLogin} className="mx-auto block md:py-3 py-1 px-3 md:px-6 tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Log in
              </button>
            </div>
            <div className='flex justify-center gap-5 pt-5'>
              <p className='text-gray-600  mb-2 block'>Haven't signed-up?</p>
              <NavLink to={'/signUp'} className={'text-blue-600 hover:text-blue-500 underline underline-offset-4'}>Sign-up</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
