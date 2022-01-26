import React from 'react'
import {CardContent, List, makeStyles, Toolbar} from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles(theme => ({
    listItem: {
        backgroundColor: '#ddd',
        marginBottom: 15
    }
}))

const Budget = () => {
    const classes = useStyles()
    return (
        <>
            <h3>Budget Info</h3>
            <Toolbar/>
            <Card>
                <CardContent>
                    <List>
                        <ListItem className={classes.listItem}>
                            <ListItemText primary='1234656.54' secondary='Family'/>
                        </ListItem>
                        <ListItem style={{backgroundColor: '#ddd'}}>
                            <ListItemText primary='1234656.54' secondary='Family'/>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </>
    )
}

export default Budget