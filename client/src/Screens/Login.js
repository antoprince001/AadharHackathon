import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { send } from '../utils/Push';
import { useTranslation } from 'react-i18next'
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';


const Login = (props) => {
    const { t } = useTranslation();
    const history = useHistory()
    const [aadhaar, setAadhaar] = useState('');
    const [OTP, setOTP] = useState('');
    const [error, setError] = useState('');
    const [otpGenerated, setOtpGenerated] = useState(false)



    useEffect(() => {
        //generateCaptcha();
        send("Aadhar UID", "Push notification successfully sent to the browser! Check it out!")

    }, []);


    // Function to make API call to generate OTP
    const generateOTP = async () => {
        setError('');
        if (aadhaar !== '' || aadhaar !== undefined || aadhaar !== null) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "uid": aadhaar,
                "txnId": "0acbaa8b-b3ae-433d-a5d2-51250ea8e970",
                "otp": OTP
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://stage1.uidai.gov.in/onlineekyc/getOtp/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.status === "y" || result.status === "Y") {
                        setOtpGenerated(true);
                        setError('')
                        send("OTP", "OTP message successfully sent to the browser! Check it out!")

                    }
                    else {
                        setError('Error Generating OTP !');
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    // Function to validate UID
    const aadhaarValidator = () => {
        
        if (aadhaar.length !== 12) {
            console.log('Aadhaar number should be 12 digits');
            setError('Aadhaar number should be 12 digits');
        }
        else {
            setError('');
        }
    }

    // Function to make API call to AUTH api
    const PostLogin = () => {

        setError('');
        //aadhaarValidator();
        if ((OTP !== '' || OTP !== undefined || OTP !== null) && error === '') {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "uid": aadhaar,
                "txnId": "0acbaa8b-b3ae-433d-a5d2-51250ea8e970",
                "otp": OTP
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://stage1.uidai.gov.in/onlineekyc/getAuth/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if(result.status === "y" || result.status === "Y"){
                        setError('');
                        send("AADHAR AUTH", "UID Authentication successful ! OTP verified")

                        history.push('/');
                    }
                    else{

                        setError('Authentication Failed');

                    }
                })
                .catch(error => console.log('error', error));

        }
        else{
            setError('Invalid OTP');
        }
    }


    return (
        <div>
            <center>
                <br /><br />
                <div className="card col-8">
                    <br />
                    <h3>Welcome to UIDAI Address Updation Portal</h3>
                    <br />
                    <br />
                    <br />
                    <form>
                    
                        {/* Section visible until OTP generation */}

                        {!otpGenerated && (
                            <>
                                <div className="col-6 form-group">
                                    <label htmlFor="exampleFormControlInput1">{t('aadhaarInput')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder={t('aadhaarPlaceholder')}
                                        value={aadhaar}
                                        contentEditable={!otpGenerated}
                                        onChange={(e) => setAadhaar(e.target.value)}
                                        onBlur={aadhaarValidator}
                                    />
                                </div>
                                <br />

                                <br />

                                <br />
                                <button type="button" className="btn btn-success" onClick={() => generateOTP()}>{t('generateOTP')}</button>
                            </>)}
                        <br />

                        
                        {/* Section made visible after OTP generation */}
                        {otpGenerated && (
                            <div className="col-6 form-group">
                                <label htmlFor="exampleFormControlInput1">{t('enterOTP1')}</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder={t('enterOTP2')}
                                    value={OTP}
                                    onChange={(e) => setOTP(e.target.value)}
                                />
                                <br />
                                <br />
                                <button type="button" className="btn btn-success" onClick={() => PostLogin()}>{t('verifyOTP')}</button>

                            </div>
                        )
                        }
                    </form>
                    {error}
                </div>
            </center>
        </div>
    )
}



export default Login;
