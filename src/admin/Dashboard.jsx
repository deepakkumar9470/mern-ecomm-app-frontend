import React from 'react'
import styled from "styled-components";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {FaUser,FaClipboard,FaStore,FaTachometerAlt} from 'react-icons/fa'

const Dashboard = () => {
  const auth = useSelector((state) => state.auth)

  if(!auth.isAdmin) return <p className="access">Access denied. Not an Admin!</p>;


  return (
    <StyledDashboard>
        <SideNav>
        <h3>Admin Quick Links</h3>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/summary"
        ><FaTachometerAlt/> Summary
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/products"
        ><FaStore/> Products
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/orders"
        ><FaClipboard/> Orders
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/users"
        ><FaUser/> Users
        </NavLink>

        </SideNav>

        {/* Main cntent start here */}
          <Content>
            <Outlet/>
          </Content>
        {/* Main cntent end here */}
        
    </StyledDashboard>
  )
}

export default Dashboard


const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

const SideNav = styled.div`
  border-right: 2px solid #dfdbdb;
  height:100vh;
  position: fixed;
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;
  padding: 2rem;
  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 16px;
  }
  a {
    &:hover{
      color: #333;
      background-color: #f9f9f9;
      border-radius: 3px;
      padding-left: 2px;
      transition: all 0.3s ease;
    }
    text-decoration: none;
    color: #000;
    margin-bottom: 2.5rem;
    font-size: 16px;
  }

  
`;

const Content = styled.div`
  margin-left: 200px;
  padding: 5rem 3rem;
  width: 100%;
`;