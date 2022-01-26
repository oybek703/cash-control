import * as React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../../../images/cash-management.jpg'
import {getFromLocalStorage, saveToLocalStorage} from '../../../utils'
import {makeStyles} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import MenuIcon from '@material-ui/icons/Menu'

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
