import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { styles } from './styles'

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MobileStudentDetails(props) {

  let navigate = useNavigate();


  const months= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const [paid, setPaid] = useState(props.student?.paid)
  let month;
  if((props.student?.paid?.length)===0){
    month = new Date().getMonth();
  }
  else if((props.student?.paid[(props.student?.paid?.length)-1]?.month)===11){
    month = 0;
  }
  else{
    month = (props.student?.paid[(props.student?.paid?.length)-1]?.month)+1
  }

  console.log("month "+month)
  

    let yourDate = new Date()
    const [date, setDate] = useState(yourDate.toISOString().split('T')[0])

    const host = "http://localhost:4000"

    const payFees = async () => {
      // API Call 
      const response = await fetch(`${host}/api/v1/students/fees/${props.student?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({month:month, date:date})
      });
      const json = await response.json(); 
      console.log(json)
      setPaid([...paid,{month: month, date: date, _id: month}])
      // props.getStudents();
    }
    console.log(paid)

    const removeStudent = async () => {
      const response = await fetch(`${host}/api/v1/students/deletestudent/${props.student?._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = response.json(); 
      navigate('/')
    }
  

  return (
    <>
      <IconButton sx={styles.backBtn} onClick={()=>{navigate('/')}} color="primary" aria-label="back" component="label">
        <ArrowBackIcon />
      </IconButton>
      <Container maxWidth="xl">
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
          </Box>
          <Paper variant="outlined" sx={styles.paper}>
          <Typography sx={styles.head}>Pay Fees</Typography>
          <Stack direction="row" spacing={2}>
            <Typography sx={styles.field} >Month   : </Typography>
            <Typography sx={styles.fieldData}>{months[month]}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography sx={styles.field} >Paid on : </Typography>
            <input type="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
          </Stack>
          <Button onClick={payFees} color='success' variant="contained" sx={styles.payBtn}>Pay</Button>
          </Paper>
          <Paper variant="outlined" sx={styles.monthsPane}>
          <Typography sx={styles.head}>Months Details</Typography>
            {/* {
              unPaid.reverse().map((month) => (
                <Paper variant="outlined" sx={styles.paper} key={month._id}>
                <Box sx={styles.monthBox}>
                <Typography sx={styles.month}>{months[month]}</Typography>
                <Typography sx={styles.notPaidTxt}>Not paid</Typography>
                </Box>
                </Paper>
            ))
            } */}
              {paid?.slice(0)?.reverse().map((month) => (
                <Paper variant="outlined" sx={styles.monthPaper} key={month._id}>
                <Box sx={styles.monthBox}>
                <Typography sx={styles.month}>{months[month?.month]}</Typography>
                <Typography sx={styles.date}>Paid on {month?.date?.slice(8,10)}/{month?.date?.slice(5,7)}</Typography>
                </Box>
                </Paper>
            ))}
          </Paper>
          <Box sx={styles.removeBox}>
            <Typography sx={styles.removeTxt} >Remove This Student : </Typography>
            <Button onClick={removeStudent} color='error' variant="outlined" sx={styles.removeBtn} startIcon={<DeleteIcon />}>
            Remove
            </Button>
          </Box>
      </Container>
    </>
  )
}
