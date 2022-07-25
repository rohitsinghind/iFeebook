import React,{useState, useEffect} from 'react'
import { styles } from './styles'

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

export default function PayFees(props) {

    const months= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let yourDate = new Date()
    const [date, setDate] = useState(yourDate.toISOString().split('T')[0])

    const host = "http://localhost:4000"

    // const [month, setMonth] = useState()
    let month;

    // const updateMonth = ()=>{

    //   if((props?.paid[(props.paid?.length)-1]?.month)===11){
    //     // month = 0;
    //     setMonth(0)
    //   }
    //   else{
    //     // month = (props.student?.paid[(props.student?.paid?.length)-1]?.month)+1
    //     setMonth((props.paid[(props.paid?.length)-1]?.month)+1)
    //   }
    // }

    if((props.student?.paid?.length)===0){
      // setMonth(new Date().getMonth())
      month = new Date().getMonth();
    }
    else if((props.student?.paid[(props.student?.paid?.length)-1]?.month)===11){
      month = 0;
      // setMonth(0)
    }
    else{
      month = (props.student?.paid[(props.student?.paid?.length)-1]?.month)+1
      // setMonth((props.student?.paid[(props.student?.paid?.length)-1]?.month)+1)
    }

    console.log(props?.paid[(props.paid?.length)-1]?.month)
    
    // useEffect(() => {
    //   if((props.student?.paid?.length)===0){
    //     setMonth(new Date().getMonth())
    //     // month = new Date().getMonth();
    //   }
    //   else if((props.student?.paid[(props.student?.paid?.length)-1]?.month)===11){
    //     // month = 0;
    //     setMonth(0)
    //   }
    //   else{
    //     // month = (props.student?.paid[(props.student?.paid?.length)-1]?.month)+1
    //     setMonth((props.student?.paid[(props.student?.paid?.length)-1]?.month)+1)
    //   }
    // }, [props.student])
    


    console.log("month "+month)

    const payFees = async () => {
      // API Call 
      const response = await fetch(`${host}/api/v1/students/fees/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({month:month, date:date})
      });
      const json = await response.json(); 
      console.log(json)
      // props.getStudents();
      props.setPaid([...props.paid,{month: month, date: date, _id: month}])
      // updateMonth();
    }

  return (
    <>
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
    </>
  )
}
