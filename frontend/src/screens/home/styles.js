export const styles = {
    flex:{
      display:"flex"
    },
    leftPane:{
      background:"#f1f4f3",
      width:"29.5%",
      mr:"0.5%",
      height:"602px",
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
    rightPane:{
      background:"#f1f4f3",
      width:"70%"
    }
  };
  