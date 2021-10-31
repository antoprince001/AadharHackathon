import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { send } from '../utils/Push';
import { useTranslation } from 'react-i18next'



const AddressAdmit = (props) => {
    const { t } = useTranslation();
    const history = useHistory()
    const [aadhaar, setAadhaar] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [captchaTxnId, setCaptchaTxnId] = useState('');
    const [captchaImg, setCaptchaImg] = useState('');
    const [otp, setOtp] = useState('');
    const [otpGenerated, setOtpGenerated] = useState(false);
    const [xmlRetrieved, setXmlRetrieved] = useState(false);
    const [otpTxnId, setOtpTxnId] = useState('');

    const [error, setError] = useState('');
    // const ToRegister = ()=>{
    //     history.push('/regisnter');
    // }

    useEffect(() => {
        generateCaptcha();
        send("Push Notifications", "Push notification successfully sent to the browser! Check it out!")

    }, []);

    const generateCaptcha = async () => {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "langCode": "en",
            "captchaLength": "3",
            "captchaType": "2"
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://stage1.uidai.gov.in/unifiedAppAuthService/api/v2/get/captcha", requestOptions)
            .then(response => response.json())
            .then(result => {

                console.log(result)
                if (result.statusCode === 200) {

                    console.log('Captcha loaded')
                    setCaptchaImg(result.captchaBase64String);
                    setCaptchaTxnId(result.captchaTxnId)
                    
                }

            })
            .catch(error => console.log('error', error));

    }

    const generateOtp = async () => {
        var myHeaders = new Headers();
        myHeaders.append("x-request-id", "b8b5b7df-d224-4956-8eb3-6a4fb8f0c236");
        myHeaders.append("appid", "MYAADHAAR");
        myHeaders.append("Accept-Language", "en");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "uidNumber": aadhaar,
            "captchaTxnId": captchaTxnId,
            "captchaValue": captcha,
            "transactionId": "MYAADHAAR:b8b5b7df-d224-4956-8eb3-6a4fb8f0c236"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://stage1.uidai.gov.in/unifiedAppAuthService/api/v2/generate/aadhaar/otp", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status === "Success") {
                    setOtpGenerated(true);
                    setOtpTxnId(result.txnId)
                    setError('OTP Generated Succesfully !');
                }
                else{
                    setError('Invalid OTP !');

                }

            })
            .catch(error => {
                console.log('error', error)
                setError('Error Generating OTP');
        });
    }

    const getOfflineXML = async () => {
        setError('');
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "txnNumber": otpTxnId,
            "otp": otp,
            "shareCode": "4567",
            "uid": aadhaar
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://stage1.uidai.gov.in/eAadhaarService/api/downloadOfflineEkyc", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status === "Success") {
                    setXmlRetrieved(true);
                    setError('OTP Verification Successful !');
                }
            })
            .catch(error => {
                console.log('error', error)
                setError('OTP Verification Failed    !');

            });
    }

    const sendOfflineXML = ()=>{
        
    }


    const aadhaarValidator = () => {
        if (aadhaar.length !== 12) {
            console.log('Aadhaar number should be 12 digits');
            setError('Aadhaar number should be 12 digits');
        }
        else {
            setError('');
        }
    }
    // const PostLogin = () => {
    //     setTimeout(() => {
    //         // if(props.isLoggedIn) {
    //         //     return history.push("/");
    //         // } else {

    //         //     console.log("Invalid email and password");
    //         // }
    //         console.log(props);
    //     }, 500);
    // }
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
                       { !otpGenerated && (
                           <>
                            <div className="col-6 form-group">
                            <label htmlFor="exampleFormControlInput1">{t('aadhaarInput')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder={t('aadhaarPlaceholder')}
                                value={aadhaar}
                                onChange={(e) => setAadhaar(e.target.value)}
                                onBlur={aadhaarValidator}
                            />
                        </div>
                        <br />
                        <div className="col-6 form-group">
                            <label htmlFor="exampleFormControlInput1">{t('captchaInput')}</label>

                            {captchaImg ?
                                <img width='100' height='100' alt="Loading..." src={`data:image/png;base64,${captchaImg}`} /> : ''}
                            <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder={t('captchaPlaceholder')}
                                value={captcha}
                                onChange={(e) => setCaptcha(e.target.value)}
                            />
                        </div>
                        <br />

                        <br />
                        <button type="button" className="btn btn-success" onClick={() => generateOtp()}>{t('generateOTP')}</button>
                        <br />
                        </>) }

                        { otpGenerated && (
                           <>
                            <div className="col-6 form-group">
                            <label htmlFor="exampleFormControlInput1">{t('enterOTP1')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder={t('enterOTP1')}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <br />

                        <br />
                        <button type="button" className="btn btn-success" onClick={() => getOfflineXML()}>{t('verifyOTP')}</button>
                        <br />
                        </>) }
                        { xmlRetrieved && (
                           <>
                            {/* <div className="col-6 form-group">
                            <label htmlFor="exampleFormControlInput1">{t('enterOTP1')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder={t('enterOTP1')}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                onBlur={aadhaarValidator}
                            />
                        </div> */}
                        <br />

                        <br />
                        <button type="button" className="btn btn-success" onClick={() => getOfflineXML()}>{t('sendAddress')}</button>
                        <br />
                        </>) }
                    </form>
                    {error}
                </div>
            </center>
        </div>
    )
}



export default AddressAdmit;
