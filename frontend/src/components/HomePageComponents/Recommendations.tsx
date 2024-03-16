import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Recommendation } from '../../models/Recommendation'

type Props = {}

const Recommendations = (props: Props) => {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([])

    useEffect(() => {
        axios.get('/api/recommendations').then((res) => {
            console.log(res.data)
            setRecommendations(res.data)
        })
    }, [])
  return (
    <>
    <h2 className='text-2xl text-center my-2'>Recommendations</h2>
    <div className=' my-4 grid grid-cols-3 gap-4 w-2/3'>
        {recommendations.map((recommendation: any) => (
            <div className="flex flex-col gap-4 border-4 border-black p-4 rounded-md">
                <p>{recommendation.content}</p>
                <div className="mt-auto"></div>
            </div>
        ))}
    </div>
    </>
  )
}

export default Recommendations