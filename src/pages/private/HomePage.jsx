import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AddPoll from './AddPoll';
import PollsPage from './PollsPage';
import PollDetails from './PollDetails';

function HomePage() {
    const [polls, setPolls] = useState([])
    /* const navigate = useNavigate(); */

    const getPolls = async () => {
        try {
            const storedToken = localStorage.getItem('authToken')
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/poll`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });
            setPolls(response.data.reverse());
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getPolls();
    }, [])
    
    const votePoll = (id) => {
        try {
            const storedToken = localStorage.getItem('authToken')
            let vote = axios.get(`${process.env.REACT_APP_API_URL}/votepoll/${id}`, {
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        })
        setVotePoll(votePoll.data);
        } catch (error) {
            console.log(error)
        }  
    }


  return (
    <div className='mb-5'>  
    <h1 className="mb-8 text-xl text-center font-bold mt-4">Home Page</h1>
    <section className='flex flex-wrap overflow-auto mb-10'>
    {polls.map((poll) => {
        return(
            <div key={poll} class="max-w-sm overflow-hidden rounded-lg bg-white shadow-md duration-300 mb-10 border border-red-900 w-full mx-12 ">
                <Link to={`/${poll._id}`}>
                    <h4 className='text-sm text-center font-medium'>{poll.question}</h4>
                    <h4 className='text-xs text-left ml-6'>Theme: {poll.theme}</h4>
                    <h4 className='text-xs text-left mx-6 border border-y-red-800 '>{poll.description}</h4>
                    <h4 className='mt-2'>
                    {poll.options.map((el) => {
                            return (
                                <>
                                   <p className='text-xs'>{el.text}   {el.voteCount}</p> 
                                </>
                            )
                        })}
                    </h4>
                   <div class="mb-4 mt-6 text-center">
                    <Link to={`/votepoll/${poll._id}`} class="transition duration-500 hover:bg-amber-900/50 hover:scale-105 hover:shadow-xl text-red-900 border border-red-900 rounded-3xl font-bold py-1 px-2 focus:outline-none focus:shadow-outline shadow-md text-xs">Vote</Link>
                   </div> 
                </Link>
                
                
            </div>
                )
            })}
      
    </section>
    <div className='mb-5'></div>
    </div>
  )
}

export default HomePage