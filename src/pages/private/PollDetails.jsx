import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios';
import { DoughnutController } from 'chart.js';
import DoughnutChart from './DoughnutChart';


function PollDetails() {

    const [pollDetails, setPollDetails] = useState(null)
    const [comments, setComments] = useState()
    const {id} = useParams();
    console.log(poll)
    const storedToken = localStorage.getItem('authToken')

    const getPollDetails = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/poll/pollResult/${id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }});
            setPollDetails(response.data);
            /* setComments(response.data); */

            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    const getComments = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/poll/pollResult/${id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }})
            setComments(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    
/*
    const votesA = results
    .map((options) => options.voteCount)
    .reduce((options, voteCount) => voteCount + 1, 0);

    const votesB = results
    .map((options) => options.voteCount)
    .reduce((options, voteCount) => voteCount + 1, 0);

    const votesC = results
    .map((options) => options.voteCount)
    .reduce((options, voteCount) => voteCount + 1, 0);

    const votesD = results
    .map((options) => options.voteCount)
    .reduce((options, voteCount) => voteCount + 1, 0);

    const percen = results
    .map((options) => options.voteCount)
    .reduce((options, voteCount) => (voteCount / 100) * 100, 0);

    function percentage(voteCount_id, allVotes) {
        return (100 * voteCount_id) / allVotes;
     } 


     const [userData, setUserData] = useState({
        labels: Vote.map((options.voteCount) => options.voteCount[[0][1]]),
         [totalVotesA, totalVotesB, totalVotesC, totalVotesD], 
        datasets: [{
            label: "Users Gained",
            data: Vote.map((options.voteCount) => options.voteCount[[0][1]])
        }]
    } )*/


    useEffect(() => {
        getProject();
    }, [])

  return (
    <div >
        <h2>Results</h2>
        <div>
           <DoughnutChart options={chartOptions} data={chartData}/> 
        </div>
        <div>
            {pollDetails && (
                <>
                <p>Question: {pollDetails.question}</p>
                <p>Theme:{pollDetails.theme}</p>
                {poll.options.map((el) => {
                    return (
                        <>
                        <p>{el.text} : {el.voteCount}</p>
                        </>
                    )
                })}
                </>
                )}      
        </div>
        <div>
            {comments && (
                <>
                <p>{comments.author}</p>
                <p>{comments.content}</p>
                </>
            )}
        </div>

        <Link to="/">
            <button>Go back</button>
        </Link>

    </div>
  )
}

export default PollDetails