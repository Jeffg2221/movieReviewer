import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const LogIn = () => {

    //for redirect
    const navigate = useNavigate()

    // forms submit variables 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //DB error array
    const [errors, setErrors] = useState([]);

    const loginUser = (e) => {
        e.preventDefault();
        const tempObjToSendToDB = {
            email,
            password,
        }
        axios.post('http://localhost:8001/api/login', tempObjToSendToDB, { withCredentials: true })
            .then(response => {
                console.log("Client Success")
                console.log(response.data)
                navigate('/movies')
            })
            .catch(error => {
                console.log("Something Went Wrong")
                console.log(error)
                const errorResponse = error.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }
    return (
        <>
            <div >
                <div >
                    <h1>Login</h1>
                    <div>
                        {errors.map((error, index) => <p key={index}>{error}</p>)}
                    </div>
                    <form className='btn' onSubmit={loginUser} ><br />
                        Email: <input onChange={(e) => setEmail(e.target.value)} value={email} /><br />
                        Password: <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} /><br /><br />
                        <button >Log In</button>
                        <button  onClick={() => navigate('/')}>Back</button>
                        <button  onClick={() => navigate('/register')}>Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LogIn