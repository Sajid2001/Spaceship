import { useState } from "react"
import axios from "axios"
import { Workspace } from "../../models/Workspace"
import { useNavigate } from "react-router-dom"

type Props = {}

const WorkspaceForm = (props: Props) => {

    const [prompt,SetPrompt] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = () => {
        //console.log("I want to built a " + prompt);
        setLoading(true)
        const newWorkspace: Workspace = {
            prompt: "I want to built a " + prompt
        }
        axios.post('/api/workspaces', newWorkspace).then((res) => {
            console.log(res.data)
            navigate(`/workspace/${res.data.id}`)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }
  return (
    <div className='w-1/3 flex flex-col gap-4 border-4 border-black p-4 rounded-md'>
        <h3 className="text-2xl text-center">I want to build a...</h3>
        <input placeholder="Spaceship..." className="rounded-md border-2 border-black p-2" value={prompt} onChange={(e) => SetPrompt(e.target.value)}/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit} type="button">Get Started</button>
        {loading && <p>Loading...</p>}
    </div>
  )
}

export default WorkspaceForm