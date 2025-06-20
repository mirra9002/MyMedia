import './Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import errorImage from '../../public/red_error.svg'
export default function Login({switchToSignup}) {
  const navigate = useNavigate()

    const [userData, setUserData] = useState({email: '', password: ''})
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
            password: userData.password,
        };
        console.log('obj', obj);
        const res = await postUserData(obj);
           console.log('res', res.message);
            if (res.message != 'success') {
                setSuccessMessage(null);
                setErrorMessage(res.message || 'Login failed');
                console.log('Server error:', res.message);
                return;
            }

            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);

            console.log('Logged in successfully!');
            setSuccessMessage('Logged in successfully!')
            setErrorMessage(null);
            setUserData({ email: '', password: '' });
        }

        
        
        if(successMessage){
            const times = setTimeout(() => {
                window.location.href = '/';
            }, 500)
            
        }
  return (
    <>
      <div id="div-login">
        <h2>Log In</h2>
        <ul>
            <li>Email</li>
            <li><input type="email" className={errorMessage? "input-error" : null} name="email" onChange={handleChange} value={userData.email}/></li>
            <li>Password</li>
            <li><input type="password" className={errorMessage? "input-error" : null} name="password" onChange={handleChange} value={userData.password}/></li>
        </ul>
        <button onClick={handleClick}>Log In</button>
        <div id="div-log-instead">
            <p>Ще не маєш аккаунта? <a  onClick={switchToSignup}>SIGN UP</a></p>
            {errorMessage ? <p className="error"><img src={errorImage} alt="" />{errorMessage}</p> : null}
            {successMessage ? <p className="success">{successMessage}</p> : null}
        </div>
        
      </div>
    </>
  );
}

async function postUserData(userData) {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    const data = await res.json()
    console.log('DATA:', data);
    return data
}