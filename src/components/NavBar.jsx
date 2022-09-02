import { Link } from "react-router-dom";
import { useContext } from "react";                    
import { AuthContext } from "../context/auth.context"; 

 
function Navbar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);  
 
  

  return (
    <footer>
      {/* {isLoggedIn && (
        <>
          <Link to="/">
            <button>LogIn</button>
          </Link>        
          <Link to="/login"><button onClick={logOutUser}>Logout</button></Link>
          <span>{user && user.name}</span>
        </>
      )} */}
 
      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}

      <div className="p-2 bg-blue-900 fixed bottom-0 left-0 z-20 w-full border-t border-gray-200 shadow md:flex md:items-center md:justify-around md:p-6 dark:bg-gray-900 dark:border-gray-600">
        <Link to="/mypolls">
            <button className="text-sm mx-2 text-gray-500 hover:text-blue-50 duration-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>My Polls</button>
        </Link>
        <Link to="/">
            <button className="text-gray-500 mx-2 text-sm hover:text-blue-50 duration-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>Home</button>
        </Link>
        <Link to="/Addpoll">
            <button className="text-gray-500 mx-2 text-sm hover:text-blue-50 duration-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>Add Polls</button>
        </Link>
        {isLoggedIn && user && (
        <Link to={`/user/${user._id}`} >
            <button className="text-gray-500 mx-2 text-sm hover:text-blue-50 duration-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>Profile</button>
        </Link>
        )}
      </div>
      
 

    </footer>
  );
}
 
export default Navbar;