import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import LoginPage from "./components/LoginPageComponents/LoginPage";
import HomePage from "./components/HomePageComponents/HomePage";
import WorkspacePage from "./components/WorkspacePageComponent/WorkspacePage";
import CreateWorkspacePage from "./components/CreateWorkspacePageComponents/CreateWorkspacePage";
import FillInterestsPage from "./components/FillInterestsPageComponents/FillInterestsPage";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { login } from "./redux/slices/user";

function App() {

  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.user.value)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    axios.get('/auth/current_user')
    .then((res) => {
      console.log(res.data)
      dispatch(login(res.data))
      setLoading(false)
    })
    .catch((err) => {
      setLoading(false)
      console.log(err)
    })
  }, [])

  // TODO: Add loading component
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={user.id !== -1 ? 
            user.filled ? <HomePage /> 
            : <Navigate to="/fill" /> : <Navigate to="/login" />
            } />

          <Route path="/login" element={user.id === -1 ? <LoginPage /> : <Navigate to="/" />} />

          <Route path="/workspace/:id" element={
            user.id !== -1 ? 
            user.filled ? <WorkspacePage /> : <Navigate to="/fill" /> 
            : <Navigate to="/login" />
            } />

          <Route path="/create" element={user.id !== -1 ? <CreateWorkspacePage /> : <Navigate to="/login" />} /> 

          <Route path="/fill" element={
            user.id !== -1 ? 
            !user.filled ? <FillInterestsPage /> : <Navigate to="/" /> 
            : <Navigate to="/login" />
            } />
            
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
