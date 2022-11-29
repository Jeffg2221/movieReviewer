import { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './Main.css'
import {
    Paper,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button
} from '@material-ui/core';
const styles = {
    paper: {
        width: "20rem", padding: "1rem"
    },
    input: {
        marginBottom: "1rem"
    },
    button: {
        width: "100%"
    }
}





const Main = (props) => {

    const navigate = useNavigate()

    const [movies, setMovies] = useState([])

    // trigger when the component has finished loading
    useEffect(() => {
        //get all the authors from server
        axios.get("http://localhost:8001/api/movies")
            .then(res => {
                console.log(res.data)
                setMovies(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // go to the update route
    const goToUpdate = (moviesMongoDB) => {
        console.log(moviesMongoDB)
        navigate("/movies/" + moviesMongoDB + "/edit")
    }

    //Delete
    const deleteMovie = (deleteID) => {
        if (window.confirm("Are you sure you want to delete your rating")) {


            axios.delete("http://localhost:8001/api/movies/" + deleteID)

                .then(res => {
                    console.log("DELETE SUCCESS", res.data)

                    //remove form the DOM after a successful delete
                    setMovies(movies.filter((movie) => movie._id !== deleteID))
                })
                .catch(err => console.log(err))
        }
    }




    return (
        <div >
            <button className='all'> <Link to="/movies">Movie Board</Link> </button> &nbsp; &nbsp;
            <button className="new"><Link to="/movies/new">Add Rating</Link></button> <br />
            <br />
            
            <h1>Movie Ratings</h1>
            {/* {JSON.stringify(authors)} */}






            {
                movies.map((oneMovie) => {
                    return (
                        <div key={oneMovie._id}>
                            <ul>

                                <li><img src={oneMovie.img} alt="" />&nbsp;&nbsp;{oneMovie.title} </li>

                                <li></li>
                                <li><button><Link to={`/movies/${oneMovie._id}`} >View Rating</Link></button> &nbsp;<button onClick={() => deleteMovie(oneMovie._id)}>Delete Rating</button></li>
                            </ul>




                        </div>
                    )
                })



            }







        </div>
    )
}

export default Main