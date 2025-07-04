// import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import About from './components/about/About';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import AddAgent from './components/agent/AddAgent';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/footer/Footer';
import AllTask from './components/AllTask';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

   const [agents, setAgents] = useState([]);
   const [distributedData, setDistributedData] = useState({});

  return (
  <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
       <Router>
              <Navbar/>

              <Routes>
                    <Route exact path ='/' element ={ <Home/>}/>
                    <Route  path ='/about-us' element ={ <About/>}/>
                    <Route  path ='/signup' element ={ <Signup/>}/>
                    <Route  path ='/signin' element ={ <Signin/>}/>
                    <Route
                            path="/add-agent"
                            element={
                              <AddAgent
                                agents={agents}
                                setAgents={setAgents}
                                distributedData={distributedData}
                                setDistributedData={setDistributedData}
                              />
                            }
                          />
                                    <Route path="/all-tasks" element={<AllTask/>} />
                    <Route path="/dashboard" element={<Dashboard agents={agents} setAgents={setAgents} />} />
              </Routes>

            <Footer/>
            <ToastContainer
              position="top-right"
              autoClose={3000}      
            />
      </Router>
    </div>
  );
}

export default App;



  


