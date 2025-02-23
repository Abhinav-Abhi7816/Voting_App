import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import VotingPage from "./Components/VotingPageComponents/VotingPage";
import SignUp from "./Components/Logins/SignUp";
import Login from "./Components/Logins/Login";
import Layout from "./Components/LayoutComponents/Layout";
import Admin from "./Components/AdminPageComponents/Admin";
import { useState } from "react";
import { DataContextProvider } from "./Contexts/DataContext";
import ScrollToTop from "./Components/ScrollToTop";



function App() {

  const [logName,setLogName]=useState("")

  const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout></Layout>}>
      <Route path="" element={<VotingPage></VotingPage>}></Route>
      <Route path="signUp" element={<SignUp></SignUp>}></Route>
      <Route path="Login" element={<Login></Login>}></Route>
      <Route path="admin" element={<Admin></Admin>}></Route>
    </Route>
  ),
  { basename:"/Voting_App" })
  return (
    <div className="App">
      <DataContextProvider value={{logName,setLogName}}>
      <RouterProvider router={router}>
        <ScrollToTop></ScrollToTop>
      </RouterProvider>
      </DataContextProvider>
    </div>
  );
}

export default App;
