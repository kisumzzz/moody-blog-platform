import React, {useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import useStyles from './styles';

export default function Auth() {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const history = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    };
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }; 
  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name='firstname' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastname' label='Last Name' handleChange={handleChange} half />
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid>
                <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have a account? Sign In' : "Don't have an account? Sign up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}
