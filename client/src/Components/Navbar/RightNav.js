import React from 'react';
import styled from 'styled-components';
import { SideLink } from './NavbarElements'
import { useTranslation } from 'react-i18next'


const Ul = styled.ul`
  list-style: none;
  display: none;
  z-index : 10;
  flex-flow: row nowrap;
  li {
    padding: 10px 10px;
  }
  @media (max-width: 768px) {
    display : flex;
    flex-flow: column nowrap;
    background-color: #fff;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 50vh;
    width: 90%;
    padding-top: 2rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #4568DC;
    }
  }
`;




const RightNav = ({ open }) => {
  const { t } = useTranslation();

    return (
      <Ul open={open}>
        <SideLink to='/' activeStyle>
        {t('dashboard')}
        </SideLink>
        <SideLink to='/MyRequests' activeStyle>
        {t('myRequests')}
        </SideLink>
        <SideLink to='/createRequest' activeStyle>
        {t('addressChange')}
        </SideLink>
        <SideLink to='/history' activeStyle>
        {t('requestHistory')}
        </SideLink>
        <SideLink to='/logout' activeStyle>
            Logout
        </SideLink> 
        
      </Ul>
    )
  }
  
  export default RightNav