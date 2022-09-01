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
        navigate(`/voteResult`);
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getVote();
    }, [])

  return (
    <div>
      <h2>Vote here</h2>
      {vote && (
<>
        <p>Question: {vote.question}</p>  
        <p>Theme:{vote.theme}</p> 
        
        {vote.options.map((el) => {
          return (
            <>
            <p className='text-xs'>{el.text} : {el.voteCount}</p> 
            <button onClick={() => handleVote(el._id)} >Vote</button>
            </>
            )
          })}</>       
        )}
    </div>
  )
}

export default VotePoll