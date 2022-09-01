import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/auth.context';
 
const API_URL = "http://localhost:5005";
 
 
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);
 
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
 
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    axios.post(`${process.env.REACT_APP_API_URL}/login`, requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken );
        storeToken(response.data.authToken); 
        authenticateUser(); 
        navigate('/Addpoll');                         
      })
      .catch((error) => {
        console.log(error)
   
      })
  };
  
  return (
    <div className="bg-grey-lighter max-w-md w-full space-y-4 p-5 flex flex-col container mx-auto items-center justify-center px-1 ">
      <h1 class="mb-8 text-xl text-center font-bold">Login</h1>
 
      <form onSubmit={handleLoginSubmit}>
        <label class="mb-1 ml-4 text-xs text-left block mt-2 text-gray-600">Email:</label>
        <input 
          class="block border border-grey-light w-full p-3 rounded-full mb-4"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
 
        <label class="mb-1 ml-4 text-xs text-left block mt-2 text-gray-600">Password:</label>
        <input
          class="block border border-grey-light w-full p-3 rounded-full mb-4"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
 
        <button
        class="w-full text-center py-3 bg-blue-800 text-white border-2 focus:outline-none my-1 rounded-full text-xs"
        type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
      <p className="text-xs">Don't have an account yet?</p>
      <Link className="no-underline border-b border-blue text-blue-600 text-sm" to={"/signup"}> Sign Up</Link>
    </div>
  )
}
 
export default Login;