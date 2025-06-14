import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

import MainPage from './Pages/MainPage.jsx'
import PostingArticle from './Pages/PostingArticle.jsx';
import Article from './Pages/Article.jsx';
import MyProfile from './Pages/MyProfile.jsx';
import Auth from './Pages/Auth.jsx';

const router = createBrowserRouter([{
  path: '/',
  element: <MainPage />
},
{
  path: '/newarticle',
  element: <PostingArticle />
},
{
  path: '/article/:id',
  element: <Article />
},
{
  path: '/myprofile',
  element: <MyProfile />
},
{
  path: '/auth',
  element: <Auth />
}

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
