import { useState, useEffect } from 'react'
import axios from 'axios'
import WorkspaceGrid from './WorkspaceGrid'
import Recommendations from './Recommendations'

type Props = {}

const HomePage = (props: Props) => {

    const [workspaces, setWorkspaces] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get('/api/workspaces').then((res) => {
            console.log(res.data);
            setWorkspaces(res.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err);
            setLoading(false)
        })
    },[])

  return (
    <div className='m-auto flex flex-col justify-center items-center'>
        <h2 className='text-4xl font-bold text-center p-4 mt-5'>{loading ? "Loading..." : "Workspaces"}</h2>
        <a href='/create' className="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</a>
        <WorkspaceGrid workspaces={workspaces}/>
        {workspaces.length === 0 && <p className="text-black text-center text-2xl font-bold">You have no workspaces. Click the button above to create one.</p>}
        <Recommendations/>
    </div>
  )
}

export default HomePage