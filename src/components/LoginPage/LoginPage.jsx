import React from 'react'
import './loginPage.css'
import Main from '../Main/Main'

function LoginPage({ setIsLoggedIn, isLoggedIn, setUserName, setIsAdmin }) {

    const [ login, setLogin ] = React.useState('')
    const [ password, setPassword ] = React.useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        localStorage.setItem('isLoggedIn', true)
        localStorage.setItem('userName', login)

        setUserName(login)
        setIsLoggedIn(true)
    }

    const handleLoginChange = (e) => {
        setLogin(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

  return (
    <div>
        {
            !isLoggedIn ?   <div className='login-page'>
            <form className='login-form' onSubmit={handleLogin}>
                <h2 className='login-heading'>Авторизация</h2>
                <div className='login-input'> <input type="text" onChange={handleLoginChange} placeholder='Логин' /> </div>
                <div className='login-input'> <input type="password" onChange={handlePasswordChange} placeholder='Пароль' /> </div>
                <div className='login-button'> <button className='login-btn'>Войти</button> </div>
            </form>
        </div> : <Main />         
        }
    </div>
  )
}

export default LoginPage