import './Signup.css'
import errorImage from '../../public/red_error.svg'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
export default function Signup({switchToLogin}) {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({ email: '', password: '', username: ''})
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    console.log('aaa');
    function handleChange(e){
        const {name, value} = e.target;
        setUserData(userData => ({
            ...userData, [name]: value
        }))
    }

    async function handleClick() {
        const obj = {
            email: userData.email,
            username: userData.username,
            password: userData.password,
            date_registered: new Date().toDateString(),
        };

        console.log('OBJ:', obj);
        const res = await postUserData(obj);
           console.log('res', res.message);
            if (res.message != 'success') {
                setSuccessMessage(null);
                setErrorMessage(res.message || 'Registration failed');
                console.log('Server error:', res.message);
                return;
            }

            console.log('Registered successfully!');
            setSuccessMessage('Registered successfully!')
            setErrorMessage(null);
            setUserData({email: '', password: '', username: ''});
        }
        
        if(successMessage){
            const times = setTimeout(() => {
                window.location.href = '/';
            }, 500)
            
        }


  return (
    <>
      <div id="div-signup">
        <h2>Sign Up</h2>
        <ul>
            <li>Email</li>
            <li><input type="email" name="email" className={errorMessage? "input-error" : null} onChange={handleChange} value={userData.email} required/></li>
            <li>Username</li>
            <li><input type="username" name="username" className={errorMessage? "input-error" : null} onChange={handleChange} value={userData.username} required/></li>
            <li>Password</li>
            <li><input type="password" name="password" className={errorMessage? "input-error" : null} onChange={handleChange} value={userData.password} required /></li>
        </ul>
        <button onClick={handleClick}>Sign Up</button>
        <div id="div-log-instead">
            <p>Вже маєш аккаунт? <a onClick={switchToLogin}>LOGIN</a></p>
            {errorMessage ? <p className="error"><img src={errorImage} alt="" />{errorMessage}</p> : null}
            {successMessage ? <p className="success">{successMessage}</p> : null}
        </div>
        
      </div>
    </>
  );
}


async function postUserData(userData) {
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    const data = await res.json()
    return data
}