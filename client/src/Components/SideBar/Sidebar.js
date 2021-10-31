import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactTooltip from 'react-tooltip';

export const Sidebar = () => {
    const { t } = useTranslation();

    return (

            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <ReactTooltip />
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link active" data-tip="View pending requests" href="/">
                                <span data-feather="home" />
                                {t('dashboard')}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-tip={t('addressBorrow')} href="/MyRequests">
                                <span data-feather="file" />
                                {t('myRequests')}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-tip={t('createReq')} href="CreateRequest">
                                <span data-feather="shopping-cart" />
                                {t('addressChange')}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-tip={t('requestHist')} href="/history">
                                <span data-feather="users" />
                                {t('requestHistory')}
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-tip={t('verifyAddresses')} href="/verifyAddress">
                                <span data-feather="users" />
                                {t('addressVerifier')}
                            </a>
                        </li>
                    </ul>
                    
                </div>
            </nav>
   
    )
}

export default Sidebar;