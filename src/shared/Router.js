import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from '../pages/Main';
import Login from '../pages/Login';
import Form from '../pages/Form';
import Post from '../pages/Post';
// import Detail from '../pages/Detail';




const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='main' element={<Main />} />
        <Route path='form' element={<Form />} />
        <Route path='post' element={<Post />} />
        {/* <Route path='detail' element={<Detail />} /> */}
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;