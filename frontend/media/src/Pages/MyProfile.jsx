import fetchWithAuth from '../utils/auth';
import { useEffect, useState } from 'react';

import Header from '../Components/Header'

export default function MyProfile() {
    const [userData, setUserData] = useState(null)
    useEffect(() => {
      async function getUserData() {
        const res = await fetchWithAuth('http://localhost:3000/myprofile')
        const data = await res.json();
        setUserData(data);
      }
      getUserData()
    }, [])


    function logOut() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/auth';
    }

    console.log('userData:',userData);

    if (!userData) return

    return (
    <>
      <Header/>
      <h2>{userData.email}</h2>
      <button onClick={logOut}>Log out</button>
    </>
  );
}