import React from 'react'
import { styles } from './styles';

import Alert from '@mui/material/Alert';


export default function AlertPopup(props) {
  return (
    <>  
        <div style={styles.box}>
            <Alert sx={styles.alert} severity={props.type}>{props.text}</Alert>
        </div>
    </>
  )
}
