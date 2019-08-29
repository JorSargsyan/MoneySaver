import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {logout} from "../../actions/index";
import {connect} from "react-redux"
import {Link} from "react-router-dom"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Header({logout}) {
    const classes = useStyles();


    const handleLogout = (e)=>{
        logout();
    }

    return (
        <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                            <Link to='/dashboard'>Money Saver</Link>
                            </Typography>
                            <Button color="inherit"><Link to="/dashboard/history">History</Link></Button>
                            <Button onClick={e=>handleLogout(e)} color="inherit">
                                LOG OUT
                            </Button>
                        </Toolbar>
                    </AppBar>
           
        </div>
    );
}


export default connect(null,{logout})(Header)