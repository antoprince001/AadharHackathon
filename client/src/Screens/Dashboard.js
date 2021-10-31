import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Sidebar from '../Components/SideBar/Sidebar';
import Month from '../utils/Month';
import Status from '../utils/Status';
import Category from '../utils/Category';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const { t } = useTranslation();
    const [succeeded, setSucceeded] = useState([]);
    const [failed, setFailed] = useState([]);
    const history = useHistory()

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
      

        fetch("http://localhost:5001/api/v1/transactionsByLandLordStatus?id=fjvbf&status=0", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setSucceeded(result);
            })
            .catch(error => console.log('error', error));

        fetch("http://localhost:5001/api/v1/transactionsByBorrowerStatus?id=1237jhcdh&status=0", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setFailed(result);
            })
            .catch(error => console.log('error', error));
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                        <h1 className="h2">{t('pendingReq')}</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group mr-2">
                                <button className="btn btn-sm btn-outline-secondary">Share</button>
                                <button className="btn btn-sm btn-outline-secondary">Export</button>
                            </div>
                            <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                <span data-feather="calendar" />
                                This week
                            </button>
                        </div>
                    </div>
                    <h2><i>{t('awaitAction')}</i></h2>
                    <div className="table-responsive">
                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>{t('txnId')}</th>
                                    <th>{t('borrowerHash')}</th>
                                    <th>{t('category')}</th>
                                    <th>{t('timestamp')}</th>
                                    <th>{t('status')}</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>

                                {
                                    succeeded.map(item => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{item.txnID}</td>
                                                <td>{item.borrowerUidHash}</td>
                                                <td>{Category(item.category)}</td>
                                                <td>{item.entryDay + "-" + Month(item.entryMonth) + "-" + item.entryYear + "  " + item.entryHour + " : " + item.entryMinute}</td>
                                                <td>{Status(item.status)}</td>
                                                <td><button class="btn-success" onClick={() => { history.push('/addressAdmit?bid=' + item.txnID) }} >{t('admit')}</button></td>
                                                <td><button class="btn-success" onClick={() => { history.push('/request?id=' + item.txnID) }} >{t('reject')}</button></td>
                                                <td><button class="btn-success" onClick={() => { history.push('/request?id=' + item.txnID) }} >{t('viewMore')}</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <br /><br />
                    <h2><i>{t('pendingRequests')}</i></h2>
                    <div className="table-responsive">
                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>{t('txnId')}</th>
                                    <th>{t('lldHash')}</th>
                                    <th>{t('category')}</th>
                                    <th>{t('timestamp')}</th>
                                    <th>{t('status')}</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>

                                {
                                    failed.map(item => {
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{item.txnID}</td>
                                                <td><a href={"/queryTimeline?id="+item.landLordUidHash}>{item.landLordUidHash}</a></td>
                                                <td>{Category(item.category)}</td>
                                                <td>{item.entryDay + "-" + Month(item.entryMonth) + "-" + item.entryYear + "  " + item.entryHour + " : " + item.entryMinute}</td>
                                                <td>{Status(item.status)}</td>
                                                <td><button class="btn-success" onClick={() => { history.push('/request?id=' + item.txnID) }} >{t('viewMore')}</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard;
