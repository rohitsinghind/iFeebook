import React,{useState,useEffect} from 'react'
import { styles } from './styles';

import AddStudent from './components/addStudent';
import Student from './components/student';
import StudentDetails from './components/studentDetails';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';



export default function Home() {

  const host = "http://localhost:4000"
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null)

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

  console.log(students)

  return (
    <>
    <Container maxWidth="xl">
      <AddStudent getStudents={getStudents}/>
      <Box sx={styles.flex}>
      <Paper variant="outlined" sx={styles.leftPane}>
        <Student students={students} setStudent={setStudent} student={student}/>
      </Paper>
      <Paper variant="outlined" sx={styles.rightPane}>
        
        <StudentDetails getStudents={getStudents} student={student}/>
      
      </Paper>
      </Box>
    </Container>
    </>
  )
}
