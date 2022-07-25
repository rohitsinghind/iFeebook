import React,{useState,useEffect} from 'react'
import { styles } from './styles'

import PayFees from '../payFees';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


export default function StudentDetails(props) {

  const months= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const host = "http://localhost:4000"

  const [paid, setPaid] = useState([])

  const removeStudent = async () => {
    const response = await fetch(`${host}/api/v1/students/deletestudent/${props.student?._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json(); 
    props.getStudents();
  }
  console.log(paid)
  
  return (
    <>
      <Box sx={styles.flex}>
        {
          props.student===null?<Box sx={styles.selectBox}><Typography sx={styles.selectText}>Select a Student</Typography></Box>:
        <>
        <Box sx={styles.detailsPane}>
          <Stack direction="row" spacing={2}>
            <Typography sx={styles.field} >Name</Typography>
            <Typography sx={styles.fieldData} >{props.student?.name}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography sx={styles.field} >Std</Typography>
            <Typography sx={styles.fieldData} >{props.student?.std}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography sx={styles.field} >Joining Date</Typography>
            <Typography sx={styles.fieldData} >{props.student?.joiningDate?.slice(0,10)}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography sx={styles.field} >Payment Day</Typography>
            <Typography sx={styles.fieldData} >{props.student?.feeDay}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography sx={styles.field} >Fees</Typography>
            <Typography sx={styles.fieldData} >{props.student?.fees}/-</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography sx={styles.field} >Advanced Fee</Typography>
            <Typography sx={styles.fieldData} >{props.student?.isAdvancedPay?"Yes":"No"}</Typography>
          </Stack>
          <PayFees getStudents={props.getStudents} id={props.student?._id} student={props.student} paid={paid} setPaid={setPaid}/>
          <Box sx={styles.removeBox}>
            <Typography sx={styles.removeTxt} >Remove This Student : </Typography>
            <Button onClick={removeStudent} color='error' variant="outlined" sx={styles.removeBtn} startIcon={<DeleteIcon />}>
            Remove
            </Button>
          </Box>
        </Box>
          <Paper variant="outlined" sx={styles.monthsPane}>
          <Typography sx={styles.head}>Months Details</Typography>
          {/* {paid?.slice(0).reverse().map((month) => (
                <Paper variant="outlined" sx={styles.paper} key={month._id}>
                <Box sx={styles.monthBox}>
                <Typography sx={styles.month}>{months[month?.month]}</Typography>
                <Typography sx={styles.date}>Paid on {month?.date?.slice(8,10)}/{month?.date?.slice(5,7)}</Typography>
                </Box>
                </Paper>
            ))} */}
              {props?.student?.paid?.slice(0).reverse().map((month) => (
                <Paper variant="outlined" sx={styles.paper} key={month._id}>
                <Box sx={styles.monthBox}>
                <Typography sx={styles.month}>{months[month?.month]}</Typography>
                <Typography sx={styles.date}>Paid on {month?.date?.slice(8,10)}/{month?.date?.slice(5,7)}</Typography>
                </Box>
                </Paper>
            ))}
          </Paper>
          </>
}
        </Box>
    </>
  )
}
