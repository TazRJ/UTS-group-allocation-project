import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './auth/register'
import Login from './auth/login'
import Home from './pages/Home'
import { AuthProvider } from './helpers/authProvider'
import CreateSubject from './pages/CreateSubject'
import PasswordReset from './auth/PasswordReset'
import ForgotPassword from './auth/ForgotPassword'
import TopicSelection from './pages/TopicSelection'
import FormationChoices from './pages/Group/FormationChoices'
import Groups from './pages/Group/GroupsList'
import GroupFormation from './pages/Group/GroupFormation'
import StudentList from './pages/Group/StudentList'
import PendingApproval from './pages/Group/PendingApproval'
import NotInScope from './layout/NotInScope'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/password-reset/:userId/:token"
              element={<PasswordReset />}
            />
            <Route path="/create-subject" element={<CreateSubject />} />
            <Route path='/not-scope' element={<NotInScope/>}/>
            <Route
              path="/subject/:number/group-formation"
              element={<FormationChoices />}
            />
            <Route path="/subject/:number/groups" element={<Groups />} />
            <Route path="/subject/:number/group-assignment" element={<GroupFormation/>}/>
            <Route path='/subject/:number/pending-approval' element={<PendingApproval/>}/>
            <Route path='/subject/:number/student-list' element={<StudentList/>}/>
            <Route path="/subject/:number" element={<TopicSelection />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
