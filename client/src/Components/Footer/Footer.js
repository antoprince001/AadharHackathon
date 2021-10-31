// import React, { useState, useEffect } from "react";


// const Footer = () => {
//   const [fullYear, setFullYear] = useState();

//   useEffect(() => {
//     setFullYear(new Date().getFullYear());
//   }, [fullYear]);

//   return (
//     <div classname="navbar" fixed="bottom" bg="dark" variant="dark">
//       <div className="container">
//         <div lg={12} className=" col text-center text-muted">
//         <div style={{color: '#f6f6f6'}}>
//             Project By NullPointerException 
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default Footer;

import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { i18n } = useTranslation();

  function changeLanguage(e) {
    i18n.changeLanguage(e.target.value);
  }

  return(
    <div className='footer'>
      <span>Select Language : </span>
      <button onClick={changeLanguage} value='en'>English</button>
      <button onClick={changeLanguage} value='tn'>தமிழ்</button>
      <button onClick={changeLanguage} value='hi'>हिंदी</button>
      <button onClick={changeLanguage} value='ml'>മലയാളം</button>
      <button onClick={changeLanguage} value='te'>തെലുങ്ക്</button>
    </div>
  )
}

export default Footer;