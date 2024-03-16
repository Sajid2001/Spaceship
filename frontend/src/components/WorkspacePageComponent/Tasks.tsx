import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Task } from '../../models/Task'
type Props = {
    id: number|undefined
}

const Tasks = (props: Props) => {
    const [tasks, setTasks] = useState<Task[]>([])
    useEffect(() => {
        axios.get(`/api/workspaces/${props.id}/tasks`).then((res) => {
            console.log(res.data)
            setTasks(res.data)
        })
    }, [])
  return (
    <div className='w-2/3 grid grid-cols-3 m-auto gap-4 my-5'>
        {tasks.map((task: any) => (
            <div className="flex flex-col gap-4 border-4 border-black p-4 rounded-md">
                <p>{task.content}</p>
            </div>
        ))}
    </div>
  )
}

export default Tasks