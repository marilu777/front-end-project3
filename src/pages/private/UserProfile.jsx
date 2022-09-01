import {useEffect, useState, useContext} from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/auth.context'

function UserProfile() {
    //const [user, setUser] = useState(null)

    const {user} = useContext(AuthContext)
    console.log(user)
    /* const getUser = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/profile${user._id}`);
            setUser(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getProject();
    }, []) */

  return (
    <div className='px-10'>
        <h1 className="mb-8 text-xl text-center font-bold ">Profile Page</h1>
        <section className='border-2 border-black text-center border-b rounded-lg mb-2'>
        {user && (
            <>
            <div className='border-2 border-black text-center p-10 bg-gray-800 border-b mt-0 rounded-lg'>
                <img src={user.imgURL} alt='imgUrl' className='border-white'>{user.imgURL}</img>
            </div>
            <p className='font-bold text-lg my-3'>{user.username}</p>
            <p className=''>Email: {user.email}</p>
            <p>Contact: {user.contact}</p>
            <p>NIF: {user.nif}</p>
            <p className='mb-5'>Location: {user.city}</p>
            </>
             )} 
        </section>   
            <Link to="/login">
                <button onClick={logOutUser}>Logout</button>
            </Link>       
            <Link to={`/user/edit/${user._id}`}>
              <button class="w-24 text-center bg-blue-800 text-white border-2 focus:outline-none my-1 rounded-full text-xs">Edit Profile</button>
            </Link>
          
    </div>
  )
}

export default UserProfile