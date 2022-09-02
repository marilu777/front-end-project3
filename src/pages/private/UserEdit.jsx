import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'

function UserEdit() {

    const {userId} = useParams();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [city, setCity] = useState("")
    /* const [imgUrl, setImgUrl] = useState("") */

    
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const storedToken = localStorage.getItem('authToken')
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });
            setUsername(response.data.username);
            setEmail(response.data.email);
            setContact(response.data.contact);
            setCity(response.data.city);
            /* setImgUrl(response.data.imgUrl); */
          
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUser();
    }, []);

    const handleUsername = (e) => setUsername(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handleContact = (e) => setContact(e.target.value)
    const handleCity = (e) => setCity(e.target.value)
    /* const handleImgUrl = (e) => setImgUrl(e.target.value) */
    /* const handleImgUrl = (e) => {
		setImgUrl(true); 
		const uploadData = new FormData();
		uploadData.append("imgUrl", e.target.files[0]);

		axios
			.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData)
			.then((response) => {
				// console.log("response is: ", response);
				// response carries "fileUrl" which we can use to update the state
				console.log(response.data.fileUrl);
				setImgUrl(response.data.fileUrl);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log("Error while uploading the file: ", err);
			});
	}; */


    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {username, email, contact, city /* imgUrl */};
        const storedToken = localStorage.getItem('authToken')
    
        axios.put(`${process.env.REACT_APP_API_URL}/user/${userId}/edit`,
         body,
        {
            headers: {
                Authorization: `Bearer ${storedToken}`
            },
        }
        )
        .then(() => {
            setUsername('')
            setEmail('')
            setContact('')
            setCity('')
            /* setImgUrl('') */
            
            navigate(`/user/${userId}`);
        })
        .catch((err) => console.log(err))
    };


    const deleteUser = async () => {
        try {
          let response = await axios.delete(`${process.env.REACT_APP_API_URL}/profile/${userId}`);
          logOutUser();
          navigate('/signup');
        } catch (error) {
          console.log(error);
        }
      };

    /* const deleteUser = (id) => {
        const storedToken = localStorage.getItem('authToken')
        axios.delete(`${process.env.REACT_APP_API_URL}/profile/${id}`, {
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        })
        .then(() => {
            navigate("/signup");
        })
        .catch((err) => console.log(err));
    } */

    return (
        <div >
            <h3 className="mb-8 text-xl text-center font-bold ">Edit Profile</h3>
            <section className="mb-8 text-sm text-center">
            <form onSubmit={handleSubmit} class="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-10 my-5 border-2 mx-10 overflow-auto">
                <label htmlFor="username" class="mb-1 ml-4 text-sm text-left block mt-2 text-gray-600">UserName</label>
                <input type="text" name='username' id='username' value={username} onChange={handleUsername} class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"/>
    
                <label htmlFor="email" class="mb-1 ml-4 text-sm text-left block mt-2 text-gray-600">Email</label>
                <input type="text" name='email' value={email} onChange={handleEmail} class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"/>

                <label htmlFor="contact" class="mb-1 ml-4 text-sm text-left block mt-2 text-gray-600">Contact</label>
                <input type="text" name='contact' id='contact' value={contact} onChange={handleContact} class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"/>

                <label htmlFor="city" class="mb-1 ml-4 text-sm text-left block mt-2 text-gray-600">City</label>
                <input type="text" name='city' value={city} onChange={handleCity} class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"/>

       {/*          <label htmlFor="imgUrl">ImgUrl</label>
                <input type="file" name='imgUrl' value={imgUrl} onChange={(e) => handleImgUrl}/> */}
    
                <button type='submit' className="w-24 text-center bg-blue-800 text-white border-2 focus:outline-none my-1 rounded-full text-xs mt-9">Edit Profile</button>
            </form>
            </section>
            <div>
               <button onClick={deleteUser} className="w-24 text-center text-gray-300 border-2 focus:outline-none my-1 rounded-full text-xs">Delete Profile</button> 
            </div>
            
    
        </div>
      )
}

export default UserEdit