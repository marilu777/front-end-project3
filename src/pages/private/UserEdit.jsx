import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'

function UserEdit() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [city, setCity] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    

    const {id} = useParams();
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/profile${id}`);
            setUsername(response.data.username);
            setEmail(response.data.email);
            setContact(response.data.contact);
            setCity(response.data.city);
            setImgUrl(response.data.imgUrl);
          
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
    const handleImgUrl = (e) => {
		setImgUrl(true);
		const uploadData = new FormData();
		uploadData.append("video", e.target.files[0]);

		axios
			.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData)
			.then((response) => {
				// console.log("response is: ", response);
				// response carries "fileUrl" which we can use to update the state
				console.log(response.data.fileUrl);
				setVideo(response.data.fileUrl);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log("Error while uploading the file: ", err);
			});
	};


    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {username, email, contact, city, imgUrl};
    
        axios.put(`${process.env.REACT_APP_API_URL}/profile/${id}`, body)
        .then(() => {
            setUsername('')
            setEmail('')
            setContact('')
            setCity('')
            setImgUrl('')
            
            navigate(`/profile/${id}`);
        })
        .catch((err) => console.log(err))
    };

    const deleteUser = (id) => {
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
    }

    return (
        <div >
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">UserName</label>
                <input type="text" name='username' id='username' value={username} onChange={handleUsername}/>
    
                <label htmlFor="email">Email</label>
                <input type="text" name='email' value={email} onChange={handleEmail}/>

                <label htmlFor="contact">Contact</label>
                <input type="text" name='contact' id='contact' value={contact} onChange={handleContact}/>

                <label htmlFor="city">City</label>
                <input type="text" name='city' value={city} onChange={handleCity}/>

                <label htmlFor="imgUrl">ImgUrl</label>
                <input type="file" name='imgUrl' value={imgUrl} onChange={(e) => handleImgUrl}/>
    
                <button type='submit'>Edit Profile</button>
            </form>
            <button onClick={deleteUser}>Delete Profile</button>
    
        </div>
      )
}

export default UserEdit