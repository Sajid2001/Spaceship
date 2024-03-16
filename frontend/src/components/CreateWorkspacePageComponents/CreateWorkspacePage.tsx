import React from 'react'
import WorkspaceForm from './WorkspaceForm'

type Props = {}

const CreateWorkspacePage = (props: Props) => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <WorkspaceForm/>
    </div>
  )
}

export default CreateWorkspacePage