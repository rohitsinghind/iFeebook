import React,{useState} from 'react'
import { styles } from './styles';
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';

export default function Signup() {

  const [creds, setCreds] = useState({name:'', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (key) => {
    key.preventDefault();
    setCreds({ ...creds, [key.target.id]: key.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const host = "http://localhost:4000"
    const response = await fetch(`${host}/api/v1/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:creds.name, email:creds.email, password:creds.password})
    });
    const json = await response.json() 
    console.log(json)
    if(json.success){
        localStorage.setItem('token', json.authtoken);
        window.location.reload(false);
    }
    else{
    }
  };

  const mediaQuery = window.matchMedia("(max-width: 550px)");

  return (
    <>
     <Container maxWidth="xl" sx={mediaQuery.matches?styles.mobileContainer:""}>
        <Box sx={styles.box}>
            <div>
            <Paper variant="outlined" sx={{ p: 4 }}>
            <Typography
                sx={styles.textLogo} >
                iFeeBook
            </Typography>
            <TextField
          id="name"
          label="Enter your Name"
          placeholder="Name"
          value={creds.name || ''}
          onChange={handleChange}
          sx={styles.name}
        />
            <TextField
          id="email"
          type="text"
          label="Enter your Email"
          placeholder="Email"
          value={creds.email || ''}
          onChange={handleChange}
          sx={styles.center}
        />
        <div style={styles.center}>
        <FormControl variant="outlined" sx={{mt:2, width: '35ch'}}>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="password"
            placeholder="*****"
            type={showPassword ? 'text' : 'password'}
            value={creds.password || ''}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        </div>
        <div style={styles.center}>
        <Button variant="contained" sx={styles.loginBtn} onClick={submitHandler}>Sign up</Button>
        </div>
        <Divider sx={styles.divider}/>
        <div style={styles.center}>
        <Typography
                sx={styles.policyText} >
                By signing up, you agree to our Terms and Data Policy .
            </Typography>
            </div>
            </Paper>
            <Paper variant="outlined" sx={{ p: 4 ,mt:0.75}}>
            <Typography
                sx={styles.signupText1} >
                Have an account? <Link to="/" style={{textDecoration:'none'}}><Typography
                sx={styles.signupText2} >
                Log in
            </Typography>
            </Link>
            </Typography>
            </Paper>
            </div>
            <Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}
