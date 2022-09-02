import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import AddPoll from './AddPoll';
import PollDetails from './PollDetails';


function PollsPage() {
    const [polls, setPolls] = useState([])

    console.log(polls)

    const navigate = useNavigate()

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

    

    const deletePoll = (id) => {
        const storedToken = localStorage.getItem('authToken')
        axios.delete(`${process.env.REACT_APP_API_URL}/delete-poll/${id}`, {
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        })
        .then(() => {
            navigate("/mypolls");
        })
        .catch((err) => console.log(err));
    }

  return (
    <div >
        <h1 className="mb-8 text-xl text-center font-bold mt-4">My polls</h1>
        
        <section className='flex flex-wrap overflow-auto mb-10'>
        {polls && polls.map((poll) => {
            return(
                <div key={poll._id} class="max-w-sm overflow-hidden rounded-lg bg-white shadow-md duration-300 mb-10 border border-red-900 w-full mx-12">
                    <Link to={`/mypolls/${poll._id}`}>
                        <h4 className='text-sm text-center font-medium'>{poll.question}</h4>
                        <h4 className='text-xs text-left ml-6'>Theme: {poll.theme}</h4>
                        <h4 className='text-xs text-left mx-6 border border-y-red-800'>{poll.description}</h4>
                        
                        {poll.options.map((el) => {
                            return (
                                <>
                                   <p className='text-xs'>{el.text} : {el.voteCount}</p> 
                                </>
                            )
                        })}
                        {/* <h4>{poll.options}</h4> */}
                    </Link>
                    
                    <div className="flex justify-end mt-3">
                        <Link to={`${poll._id}/voteResult`} className="text-xs border-dotted border border-black-400/50 rounded-full m-2 text-zinc-400">Results</Link>
                        <button onClick={() => deletePoll(poll._id)} className="text-xs border-dotted border border-black-400/50 rounded-full m-2 text-zinc-400"> Delete Poll </button>
                    </div>
                </div>
                    )
                     })}
        </section>             
    </div>
  )
}

export default PollsPage