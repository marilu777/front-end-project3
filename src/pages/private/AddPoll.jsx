import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';

function AddPoll({ getProjects }) {
  const [question, setQuestion] = useState('');
  const [theme, setTheme] = useState('');
  const [description, setDescription] = useState('');
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [text4, setText4] = useState('');
  const {user} = useContext(AuthContext)

  const handleQuestion = (e) => setQuestion(e.target.value);
  const handleTheme = (e) => setTheme(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleText1 = (e) => setText1(e.target.value);
  const handleText2 = (e) => setText2(e.target.value);
  const handleText3 = (e) => setText3(e.target.value);
  const handleText4 = (e) => setText4(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const option1 = 
      {
        text: text1,
        voteCount: "0"
      }
    const option2 = 
      {
        text: text2,
        voteCount: "0"
      }
    const option3 = 
      {
        text: text3,
        voteCount: "0"
      }
    const option4 = 
      {
        text: text4,
        voteCount: "0"
      }

      const options = {
        option1,
        option2,
        option3,
        option4
      }
    
    const body = { question, theme, description, options };
    /* const storedToken = localStorage.getItem('authToken') */

    axios.post(`${process.env.REACT_APP_API_URL}/Addpoll`, body, {
        headers: {
          Authorization: `Bearer ${user._id}`
        }
      })
      .then(() => {
        //AddPoll();
        setQuestion('');
        setTheme('');
        setDescription('');
        setOptions('');
      })
      .catch((err) => console.log(err));

  };

  return (
    <div className='overflow-auto'>
      <h4 className="mt-4 text-xl text-center font-bold">
      <p>Add Poll</p>
      </h4>
      <section class="bg-white w-full rounded divide-y divide-gray-600 my-10">
        <form onSubmit={handleSubmit} class="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-10 my-5 border-2 mx-10 overflow-auto">

          <label class="mb-1 ml-4 text-xs text-left block mt-2 text-gray-600 font-bold">Question</label>
          <input type="text" name="question" value={question} onChange={handleQuestion}  className="block border border-grey-light w-full p-3 rounded-full mb-4"/>

          <label 
          for="grid-state"
          class="mb-1 ml-4 text-xs text-left block mt-2 text-gray-600 font-bold" 
          >Theme</label>
          <select 
          name="theme" 
          value={theme} 
          onChange={handleTheme}
          className='block border border-gray-light rounded-full text-xs text-gray-400 w-48 mr-8'
          >
            <option name="other">Other</option>
            <option name="world">World</option>
            <option name="politics">Politics</option>
            <option name="business">Business</option>
            <option name="tech">Tech</option>
            <option name="health">Health</option>
            <option name="sports">Sports</option>
            <option name="art">Art</option>
            <option name="food">Food</option>
            <option name="education">Education</option>
            <option name="animals">Animals</option>
            <option name="society">Society</option>
          </select>

          <label class="mb-1 ml-4 text-xs text-left block mt-2 text-gray-600 font-bold"> Description</label>
          <input type="text" name="description" value={description} onChange={handleDescription} class="block border border-grey-light w-full p-3 rounded-full mb-4"/>

          <label class="mb-1 ml-4 text-xs text-left block mt-2 text-gray-600 font-bold">Options:</label>
          <input type="text" name="options" value={text1} onChange={handleText1} class="block border border-grey-light w-full p-1 rounded-full mb-4"/>
          <input type="text" name="options" value={text2} onChange={handleText2} class="block border border-grey-light w-full p-1 rounded-full mb-4"/>
          <input type="text" name="options" value={text3} onChange={handleText3} class="block border border-grey-light w-full p-1 rounded-full mb-4"/>
          <input type="text" name="options" value={text4} onChange={handleText4} class="block border border-grey-light w-full p-1 rounded-full mb-4"/>

          <button type="submit" className='border border-blue-600 hover:bg-blue-600 py-1 px-2 rounded-xl focus:outline-none focus:shadow-outline'>New Poll</button>
        </form>

      </section>
    </div>
  );
}

export default AddPoll;