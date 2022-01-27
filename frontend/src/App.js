import './App.css'
import Header from './components/UI/Layout/Header'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import About from './components/pages/About'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'
import React from 'react'
import {getFromLocalStorage} from './utils'
import Login from './components/pages/Login'
import theme from './components/UI/theme'
import Container from '@material-ui/core/Container'
import {ThemeProvider} from '@material-ui/styles'
import Budget from './components/pages/Budget'
import Add from './components/pages/Add'
import Grid from '@material-ui/core/Grid'

function App() {
    const {token} = getFromLocalStorage('user')
    if(!token) return <Login/>
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header/>
                <Grid component='main'>
                    <Container>
                        <Routes>
                        <Route element={<Home/>} path='/' exact/>
                        <Route element={<About/>} path='/about'/>
                        <Route element={<Add/>} path='/add'/>
                        <Route element={<Budget/>} path='/budget'/>
                        <Route element={<NotFound/>} path='*'/>
                    </Routes>
                    </Container>
                </Grid>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
