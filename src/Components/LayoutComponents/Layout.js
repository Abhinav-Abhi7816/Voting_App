import React from 'react'
import NavBar from './NavBar'
import Footer from'./Footer'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <>
    <NavBar></NavBar>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default Layout
