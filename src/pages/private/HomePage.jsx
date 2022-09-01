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
            <div key={poll} class="max-w-sm overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl mb-4 border border-teal-700 w-full mx-12">
                <Link to={`/${poll._id}`}>
                    <h4 className='text-sm text-center font-medium underline decoration-dotted decoration-slate-400'>{poll.question}</h4>
                    <h4 className='text-xs text-left ml-6'>Theme: {poll.theme}</h4>
                    <h4 className='text-xs text-left mx-6 border border-teal-700 rounded-lg'>{poll.description}</h4>
                    
                    {poll.options.map((el) => {
                            return (
                                <>
                                   <p className='text-xs'>{el.text} : {el.voteCount}</p> 
                                </>
                            )
                        })}
                    
                </Link>

                <Link to={`/votepoll/${poll._id}`} className="text-xs border-dotted border border-black-400/50 rounded-full m-2 text-zinc-400">Vote</Link>
            </div>
                )
            })}
    </section>
    <div className='mb-5'></div>
    </div>
  )
}

export default HomePage