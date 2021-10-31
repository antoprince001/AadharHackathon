const stats = {
   "0" :  "Pending" , 
   "1" :  "Accepted",
   "-1" : "Rejected",  
   "2"  :  "Pending Minor Address Updation",
   "3"  :  "Admitted Minor Change",
    "4" : "Rejected Minor Change"
}
const Status = (st)=>{

    return stats[st];
    
}

export default Status;