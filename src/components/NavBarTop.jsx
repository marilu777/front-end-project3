import { Link } from "react-router-dom";
import { useContext } from "react";                    
import { AuthContext } from "../context/auth.context"; 


function NavBarTop() {

  return (
    <div>
        <nav className="p-1 bg-blue-900 flex items-center">
            <div className="flex items-center mx-auto m-0">
                <img  src={'./img/logotransp.png'} height={110} width={110} /> 
            </div>
        </nav>
    </div>
  )
}

export default NavBarTop