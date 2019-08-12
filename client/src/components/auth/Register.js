import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link,Redirect} from "react-router-dom";
import {registerUser} from "../../actions/index";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn({registerUser,isAuth,isRegistered}) {
  const classes = useStyles();

  const [formData,setFormData] = useState({
    name: "",
    email : "",
    password : "",
    password2  :"",
  })

  const { name, email, password, password2 } = formData;

  const onChange = (e)=>{
   return setFormData({...formData,[e.target.name]:e.target.value})
  }


  const handleSubmit = e=>{
    e.preventDefault();
    if(password !== password2){
       alert("Wrong Password");
    }

    const newUser = {
      name,email,password
    }
    registerUser(newUser);
  }


    if(isRegistered){
      return <Redirect to="/login" />
    }
  
    if(isAuth){
      return <Redirect to="/"/>
    }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
       

        <form className={classes.form} noValidate onSubmit={e=>handleSubmit(e)}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Your name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={e=>onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={e=>onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e=>onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Password Confirm"
            type="password"
            id="password2"
            autoComplete="current-password"
            value={password2}
            onChange={e=>onChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login"  variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

SignIn.propTypes = {
  registerUser:PropTypes.func.isRequired,
   isAuth:PropTypes.bool.isRequired,
   isRegistered:PropTypes.bool.isRequired,
}

const mapStateToProps = (state)=>({
  isAuth : state.auth.isAuthenticated,
  isRegistered : state.auth.isRegistered
})

export default connect(mapStateToProps,{registerUser})(SignIn);
