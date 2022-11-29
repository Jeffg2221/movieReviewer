import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {


    // const {id} = useParams();

    //for redirect
    const navigate = useNavigate()

    // forms submit variables 
    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")
    // const[image, setImage] = useState("")
    // const[phoneNumber, setPhoneNumber] = useState("")
    // const[bio, setBio] = useState("")



    //DB error array
    const [errors,setErrors] = useState([]);

    const createUser = (e) => {
        e.preventDefault();
        const tempObjToSendToDB = {
            name,
            email,
            password,
            confirmPassword,
        
        }
        axios.post('http://localhost:8001/api/register', tempObjToSendToDB ,{withCredentials: true})
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
    <div >
        {errors.map((error,index) => <p key ={index}>{error}</p>)}
    </div>
    <h1>Register</h1>
    <form onSubmit={createUser}>
        Name:  <input onChange={(e) => setName(e.target.value)} value={name}/><br/>
        Email: <input onChange={(e) => setEmail(e.target.value)} value={email}/><br/>
        Password:<input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/><br/>
        Confirm Password:<input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/><br/>
        {/* Image: <input onChange={(e) => setImage(e.target.value)} value={image}/><br/>
        Phone Number: <input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}/><br/>
        Bio:<textarea onChange={(e) => setBio(e.target.value)} value={bio}></textarea> */}
        <br/><button  >Register</button>
        <button  onClick={() => navigate('/movies')}>Back</button>
    </form>
    </div>
    </div>

    </>
)
}

export default Register