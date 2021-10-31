import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const VerifyAddress = () => {
    // Function to make API call to AUTH api
    const { t } = useTranslation();
    // const history = useHistory()
    const [error, setError] = useState('');
    const [address, setAddress] = useState('');
    const [addressLat, setAddressLat] = useState('');
    const [addressLong, setAddressLong] = useState('');

    const [updateAddress, setUpdateAddress] = useState('');
    const [updateAddressLat, setUpdateAddressLat] = useState('');
    const [updateAddressLong, setUpdateAddressLong] = useState('');

    const [diff, setDiff] = useState('');

    const verify = () => {

        setError('');
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://geocode.search.hereapi.com/v1/geocode?apikey=J_z60tR6HA_Pr8jkLoJdUIvnp21ZUgqgowSXXIJ8Ttg&q=" + updateAddress, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.items.position)
                setUpdateAddressLat(result.items.position.lat);
                setUpdateAddressLong(result.items.position.long);
            })
            .catch(error => console.log('error', error));

       
        fetch("https://geocode.search.hereapi.com/v1/geocode?apikey=J_z60tR6HA_Pr8jkLoJdUIvnp21ZUgqgowSXXIJ8Ttg&q=" + address, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.items.position)
                setAddressLat(result.items.position.lat);
                setAddressLong(result.items.position.long);

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
                                <label htmlFor="exampleFormControlInput1">{t('addressTitle')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder={t('address')}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <br />

                            <br />
                            <div className="col-6 form-group">
                                <label htmlFor="exampleFormControlInput1">{t('updatedTitle')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder={t('updatedAddress')}
                                    value={updateAddress}
                                    onChange={(e) => setUpdateAddress(e.target.value)}
                                />
                            </div>
                            <br />
                            <button type="button" className="btn btn-success" onClick={() => verify()}>{t('verifiyAddress')}</button>
                        </>
                        <br />

                    </form>
                    {error}
                </div>
            </center>
        </div>
    )
}

export default VerifyAddress;
