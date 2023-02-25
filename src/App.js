import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Poll from './components/Poll';
import Result from './components/Result';
import { BrowserRouter as Router, Switch, Route  , Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreatePoll from './components/CreatePoll';
import About from './components/About';
import Mypolls from './components/Mypolls';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element = { <HomePage/>}>
          </Route>
          <Route exact path="/login" element = { <Login/>}>
          </Route>
          <Route exact path="/signup" element = { <SignUp/>}>
          </Route>
          <Route exact path="/:id/poll" element = { <Poll/>}>
          </Route>
          <Route exact path="/:id/result" element = { <Result/>}>
          </Route>
          <Route exact path="/createpoll" element = { <CreatePoll/>}>
          </Route>
          <Route exact path="/mypoll" element = { <Mypolls/>}>
          </Route>
          <Route exact path="/about" element = { <About/>}>
          </Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
