import './App.css'
import Header from './components/Layout/Header'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import About from './components/pages/About'
import Home from './components/pages/Home'
import Container from '@mui/material/Container'
import NotFound from './components/pages/NotFound'
import React from 'react'
import {getFromLocalStorage} from './utils'
import Login from './components/pages/Login'
import Add from './components/pages/Add'

function App() {
    const {token} = getFromLocalStorage('user')
    if(!token) return <Login/>
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Container component='main'>
                    <Routes>
                        <Route element={<Home/>} path='/' exact/>
                        <Route element={<About/>} path='/about'/>
                        <Route element={<Add/>} path='/add'/>
                        <Route element={<NotFound/>} path='*'/>
                    </Routes>
                </Container>
            </BrowserRouter>
        </>
    )
}

export default App
