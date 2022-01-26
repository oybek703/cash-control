import {blueGrey} from "@material-ui/core/colors"
import {createTheme} from '@material-ui/core'

const theme = createTheme({
    typography: {
        fontWeightBold: 600
    },
    palette: {
        secondary: {
            main: blueGrey["50"]
        },
        success: {
            main: blueGrey["400"]
        },
        warning: {
            main: blueGrey["500"]
        },
        info: {
            main: blueGrey["700"]
        },
        error: {
            main: '#cd0707',
            light: blueGrey["300"]
        },
        primary: {
            main: blueGrey["600"]
        }
    },
    mixins: {
        main_body: {
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
            margin: '20px',
            minWidth: '95vw'
        },
        grow: {
            color: '#009c34'
        },
        down: {
            color: '#d32f2f'
        },
        active: {
            fontWeight: 'bold'
        },
        marginBottom10: {
            marginBottom: 10
        },
        paddingBottom0: {
            paddingBottom: 0
        },
        muted: {
            cursor: 'not-allowed'
        },
        noWrap: {
            whiteSpace: 'nowrap'
        },
        italic: {
            fontStyle: 'italic'
        },
        displayNone: {
            display: 'none'
        },
        pointer: {
            cursor: 'pointer'
        },
        logo: {
            minHeight: 100,
            minWidth: 220,
            transform: 'scale(1)',
            '&:hover': {
                transform: 'scale(1.05)'
            }
        },
        smallCard: {
            padding: '10px 15px',
            flexBasis: '32.5%',
            textAlign: 'center'
        },
        smallCardContainer: {
            display: 'flex',
            margin: '10px auto',
            padding: '8px 0',
            justifyContent: 'space-between'
        },
        oneRowTitle: {
            fontSize: 20,
            textTransform: 'uppercase',
            padding: '10px 15px'
        }
    },
    overrides: {
        MuiTableContainer: {
            root: {
                maxHeight: '90vh',
                paddingBottom: 10
            }
        },
        MuiTableCell: {
            root: {
                fontSize: '14px',
                border: "1px solid rgba(224, 224, 224, 1)"
            }
        },
        MuiButtonBase: {
            root: {
                "&$disabled": {
                    "cursor": "not-allowed",
                    pointerEvents: 'auto'
                }
            }
        },
        MuiTypography: {
            caption: {
                fontSize: '13.5px'
            }
        },
        MuiTable: {
            root: {
                borderCollapse: 'unset'
            }
        },
        MuiTab: {
            wrapper: {
                fontWeight: 'bold'
            }
        }
    }
})

export default theme