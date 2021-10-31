import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import ReactToPdf from "react-to-pdf";
import {  useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Month from '../utils/Month';
import Status from '../utils/Status';
import Category from '../utils/Category';

const ref = React.createRef();
const Request = ()=>{

  const location = useLocation();
  const { t } = useTranslation();
  const [item,setItem] = useState([]);

  const { id } = queryString.parse(location.search);

  useEffect(()=>{
    console.log('id'+id)
      fetch('http://localhost:5001/api/v1/transaction?id='+id)
    .then(res=>res.json())
    .then(result=>{
        setItem(result)
        console.log(result);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])
    return (
        <>
        <center>
        <ReactToPdf targetRef={ref} filename={id+".pdf"}>
        {({toPdf}) => (
            <button onClick={toPdf}>Generate pdf</button>
        )}
        </ReactToPdf>
        <div className="card" ref={ref} style={{width: '400px'}}>
          <center><img className="card-img-top" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png" alt="Aadhaar" style={{ width:200, height:200 }}/></center>
          <div className="card-body">
            <h5 className="card-title">Transaction Receipt</h5>
            <p className="card-text">Address Updation Transaction log receipt.</p>
          </div>
          {/* <ul className="list-group list-group-flush">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul> */}
          <table>
                                      <tr>
                                      <td>{t('txnId')}:</td>
                                      <td>{item.txnID}</td>
                                      </tr>
                                      <tr>
                                     <td>{t('borHash')}: </td> 
                                     <td>{item.borrowerUidHash}</td>
                                     </tr>
                                     <tr>
                                     <td>{t('lldHash')}:</td> 
                                     <td>{item.landLordUidHash}</td>
                                     </tr>
                                     <tr>
                                     <td>{t('category')}:</td> 
                                     <td>{Category(item.category)}</td>
                                    </tr>
                                    <tr>
                                    <td>{t('status')}:</td> 
                                    <td>{Status(item.status)}</td>
                                    </tr>
                                    </table>
          <div className="card-body">
            {/* <a href="/" className="card-link">Another link</a> */}
          </div>
        </div>
        </center>
        </>
      );
}

export default Request;