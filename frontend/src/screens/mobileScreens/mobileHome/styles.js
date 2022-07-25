export const styles = {
    
    box:{
        background:"#f1f4f3",
        mr:"0.5%",
        mt:"15px",
        height:"85vh",
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
    head:{
        fontSize:"28px",
        display:"flex",
        justifyContent:"center",
        my:"7px"
      },
      paper:{
        m:"4px",
        borderRadius:"30px",
        background:"#d0e2e4",
        cursor:"pointer",
        '&:hover':{
          background:"#e1eaec",
      }
      },
      flex:{
        display:"flex",
            alignItems:"center",
            justifyContent:"start",
            alignItems:"center",
            pl:"30px",
            my:"10px"
      },
      name:{
        fontSize:"20px",
        width:"60%"
      },
      class:{
        fontSize:"17px",
        width:"60%",
        color:"#535353"
      }
}