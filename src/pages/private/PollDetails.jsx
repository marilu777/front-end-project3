import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios';
import { DoughnutController } from 'chart.js';
import DoughnutChart from './DoughnutChart';


function PollDetails() {

    const [pollDetails, setPollDetails] = useState(null)
    const [comments, setComments] = useState() 
    const {id} = useParams();
    const storedToken = localStorage.getItem('authToken')

    const getPollDetails = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/poll/${id}`, {
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
        getPollDetails();
    }, [])

  return (
    <div >
        <h2 className="mb-8 text-xl text-center font-bold ">Results</h2>
        <div>
           {/* <DoughnutChart options={chartOptions} data={chartData}/>  */}
        </div>
        <div class="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-10 my-5 border-2 mx-10 overflow-auto">
            {pollDetails && (
                <>
                <p class="mb-1 ml-4 text-sm text-left block mt-2 text-gray-600 font-bold">Question: {pollDetails.question}</p>
                <p class="mb-4 ml-4 text-sm text-left block mt-2 text-gray-600 font-bold">Theme: {pollDetails.theme}</p>
                {pollDetails.options.map((el) => {
                    return (
                        <>
                        <div className='flex justify-between mx-12'>
                            <p className='text-sm mb-2'>• {el.text} </p> 
                            <p className='text-sm mb-2'>{el.voteCount}</p>  
                        </div>
                        
                        </>
                    )
                })}
                </>
                )}      
        </div>
        <div>
           {/*  {comments && (
                <>
                <p>{comments.author}</p>
                <p>{comments.content}</p>
                </>
            )} */}
        </div>

        <Link to="/">
            <button className='hover:text-sky-500 mb-15'>Go back</button>
        </Link>

    </div>
  )
}

export default PollDetails