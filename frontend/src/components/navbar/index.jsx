import React from 'react'
import { useNavigate } from 'react-router-dom';
import { styles } from './styles';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {CardMedia} from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {

  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(false);
  };

  const mediaQuery = window.matchMedia("(max-width: 550px)");

  return (
    <>
      <AppBar position="static" color='transparent'>
      <Container maxWidth="xl">
        <Toolbar >
       
        <CardMedia
          component="img"
          sx={styles.logo}
          image={require("../../assets/images/icon.jpg")}
        />
          <Typography sx={styles.logoText}>
            iFeeBook
          </Typography>
          {localStorage.getItem('token')?
          <Stack spacing={1} direction="row">
          {mediaQuery.matches ?
          <>
            <IconButton onClick={()=>{navigate('/add')}} color="primary" aria-label="add student" component="label">
              <PersonAddAltIcon />
            </IconButton>
            <IconButton onClick={handleLogout} color="primary" aria-label="logout" component="label">
            <LogoutIcon />
          </IconButton>
          </>
            :
            <Button variant="text" onClick={handleLogout} endIcon={<LogoutIcon />}>Logout</Button>
          }
          </Stack>:""}
        </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
