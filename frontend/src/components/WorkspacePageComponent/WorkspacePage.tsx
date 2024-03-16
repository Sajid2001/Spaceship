import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Workspace } from '../../models/Workspace'
import Tutorials from './Tutorials'
import Tasks from './Tasks'

type Props = {}

const WorkspacePage = (props: Props) => {
    const { id } = useParams();
    const [workspace, setWorkspace] = useState<Workspace|null>(null)
    useEffect(() => {
        axios.get(`/api/workspaces/${id}`).then((res) => {
            console.log(res.data)
            setWorkspace(res.data)
        })
    }, [])

  return (
    <div className='min-h-screen my-4'>
        {workspace &&
          <>
            <h1 className='text-3xl text-center p-4 font-bold'>{workspace.prompt}</h1>
            <h2 className='text-2xl text-center my-4'>Tasks</h2>
            <Tasks id={workspace.id}/>
            <h2 className='text-2xl text-center my-4'>Tuts</h2>
            <Tutorials id={workspace.id}/>
          </>
          }
    </div>
  )
}

export default WorkspacePage