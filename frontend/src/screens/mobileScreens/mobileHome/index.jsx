import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { styles } from './styles'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

export default function MobileHome(props) {

  const host = "http://localhost:4000"
  const [students, setStudents] = useState([]);
  
  let navigate = useNavigate();


  const getStudents = async () => {
    const response = await fetch(`${host}/api/v1/students/fetchallstudents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    setStudents(json)
  }


  useEffect(() => {
    getStudents();
  }, [setStudents])


  return (
    <>
      <Container maxWidth="xl">
        <Paper variant="outlined" sx={styles.box}>
        <Typography sx={styles.head}>Students</Typography>
        {
        students?.map((student) => (
        <Paper variant="outlined" onClick={()=>{props.setStudent(student);navigate('/studentDetails')}} sx={styles.paper} key={student._id}>
        <Box sx={styles.flex}>
            <Typography sx={styles.name}>{student?.name}</Typography>
            <Typography sx={styles.class}>class {student?.std}</Typography>
        </Box>
        </Paper>
        ))}
        </Paper>
      </Container>
    </>
  )
}
