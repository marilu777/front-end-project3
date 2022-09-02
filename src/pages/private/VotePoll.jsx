import {useEffect, useState} from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import AddPoll from './AddPoll';
import PollDetails from './PollDetails';


function VotePoll() {

    const [vote, setVote] = useState(null)
    console.log(vote)
    const navigate = useNavigate()
    const {id} = useParams()
    const storedToken = localStorage.getItem('authToken')

    const getVote = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/poll/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
        }
        })
        
          setVote(response.data);
    
      } catch (error) {
        console.log(error)
      }
    }

    const handleVote = async (optionId) => {
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/poll/${id}`, {optionId}, {
          headers: {
            Authorization: `Bearer ${storedToken}`
        }})
        navigate(`/voteResult/${id}`);
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getVote();
    }, [])

  return (
    <div>
      <h2 className="mb-8 text-xl text-center font-bold ">Vote here</h2>
      <div class="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-10 my-5 border-2 mx-10 overflow-auto">
      {vote && (
        <>
        <div className='flex flex-row'>
          <p className='text-gray-600 font-bold mr-2'>Question:</p>
          <p>{vote.question}</p>
        </div>
        <div className='flex flex-row mb-3'>
          <p className='text-gray-600 font-bold mr-2'>Theme:</p> 
          <p>{vote.theme}</p>
        </div>
        {vote.options.map((el) => {
          return (
            <>
            <div className='flex justify-between'>
            <p className='text-sm mr-3 grid justify-items-start'>• {el.text}  {/* {el.voteCount} */}</p> 
            
            <button onClick={() => handleVote(el._id)} className='text-sm border border-red-900 focus:outline-none focus:border-red-800 focus:ring-red-800 hover:text-orange-500 focus:ring-1 w-12 mb-1 rounded-3xl'>Vote</button>
            </div>
            </>
            )
          })}</>       
        )}
      </div>  
    </div>
  )
}

export default VotePoll