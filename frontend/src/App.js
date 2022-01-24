import './App.css'
import React from 'react'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import {makeStyles} from '@mui/styles'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import About from './components/pages/About'
import Home from './components/pages/Home'
import Container from '@mui/material/Container'
import NotFound from './components/pages/NotFound'
import AddExpense from './components/pages/AddExpense'
import AddIncome from './components/pages/AddIncome'

const useStyles = makeStyles(theme => ({
    main: {
        minHeight: '84vh',
    }
}))

function App() {
    const classes = useStyles()
  return (
    <>
        <BrowserRouter>
          <Header/>
          <Container component='main' className={classes.main}>
              <Routes>
                  <Route element={<Home/>} path='/' exact/>
                  <Route element={<About/>} path='/about'/>
                  <Route element={<AddExpense/>} path='/addExpense'/>
                  <Route element={<AddIncome/>} path='/addIncome'/>
                  <Route element={<NotFound/>} path='*'/>
              </Routes>
          </Container>
          <Footer/>
        </BrowserRouter>
    </>
  )
}

export default App;
