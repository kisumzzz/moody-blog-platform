import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import img from "../../images/testing.png";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles'

export default function Navbar() {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' })

        history('/auth')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        //JWT

        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
            <Typography className={classes.heading} variant="h2" align="center">Instaverse</Typography>
            <img className={classes.image} src={img} alt="" height={100}/>
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.heading}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                        {user.result.name.charAt(0)}
                    </Avatar>
                    <Typography className={classes.username} variant='h6'>
                        {user.result.name}
                    </Typography>
                    <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Lougout</Button>
                </div>
            ) : (
                <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
            )
            }
        </Toolbar>   
    </AppBar>
  )
}
