import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import MainPage from './Pages/MainPage.jsx'
import PostingArticle from './Pages/PostingArticle.jsx';

const router = createBrowserRouter([{
  path: '/',
  element: <MainPage />
},
{
  path: '/newarticle',
  element: <PostingArticle />
}

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
