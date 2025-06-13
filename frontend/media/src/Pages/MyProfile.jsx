import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
export default function MyProfile() {
  const params = useParams()
  const userId = params.id
    return (
    <>
      <h1>User</h1>
      <h2>{userId}</h2>
    </>
  );
}