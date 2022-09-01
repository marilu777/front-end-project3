 
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
 
const API_URL = "http://localhost:5005";
 
 
function Signup(onSignUpSuccess) {
  const [username, setUsername] = useState("");  
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [nif, setNif] = useState("");
  const [password, setPassword] = useState("");
  const [cities, setCities] = useState([])
  
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);
 
  const navigate = useNavigate();

  const getCities = async() => {
    try {
      let response = await axios.get('https://geoapi.pt/distritos/municipios?json=1')
      console.log(response.data)
      const allCities = response.data.map((district) => district.municipios.map((city)=> city )).flat()
      setCities(allCities)

    } catch (error) {
    console.log(error)
    }
  }


  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleContact = (e) => setContact(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleNif = (e) => setNif(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const body = {username, email, contact,  city, nif, password}

    axios.post(`${process.env.REACT_APP_API_URL}/signup`, body)
    .then(async (response) => {
        storeToken(response.data.authToken);
        await authenticateUser();
        navigate("/");
        onSignUpSuccess && onSignUpSuccess();
      })
    .catch((err) => {
        console.log(err)
        setErrorMessage(err.response.data.errorMessage);
    });
}
 
useEffect(() => {
  getCities()
}, [])
  
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col container max-w-sm mx-auto flex-1 items-center justify-center px-1 ">
      <h1 class="mb-8 text-xl text-center font-bold">Sign Up</h1>

      <form className="" onSubmit={handleSubmit}>

      <label class="mb-1 ml-4 text-xs text-left block mt-2 text-gray-600">UserName</label>
        <input 
          class="block border border-grey-light w-full p-3 rounded-full mb-4"
          type="text"
          name="name"
          placeholder="John Doe"
          onChange={handleUsername}
        />

        <label class="mb-1 ml-4 text-xs text-left block mt-2 text-gray-600">Email</label>
        <input 
          class="block border border-grey-light w-full p-3 rounded-full mb-4"
          type="email"
          name="email"
          placeholder="name@email.com"
          onChange={handleEmail}
        />

        <label class="mb-1 ml-4 text-xs text-left block mt-2 text-gray-600">Contact</label>
        <input 
          class="block border border-grey-light w-full p-3 rounded-full mb-4"
          type="contact"
          name="contact"
          placeholder="+351 1234567890"
          onChange={handleContact}
        />

        <label class="mb-1 ml-4 text-xs text-left block mt-2 text-gray-600">City</label>

        <select 
        name="city" 
        id="city"  
        className="block border border-grey-light w-full p-3 rounded-full mb-4 text-xs text-gray-600"
        onChange={handleCity}
        >
          {cities.map((city) => <option value={city}>{city}</option> )}

        </select>
 
        <label class="mb-1 ml-4 text-xs text-left block mt-2 text-gray-600">NIF</label>
        <input 
          class="block border border-grey-light w-full p-3 rounded-full mb-4"
          type="nif"
          name="nif"
          placeholder="012345678"
          onChange={handleNif}
        />
 
        <label className="mb-1 ml-4 text-xs text-left block mt-2 text-gray-600">Password</label>
        <input 
          class="block border border-grey-light w-full p-3 rounded-full mb-4"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handlePassword}
        />
 
        <button 
        class="w-full text-center py-3 bg-blue-800 text-white border-2 focus:outline-none my-1 rounded-full"
        type="submit"
        >Sign Up</button>
      </form>
 
      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
      <p>Already have account?</p>
      <Link className="no-underline border-b border-blue text-blue-600 text-sm" to={"/login"}> Login</Link>
    </div>
  )
}
 
export default Signup;