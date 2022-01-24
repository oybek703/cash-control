import * as React from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MenuIcon from '@mui/icons-material/Menu'
import ListItemText from '@mui/material/ListItemText'
import {makeStyles} from '@mui/styles'
import {Link} from 'react-router-dom'
import {Toolbar} from '@mui/material'
import Logo from '../../images/cash-management.jpg'
import {getFromLocalStorage, saveToLocalStorage} from '../../utils'

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: 60,
        backgroundColor: '#eee',
        padding: '0 20px'
    },
    drawer: {
        minWidth: 160
    }
}))

export default function Header() {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    function logout() {
        saveToLocalStorage('user', {})
        window.location.href = '/login'
    }
    return (
        <header className={classes.header}>
            <Button component={Link} to='/'>Cash Control</Button>
            <React.Fragment>
                <SwipeableDrawer
                    open={open}
                    anchor='left'
                    onClose={setOpen.bind(null, false)}
                    onOpen={setOpen.bind(null, true)}
                >
                    <Toolbar component={Button}>
                        <Link to='/' onClick={setOpen.bind(null, false)}>
                            <img width='120' height='70' src={Logo} alt="LOGO"/>
                        </Link>
                    </Toolbar>
                    <List className={classes.drawer}>
                        {
                            [
                                {path: '/', label: 'Home'},
                                {path: '/addExpense', label: 'Add Expense'},
                                {path: '/addIncome', label: 'Add Income'},
                                {path: '/about', label: 'About'},
                            ].map(({path, label}) => (
                                <ListItem component={Link}
                                          key={path}
                                          onClick={setOpen.bind(null, false)}
                                          to={`${path}`}>
                                    <ListItemText primary={`${label}`}/>
                                </ListItem>
                            ))
                        }
                        <ListItem onClick={logout} component={Button}>
                            <ListItemText primary='Logout'/>
                        </ListItem>
                    </List>
                </SwipeableDrawer>
                <Button onClick={setOpen.bind(null, !open)}>
                    <MenuIcon/>
                </Button>
            </React.Fragment>
        </header>
    )
}
