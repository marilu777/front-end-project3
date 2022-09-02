import {useEffect, useState, useContext} from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/auth.context'
import { useNavigate } from 'react-router-dom'

function UserProfile() {

    const {user, logOutUser} = useContext(AuthContext)
    const navigate = useNavigate();

    const {userId} = useParams();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [city, setCity] = useState("")
    const [nif, setNif] = useState("")

  const getUser = async () => {
        try {
            const storedToken = localStorage.getItem('authToken')
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`, );{
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            };
            setUsername(response.data);
            setEmail(response.data);
            setContact(response.data);
            setCity(response.data);
            setNif(response.data);
          
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUser();
    }, []) 

  return (
    <div className='px-10'>
        <h1 className="mb-8 text-xl text-center font-bold ">Profile Page</h1>
        <section class="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-10 my-5 border-2 mx-10 overflow-auto">
        {user && (
            <>
            {/* <div className='border-2 border-black text-center p-10 bg-gray-800 border-b mt-0 rounded-lg'>
                <img src={user.imgURL} alt='imgUrl' className='border-white'>{user.imgURL}</img>
            </div> */}
            <p className='font-bold text-lg my-3'>{user.username}</p>
            <p className=''>Email: {user.email}</p>
            <p>Contact: {user.contact}</p>
            <p>NIF: {user.nif}</p>
            <p className='mb-5'>Location: {user.city}</p>
            </>
             )} 
        </section>   
            <Link to="/login">
                <button onClick={logOutUser} className="w-24 text-center bg-blue-800 text-white border-2 focus:outline-none my-1 rounded-full text-xs">Logout</button>
            </Link>       
            <Link to={`/user/${userId}/edit/`}>
              <button className="w-24 text-center bg-blue-800 text-white border-2 focus:outline-none my-1 rounded-full text-xs">Edit Profile</button>
            </Link>
          
    </div>
  )
}

export default UserProfile