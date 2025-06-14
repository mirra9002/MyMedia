import './Signup.css'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
export default function Signup({switchToLogin}) {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({firstName: '', lastName: '', email: '', password: ''})
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
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            dateRegistered: new Date().toDateString(),
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
            setUserData({ firstName: '', lastName: '', email: '', password: '' });
        }
        
        // if(successMessage){
        //     const times = setTimeout(() => {
        //         navigate('/')
        //     }, 500)
            
        // }


  return (
    <>
      <div id="div-signup">
        <h2>Sign Up</h2>
        <ul>
            <li>First Name</li>
            <li><input type="text" name="firstName" onChange={handleChange} value={userData.firstName}/></li>
            <li>Last Name</li>
            <li><input type="text" name="lastName" onChange={handleChange} value={userData.lastName}/></li>
            <li>Email</li>
            <li><input type="text" name="email" onChange={handleChange} value={userData.email}/></li>
            <li>Password</li>
            <li><input type="text" name="password" onChange={handleChange} value={userData.password}/></li>
        </ul>
        <button onClick={handleClick}>Sign Up</button>
        <div id="div-log-instead">
            <p>Already have an account? <a onClick={switchToLogin}>LOGIN</a></p>
            {errorMessage ? <p id='p-error'>{errorMessage}</p> : null}
            {successMessage ? <p id='p-success'>{successMessage}</p> : null}
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