import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { login } from "../../redux/slices/user"
import { useDispatch } from "react-redux"

type Props = {}

const FillInterestsForm = (props: Props) => {

    const [skillLevel, setSkillLevel] = useState('Beginner')
    const [interest, setInterest] = useState('Web')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSkillLevelChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setSkillLevel(e.target.value);
    };

    // Event handler for interests select change
    const handleInterestsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInterest(e.target.value);
    };

    const handleSubmit = () => {
        console.log('Skill Level:', skillLevel);
        console.log('Interest:', interest);
        setLoading(true)
        console.log( { skill_level: skillLevel, interest: interest });
        axios.put('/auth/fill-info', { skill_level: skillLevel, interest: interest }) // Ensure keys match Flask route
        .then((res) => {
            console.log(res.data);
            dispatch(login(res.data))
            setLoading(false)
            navigate('/')
        })
        .catch((err) => {
            setLoading(false)
            console.log(err)
        })
    };
    return (
        <div className=' flex flex-col gap-4 border-4 border-black rounded-md p-3 w-1/3'>
            <h3 className='text-2xl font-bold p-2 text-center'>Tell us about yourself</h3>
            <label htmlFor="skillLevel">Skill Level</label>
            <select
                value={skillLevel}
                onChange={handleSkillLevelChange}
                name="skillLevel"
                id="skillLevel"
                className='border-2 border-black p-3 w-full'
            >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>

            <label htmlFor="interests">Interests</label>
            <select
                value={interest}
                onChange={handleInterestsChange}
                name="interests"
                id="interests"
                className='border-2 border-black p-3 w-full'
            >
                <option value="Web">Web</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Mobile">Mobile</option>
                <option value="Game">Game</option>
            </select>

            <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
            {loading && <p>Loading...</p>}
        </div>
    )
}

export default FillInterestsForm