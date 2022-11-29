import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './views/Main'; 
import Create from './components/Create';
import View from './views/View'
import Update from './components/Update';
import LogIn from './views/LogIn';
import Register from './views/Register';
// import Update from './components/Update';


function App() {
  return (
    <div className="App">
      
    
      

      {/* Theater Stage */}
      <Routes>
        {/* LogIn */}
      <Route path='/login' element={<LogIn />}/>

        {/* Register */}
      <Route path='/register' element={<Register />}/>

        {/* Main - All Movies */}
        <Route path='/movies' element={<Main/>}/>

         {/* Main - One Movie */}
        <Route path='/movies/:id' element={<View/>}/>

           {/* Update */}
      <Route path='/movies/:id/edit' element={<Update/>}/>


        {/* Redirect */}
        <Route path='*' element={<Navigate to="/register" replace/>}/>

        {/* Create */}
        <Route path='/movies/new' element={<Create/>}/>







      </Routes>




    </div>
  );
}

export default App;