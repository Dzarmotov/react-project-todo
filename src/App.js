import React from 'react';
import {Routes, Route} from 'react-router-dom'

import './App.css';
import Header from './components/Header/Header';
import Posts from './components/Posts/Posts';
import Main from './components/Main/Main';
import LoginPage from './components/LoginPage/LoginPage';

function App() {

  const [ isLoggedIn, setIsLoggedIn ] = React.useState(checkingUserAuth())
  const [ userName, setUserName ] = React.useState(checkingUserName())

  function checkingUserAuth() {
    return (localStorage.getItem('isLoggedIn') === 'true') ? true : false
  }

  function checkingUserName() {
    return (localStorage.getItem('userName'))
  }


  return (
    <div className="wrapper">
      <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} userName={userName}/>     

      <main className='main'>
        <Routes>
          <Route path='/main' element={<Main />}/>
          <Route path='/posts' element={<Posts />}/>
          <Route path='*' element={<LoginPage 
          setIsLoggedIn={setIsLoggedIn} 
          isLoggedIn={isLoggedIn}
          setUserName={setUserName}
          />}/>

        </Routes>
      </main>

    </div>
  );
}

export default App;
