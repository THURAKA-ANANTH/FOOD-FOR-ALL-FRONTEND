import axios from '../../api/axios';
import React from 'react';
import Footer from '../Footer';
import NavBar from '../NavBar';
import "./footer.css"
import { Link } from "react-router-dom";
import {useRef, useState, useEffect, useContext} from 'react'
import AuthContext from '../../context/AuthProvider';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
// import { API_URL } from '../../api/config';
const LOGIN_URL="/main/login"


export default function RequesterSignIn() {

  const [cookies,setCookie]=useCookies(['access_token','roles','_id'])
  const Navigate = useNavigate();


  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
 const errRef = useRef();

  const [username, setUser] = useState('');
  const [password, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [username, password])

  const handleSubmit = async (e) => {
      e.preventDefault();
      // console.log("AAAAAA");
      // console.log(JSON.stringify({username,password}))

      try {
          console.log("HIIIII")
          const response = await axios.post(LOGIN_URL,
              JSON.stringify({ username, password }),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: false
              }
          );
          //console.log(JSON.stringify(response?.data));
          //console.log(JSON.stringify(response));
          const accessToken = response?.data?.accessToken;
          const roles = response?.data?.roles;
          const _id=response?.data?._id;

          let expires = new Date()
          expires.setTime(expires.getTime() + (response.data.expires_in * 1000))
          setCookie('access_token', accessToken, { path: '/',  expires});
          console.log("QQQQQQQQQQQ")
          setCookie('roles', roles ,{path: '/', expires});
          setCookie('_id', _id ,{path: '/', expires});
          console.log(setCookie("_id"))
          
          if (roles==("5150")) {
            Navigate('/organization/dashboard');
          } else if (roles==("1984")){
            Navigate(`requester/profile/${_id}`);
          }
          

          setAuth({ username, password, roles, accessToken });
          setUser('');
          setPwd('');
          setSuccess(true);

          console.log(roles)

          
          // response?.data.roles == 5150 ?
          // // navigate('/staff/home')
          // window.location.replace('/staff/home')
          // : (response?.data.roles == 1984 ?
          //   // navigate('/student/dashboard')
          //   window.location.replace('/student/dashboard')
          //   : response?.data.roles == 2001 ?
          //     // navigate('/admins/home')
          //     window.location.replace('/admins/home')
          //     : navigate('/unauthorized'))




      } catch (err) {
          if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 400) {
              setErrMsg('Missing Username or Password');
          } else if (err.response?.status === 401) {
              setErrMsg('Unauthorized');
          } else {
              setErrMsg('Login Failed');
          }
          //  errRef.current.focus();
          console.log("FFFFFFFF")
      }
  }

  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      
    <div class="container d-flex justify-content-center pt-5 pb-5">
      <div className="card card-signin z-index-0 fadeIn3 fadeInBottom ">
         
        <form class="form-control p-5" onSubmit={handleSubmit}> 
          <p class="h3 fw-bold text-center mb-2 pb-4 border-bottom">Sign in </p>

            <div class="input-group input-group-outline mb-4 pt-4"> 
              <input 
                  type="email" 
                  placeholder="Email Address" 
                  class="form-control"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e)=>{setUser(e.target.value)}}
                  value={username}
                  required
                /> 
            </div> 
            <div class="input-group input-group-outline mb-4 pt-2"> 

              <input 
                  type="password" 
                  placeholder="Password" 
                  class="form-control"
                  id="password"
                  onChange={(e)=>setPwd(e.target.value)}
                  value={password}
                  required
                /> 
            </div> 

           <div class="row border-bottom"> 
              <div class="mb-4 d-flex justify-content-center"> 
                <input type="submit" class="btn btn-primary d-block " value="SIGN IN"/>
              </div> 
           </div>
           <p class="text-center mb-3 pt-2"> Forgot your password?</p> 
           
        </form>
        </div>
      </div>
  
 
  <footer>
    <Footer />
  </footer>
  </div>
  )
}
