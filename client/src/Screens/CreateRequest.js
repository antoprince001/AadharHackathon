import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { send } from '../utils/Push';
import { useTranslation } from 'react-i18next'
import uuid from 'react-uuid'
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

const CreateRequest = () => {
    const { t } = useTranslation();
    const history = useHistory()
    const [aadhaar, setAadhaar] = useState('1237jhcdh');
    const [landLordUid, setLandLordUid] = useState('');
    const [error, setError] = useState('');

    // Function to validate UID
    const aadhaarValidator = () => {

        if (landLordUid.length !== 12) {
            console.log('Aadhaar number should be 12 digits');
            setError('Aadhaar number should be 12 digits');
        }
        else {
            setError('');
        }
    }

    // Function to make API call to AUTH api
    const addRequest = () => {

        setError('');
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let txnId = uuid();
        let currentdate = new Date(); 
        console.log(Base64.stringify(sha256(landLordUid)));
        let raw = JSON.stringify({
            "txnID": txnId,
            "borrowerUidHash": Base64.stringify(sha256(aadhaar)),
            "landLordUidHash": Base64.stringify(sha256(landLordUid)),
            "status": 0,
            "entryDay": currentdate.getDate(),
            "entryMonth": currentdate.getMonth()+1,
            "entryYear": currentdate.getFullYear(),
            "entryHour": currentdate.getHours(),
            "entryMinute": currentdate.getMinutes(),
            "category": 4
        });
        console.log(raw);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5001/api/v1/logTransaction", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                setError(result);
                send("New Address Request", "Address request successfully sent to the browser! Check it out!")

                //history.push('/');
            })
            .catch(error => console.log('error', error));


    }

    return (

        <div>
            <center>
                <br /><br />
                <div className="card col-8">
                    <br />
                    <h3>{t('requestForAddressUpdate')}</h3>
                    <br />
                    <br />
                    <br />
                    <form>

                        {/* Section visible until OTP generation */}


                        <>
                            <div className="col-6 form-group">
                                <label htmlFor="exampleFormControlInput1">{t('aadhaarInputLL')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder={t('aadhaarPlaceholderLL')}
                                    value={landLordUid}
                                    onChange={(e) => setLandLordUid(e.target.value)}
                                    onBlur={aadhaarValidator}
                                />
                            </div>
                            <br />

                            <br />

                            <br />
                            <button type="button" className="btn btn-success" onClick={() => addRequest()}>{t('createRequest')}</button>
                        </>
                        <br />

                    </form>
                    {error}
                </div>
            </center>
        </div>
    )
}

export default CreateRequest;
