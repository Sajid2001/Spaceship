import { useEffect, useState } from "react"
import axios from "axios"
import { Tutorial } from "../../models/Tutorial"

type Props = {
    id: number|undefined
}

const Tutorials = (props: Props) => {
    const [tutorials, setTutorials] = useState<Tutorial[]>([])

    useEffect(() => {
        axios.get(`/api/workspaces/${props.id}/tutorials`).then((res) => {
            console.log(res.data)
            setTutorials(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

  return (
    <div className="w-2/3 grid grid-cols-3 m-auto gap-4">
        {tutorials.map((tutorial: any) => (
            <div className="flex flex-col gap-4 border-4 border-black p-4 rounded-md">
                <img src={tutorial.img} alt="Tutorial Image" />
                <h3 className="text-2xl text-center font-bold">{tutorial.name}</h3>
                <p>{tutorial.description}</p>
                <p>Instructor: {tutorial.instructor}</p>
                <p className="font-bold">Price: {tutorial.price}</p>
                <div className="mt-auto"></div>
                <a href={`${tutorial.url}`} target="_blank" className="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View</a>
            </div>
        ))}
    </div>
  )
}

export default Tutorials