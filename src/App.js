import React from 'react';
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import MyPage from "./pages/mypage";
import Redirect from "./pages/login";





function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path ="/login" element={<Redirect/>}> </Route>
          <Route path ="/mypage" element={<MyPage></MyPage>}> </Route>
          <Route path ="/search/:songID" element={<Detail></Detail>}> </Route>
          <Route path ="/" element={<Home></Home>}> </Route>
        </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
