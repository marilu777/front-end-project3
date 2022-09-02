import './App.css';
import {Routes, Route} from "react-router-dom";
import Navbar from './components/NavBar';
import NavBarTop from './components/NavBarTop';

import IsAnon from './pages/private/IsAnon';
import IsPrivate from './pages/private/IsPrivate';
import Signup from './pages/authPages/Signup';
import Login from './pages/authPages/Login';

import HomePage from './pages/private/HomePage';
import AddPoll from './pages/private/AddPoll';
import PollsPage from './pages/private/PollsPage';
import VotePoll from './pages/private/VotePoll';
import PollDetails from './pages/private/PollDetails';

import UserProfile from './pages/private/UserProfile';
import UserEdit from './pages/private/UserEdit';




function App() {
  return (
    <div className="App">
      
      <NavBarTop />
      <Routes>
            <Route path="/" element={<IsPrivate><HomePage /></IsPrivate>}/>

            <Route path="/user/:userId" element={ <IsPrivate><UserProfile /></IsPrivate>}/>
            <Route path="/user/:userId/edit" element={ <IsPrivate><UserEdit /></IsPrivate>}/>

            <Route path="/Addpoll" element={<IsPrivate><AddPoll/></IsPrivate> }/>
            <Route path="/mypolls" element={ <IsPrivate><PollsPage /></IsPrivate>}/>

            <Route path="/votePoll/:id" element={ <IsPrivate><VotePoll /></IsPrivate>}/>
            <Route path="/voteResult/:id" element={ <PollDetails />}/>
      
        
            <Route path="/signup" element={ <IsAnon><Signup/></IsAnon> } />
            <Route path="/login" element={ <IsAnon><Login/></IsAnon> } />
     

      </Routes>
      <Navbar />

    </div>
  );
}

export default App;
