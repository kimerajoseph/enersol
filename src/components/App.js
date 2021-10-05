// import logo from './logo.svg';
import './App.css';
import './Mycss.css'
import Signup from "./Signup";
//import { Container } from 'react-bootstrap'
import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from "./Home";
import Equipment from "./Equipment";
import Selfhelp from "./Selfhelp"
import QuotePage from "./QuotePage"
//import axios from 'axios';

function App() {
  //const [data, setData] = React.useState(null);
  const [state, setState ] = useState([]);

  const getData = async() =>{
    const response = await fetch("/api");
    const data = await response.json();
    setState(data)
  };
  useEffect(() => {
    //CALL GET DATA FUNCTION
    getData();
    
  }, []);

console.log(state)
  return (
    // style = {{backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)),url(/1.jpg)", backgroundSize:'cover'}}>
    <Router>
{/* style = {{position: 'sticky', top: 0, z-index: 1}} */}
    {/* <h2>Welcome to React Router Tutorial</h2> */}
    
          <nav className="navbar navbar-expand-lg navbar-light bg-light" 
          style = {{position: 'sticky', top: 0,width:'100%',zIndex:1,
        backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)),url(/1.jpg)", backgroundSize:'cover'}}>
          <ul className="navbar-nav mr-auto" style = {{marginLeft:'40%', fontSize:25,color:'white'}}>
            <div className = "w-100 d-flex align-items-center justify-content-center">
            <li><Link to={'/'} className="nav-link " style = {{color:'white'}}> Home </Link></li>
            <li><Link to={'/equipment'} className="nav-link" style = {{color:'white'}}> Equipment </Link></li>
            <li><Link to={'/signup'} className="nav-link" style = {{color:'white'}}> Sign Up </Link></li>
            <li><Link to={'/selfhelp'} className="nav-link" style = {{color:'white'}}> Self Help </Link></li>
            <li><Link to={'/quotepage'} className="nav-link" style = {{color:'white'}}> Get Quote </Link></li>
            </div>
           
          </ul>

          </nav>
          

    <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/equipment' component={Equipment} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/selfhelp' component={Selfhelp} />
              <Route exact path='/quotepage' component={QuotePage} />
          </Switch>
    
   </Router>
  );
}

export default App;

