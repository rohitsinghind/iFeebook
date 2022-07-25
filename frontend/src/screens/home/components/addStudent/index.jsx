import React,{useState} from 'react'
import { styles } from './styles' 

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Button from '@mui/material/Button';

export default function AddStudent(props) {

  const host = "http://localhost:4000"

  const [creds, setCreds] = useState({name:'', std:'',feeDay:'', joiningDate:Date.now(), fees:'',isAdvancedPay:false });

  const handleChange = (key) => {
    key.preventDefault();
    setCreds({ ...creds, [key.target.id]: key.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const {name, std, feeDay, joiningDate,isAdvancedPay, fees} = creds;
    const response = await fetch(`${host}/api/v1/students/addstudent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({name, std, feeDay, joiningDate, fees, isAdvancedPay})
    });
    const student = await response.json();
    props.getStudents()

  }

  return (
    <>
        
          <Paper variant="outlined" sx={styles.paper}>
          <Typography
                sx={styles.head} >
                Add Student
            </Typography>
            <Box sx={styles.box}>
            <TextField
            id="name"
            label="Enter Name"
            placeholder="Name"
            value={creds.name || ''}
            onChange={handleChange}
            sx={styles.input}
            />
            <TextField
            id="std"
            type="number"
            label="Enter Std"
            placeholder="Std"
            value={creds.std || ''}
            onChange={handleChange}
            sx={styles.input}
            />
            <TextField
            id="fees"
            type="number"
            label="Enter Fees"
            placeholder="Fees"
            value={creds.fees || ''}
            onChange={handleChange}
            sx={styles.input}
            />
            <TextField
            id="feeDay"
            type="number"
            label="Enter Fee Day"
            placeholder="Fee Day"
            value={creds.feeDay || ''}
            onChange={handleChange}
            sx={styles.input}
            />
            <Box sx={styles.chkBox}>
            <Typography>Advanced Fees?</Typography>
            <Checkbox
            id="isAdvancedPay"
            checked={creds.isAdvancedPay}
            onChange={e=> {
            setCreds({ ...creds, [e.target.id]: e.target.checked });
            }}
            value={creds.isAdvancedPay || false}
        inputProps={{
          'aria-label': 'primary checkbox',
        }}
      />
      </Box>
            <Button variant="outlined" sx={styles.btn} onClick={submitHandler} endIcon={<PersonAddAltIcon />}>Add</Button>
            </Box>
          </Paper>
    </>
  )
}
