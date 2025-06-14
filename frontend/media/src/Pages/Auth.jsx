import Login from "../Components/Login";
import Signup from "../Components/Signup";
import { useState } from "react";
export default function Auth() {
  
    const [authType, setAuthType] = useState('signup');
    

    return (
    <>
      {authType === 'signup' ? <Signup switchToLogin={() => setAuthType('login')}/> : <Login switchToSignup={() => setAuthType('signup')}/>}
    </>
  );
}

