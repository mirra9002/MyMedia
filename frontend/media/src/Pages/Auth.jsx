import Login from "../Components/Login";
import Signup from "../Components/Signup";
import { useState } from "react";
import Header from '../Components/Header'
export default function Auth() {
  
    const [authType, setAuthType] = useState('signup');
    

    return (
    <>
    <Header/>
      {authType === 'signup' ? <Signup switchToLogin={() => setAuthType('login')}/> : <Login switchToSignup={() => setAuthType('signup')}/>}
    </>
  );
}

