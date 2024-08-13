import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Notfound from './components/pages/Notfound';
import Weblayout from './layout/Weblayout';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import Managerlayout from './layout/Managerlayout';
import Managerdashboard from './components/pages/manager/Managerdashboard';
import Projects from './components/pages/manager/Projects';
import Members from './components/pages/manager/Members';
import TaskAssign from './components/pages/manager/TasksAssign';

import AllTasks from './components/pages/user/AllTasks';
import Complete from './components/pages/user/Complete';
import Notstarted from './components/pages/user/Notstarted';
import Progress from './components/pages/user/Progress';
import UserLayout from './layout/Userlayout';
import UserProfile from './components/pages/user/UserProfile';


const App = () => {
  return (
    <div>
      <>
      <BrowserRouter>
        <Routes>
          <Route element={<Weblayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/*' element={<Notfound />} />
          </Route>
          <Route element={<Managerlayout/>}>
            <Route path='/managerdashboard' element={<Managerdashboard/>} />
            <Route path='/manager' element={<Projects/>} />
            <Route path='/members' element={<Members/>}/>
            <Route path='/tasks' element={<TaskAssign/>}/>
          </Route>
          <Route element={<UserLayout/>}>
            <Route path='/userprofile' element={<UserProfile/>} />
            <Route path='/alltasks' element={<AllTasks/>} />
            <Route path='/completed' element={<Complete/>}/>
            <Route path='/progress' element={<Progress/>}/>
            <Route path='/notstarted' element={<Notstarted/>}/>
          </Route>
        </Routes> 
      </BrowserRouter>
    </>
    </div>
  )
}

export default App;