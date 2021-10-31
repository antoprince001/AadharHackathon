const stats = {
    "0" :  "Suspicious Request ",
    "1" : "Required address not in landlord aadhaar",  
    "2"  : "Spam Request",
    "3"  : "Minor Change Mismatch",
    "4" : "Normal Request"
 }

 const Category = (st)=>{
 
     return stats[st];
     
 }
 
 export default Category;