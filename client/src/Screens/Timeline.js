import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import React, {useEffect, useState, useContext} from 'react';
import Month from '../utils/Month';
import Status from '../utils/Status';
import Category from '../utils/Category';
import { useTranslation } from 'react-i18next'
import {  useLocation } from 'react-router-dom';
import queryString from 'query-string';

const Timeline = () =>{
        
        const { t } = useTranslation();

        const [data1, setData1] = useState([]);
        const [data2, setData2] = useState([]);
        const location = useLocation();

        const [currentUserHash,setCurrentUserHash] = useState('fjvbf');
        //const {state, dispatch} = useContext(UserContext)
        //console.log(state)
//                    "Authorization":"Bearer "+localStorage.getItem("uidHash")
        const { id } = queryString.parse(location.search);

        useEffect(()=>{
            console.log('id'+id)
            setCurrentUserHash('fjvbf');
              fetch('http://localhost:5001/api/v1/transactionsByBoth?lid='+currentUserHash+'&bid='+id)
            .then(res=>res.json())
            .then(result=>{
                setData1(result)
                console.log(result);
            })
            .catch((err)=>{
              console.log(err);
            })

            fetch('http://localhost:5001/api/v1/transactionsByBoth?bid='+currentUserHash+'&lid='+id)
            .then(res=>res.json())
            .then(result=>{
                setData2(result)
                console.log(result);
            })
            .catch((err)=>{
              console.log(err);
            })
        },[])
    
        return (
          <>
            <div  >
                <h3>Interactions with the Landlord {id} </h3>
                < br />
                <h4>
                    <center> Audit Log as Borrower </center>
                </h4>


    <VerticalTimeline>

    <div>
             {
                 data2.map(item=>{
                     return(
                        <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: '#b2dfdb', color: '#000' }}
                                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                date={item.entryDay + "-" + Month(item.entryMonth) + "-" + item.entryYear + "  " + item.entryHour + " : " + item.entryMinute}
                                iconStyle={{ background: '#0288d1', color: '#fff' }}
                            >
                                <center>
                                <h5 className="vertical-timeline-element-title"> {item.title} </h5>
                                </center>
                            <center>
                            {/* <img src={item.photo} width="200px" height="150px"
                                style={{ borderRadius : '5px!important'}}/> <br/> */}
                                <h2>
                                
                                    <b>  </b>
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
                                </h2>

                                </center>
                    </VerticalTimelineElement>
                     )
                 })
             }

         </div>
         <VerticalTimelineElement
    iconStyle={{ background: '#0288d1', color: '#fff' }}
  />
  
         </VerticalTimeline>



  {/* <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#c8e6c9', color: '#000' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="STL"
    iconStyle={{ background: '#388e3c', color: '#fff' }}
  >
      <center>
      <h1 className="vertical-timeline-element-title"> Seed Testing Lab: </h1>
      </center>
   <img src="https://www.nova-seedlab.com/wp-content/uploads/2018/12/logo.png"
    style={{ borderRadius : '5px!important'}}/>
       <h2>
       SamplePassed: <br/>
       SampleSecreteCode <br/>
        SampleTestDate <br/>
       </h2>
  </VerticalTimelineElement> */}

  

            </div>

            <div>
              <h4>
                    <center> Audit Log as Land lord </center>
                </h4>


    <VerticalTimeline>

    <div>
             {
                 data1.map(item=>{
                     return(
                        <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: '#b2dfdb', color: '#000' }}
                                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                date={item.entryDay + "-" + Month(item.entryMonth) + "-" + item.entryYear + "  " + item.entryHour + " : " + item.entryMinute}
                                iconStyle={{ background: '#0288d1', color: '#fff' }}
                            >
                                <center>
                                <h5 className="vertical-timeline-element-title"> {item.title} </h5>
                                </center>
                            <center>
                            {/* <img src={item.photo} width="200px" height="150px"
                                style={{ borderRadius : '5px!important'}}/> <br/> */}
                                <h2>
                                
                                <b>  </b>
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
                            </h2>

                                </center>
                    </VerticalTimelineElement>
                     )
                 })
             }

         </div>
         <VerticalTimelineElement
    iconStyle={{ background: '#0288d1', color: '#fff' }}
  />
  
         </VerticalTimeline>
  

            </div>
</>
        )
    }
export default Timeline
