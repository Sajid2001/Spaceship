import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Workspace } from "../../models/Workspace"
type Props = {
    workspaces: Workspace[]
}

const WorkspaceGrid = (props: Props) => {
    const { workspaces } = props
    const navigate = useNavigate()

    const handleNavigate = (id: number) => {
        navigate(`/workspace/${id}`)
    }

  return (
    <div className="grid grid-cols-3 m-auto justify-center items-center gap-3 w-2/3 mt-10">
        {workspaces.length > 0 && workspaces.map((workspace: any) => (
            <div className="flex flex-col gap-4 border-4 border-black p-4 rounded-md">
                <h3 className="text-2xl text-center">{workspace.prompt}</h3>
                <button onClick={() => handleNavigate(workspace.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enter</button>
            </div>
        ))}
    </div>
  )
}

export default WorkspaceGrid