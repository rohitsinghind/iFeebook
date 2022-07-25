export const styles = {
    flex:{
        display:"flex",
        justifyContent:"center",
        p:"20px"
    },
    selectBox:{
      display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"550px"
    },
    selectText:{
      fontSize:"34px",
      color:"gray"
    },
    detailsPane:{
        width:"49%"
    },
    monthsPane:{
        width:"49%",
        height:"560px",
      overflow:"scroll",
      overflowX:"hidden",
      "::-webkit-scrollbar": {
        width:'5px'
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "10px"
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
        borderRadius: "10px"
      },
      "::-webkit-scrollbar-track ": {
        background: "#f1f1f1",
        borderRadius: "10px"
      }

    },
    field:{
        fontSize:"24px",
        width:"190px",
        mb:"10px"
    },
    fieldData:{
        fontSize:"24px",
        mb:"10px",
        color:"#565656"
    },
    head:{
        fontSize:"28px",
        display:"flex",
        justifyContent:"center",
        my:"7px"
      },
      paper:{
        m:"4px",
        borderRadius:"30px",
        background:"#d8e7e8"
      },
      monthBox:{
        display:"flex",
        alignItems:"center",
        justifyContent:"start",
        pl:"30px",
        my:"10px"
      },
    month:{
        fontSize:"20px",
        width:"60%"
        },
    notPaidTxt:{
      fontSize:"17px",
      width:"60%",
      color:"#b6a400"
      },
    date:{
        fontSize:"17px",
        width:"60%",
        color:"#018100"
        },
    removeBox:{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      mt:"15px"
    },
    removeTxt:{
      fontSize:"20px",
    },
    removeBtn:{
      borderRadius:"20px",
      ml:"10px"
    }
}