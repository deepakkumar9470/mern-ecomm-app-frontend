import React from 'react'
import styled from 'styled-components'
import {FaUser, FaClipboard,FaChartBar} from 'react-icons/fa'
import Widget from './Summary-Component/Widget'
import Transactions from './Summary-Component/Transactions'

const Summary = () => {

   const data = [
    {
      icon: <FaUser/>,
      digits:  5,
      isMoney : false,
      title:  'Users',
      color: 'rgb(102,108,255)',
      bgColor: 'rgba(102,108,255,0.12)',
      percentage: 10
    },
    {
      icon: <FaClipboard/>,
      digits:  50,
      isMoney : false,
      title:  'Orders',
      color:  '#58fcaa',
      bgColor: 'rgba(38,198,249,0.12)',
      percentage: 50
    },
    {
      icon: <FaChartBar/>,
      digits:  50000,
      isMoney : true,
      title:  'Earnings',
      color: 'rgb(253,181,40)',
      bgColor: 'rgba(253,181,40,0.12)',
      percentage: -30
    }
   ]
  return (
      <StyledSummary>
          
          <MainStats>
            <Overview>
                <Title>
                  <h2>Order Overview</h2>
                  <p>How your shop is performing as compared to previous month</p>
                </Title>
                <WidgetWrapper>
                 {
                  data?.map((item,i) => <Widget data = {item} key={i}/>)
                 }
                </WidgetWrapper>
            </Overview>
          </MainStats>
           <Transactions/>
      </StyledSummary>
  )
}

export default Summary

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
`
const MainStats = styled.div`
  flex: 2;
  width: 100%;
 
`
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: rgb(48,51,78);
  color: rgba(234,234,255,0.68);
  width: 100%;
  height: 200px;
  padding: 1.5rem;
  border-radius: 10px;

`

const Title = styled.div`
p{
  font-size: 14px;
  color: rgba(234,234,255,0.68);
}
 
`

const WidgetWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`