import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu,
  NavHead,
} from './NavbarElements';
import Burger from './Burger';

const Navbar = (props) => {
  console.log(props);
  const logout = () => {
    props.logoutUser();
  };
  
  return (
    <>
      <Nav>
       <NavHead>
        
        <NavLink to='/' activeStyle>
            Aadhar Address Update Portal            
        </NavLink>
        </NavHead>
        <NavMenu>
       {  localStorage.getItem('jwtToken') ?  (
         <>
          <NavLink to='/income' activeStyle>
            Income
          </NavLink>
          <NavLink to='/expense' activeStyle>
            Expense
          </NavLink>
          <NavLink to='/asset' activeStyle>
            Asset
          </NavLink>
          <NavLink to='/liability' activeStyle>
            Liability
          </NavLink>
          <NavLink to='/logout' activeStyle onClick={logout}>
            Logout
          </NavLink>
          </> ) : (
            <>
          <NavLink to='/queryTimeline' activeStyle>
            Timeline Visualisation
          </NavLink>
          <NavLink to='/queryRequest' activeStyle>
            Request Explorer
          </NavLink>
            </>

          ) }      
        </NavMenu>
        <Burger />
    
      </Nav>
    </>
  );
};
  

export default Navbar;