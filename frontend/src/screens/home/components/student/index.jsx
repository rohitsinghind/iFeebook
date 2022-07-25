import React,{useState, useEffect} from 'react'
import { styles } from './styles'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

export default function Student(props) {

  return (
    <>
    <Typography sx={styles.head}>Students</Typography>
    {
    props.students?.map((student) => (
        <Paper variant="outlined" onClick={()=>{props.setStudent(student)}} sx={student?._id===props.student?._id?styles.paperA:styles.paper} key={student._id}>
        <Box sx={styles.flex}>
            <Typography sx={styles.name}>{student?.name}</Typography>
            <Typography sx={styles.class}>class {student?.std}</Typography>
        </Box>
        </Paper>
        ))}
    </>
  )
}
