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
import Grid from '@mui/material/Grid'

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 60,
        backgroundColor: '#eee',
        padding: '0 20px'
    },
    drawer: {
        minWidth: 160
    },
    link: {
        color: '#333',
        fontWeight: 'bold',
        backgroundColor: '#eee',
        marginBottom: 10
    }
}))

export default function Header() {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    function logout() {
        saveToLocalStorage('user', {})
        window.location.href = '/login'
    }
    const {fullname} = getFromLocalStorage('user')
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
                        <ListItem>
                            <ListItemText primary={`${fullname}`}/>
                        </ListItem>
                        {
                            [
                                {path: '/', label: 'Home'},
                                {path: '/add', label: 'Add'},
                                {path: '/about', label: 'About'},
                            ].map(({path, label}) => (
                                <ListItem className={classes.link} component={Link}
                                          key={path}
                                          onClick={setOpen.bind(null, false)}
                                          to={`${path}`}>
                                    <ListItemText primary={`${label}`}/>
                                </ListItem>
                            ))
                        }
                        <ListItem onClick={logout} className={classes.link}>
                            <ListItemText primary='Logout'/>
                        </ListItem>
                    </List>
                </SwipeableDrawer>
                <Grid>
                    <Button onClick={setOpen.bind(null, !open)}>
                    <MenuIcon/>
                </Button>
                </Grid>
            </React.Fragment>
        </header>
    )
}
