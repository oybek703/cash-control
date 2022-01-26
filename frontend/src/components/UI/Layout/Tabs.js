import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

function TabPanel(props) {
    const { children, value, index, ...other } = props
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box style={{marginTop: 20}}>
                    {children}
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'transparent',
    },
    tabContainer: {
        backgroundColor: '#7794aa'
    }
}))

export default function CustomTabs({FirstTab = '', SecondTab = '', ThirdTab = ''}) {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.tabContainer}>
                <Tabs value={value} variant='fullWidth'
                      onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Daily" {...a11yProps(0)} />
                    <Tab label="Weekly" {...a11yProps(1)} />
                    <Tab label="Monthly" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            {value === 0 && <TabPanel value={value} index={0}>
                {FirstTab}
            </TabPanel>}
            {value === 1 && <TabPanel value={value} index={1}>
                {SecondTab}
            </TabPanel>}
            {value === 2 && <TabPanel value={value} index={2}>
                {ThirdTab}
            </TabPanel>}
        </div>
    )
}