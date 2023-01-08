import React from 'react'

import styled from 'styled-components'

const Widget = ({data}) => {
  return (
    <StyleWidget>
        <Icon data={data.color} bgColor={data.bgColor}>
            {data.icon}
        </Icon>
        <Text>
            <h3>
               {
               data?.isMoney ? "Rs " + data.digits?.toLocaleString()
               :
               data.digits?.toLocaleString()
               }
            </h3>

            <p>{data.title}</p>
         </Text>

         {
            data.percentage < 0 ?
            <>
              <Percentage isPositive={false}>{Math.floor(data.percentage) + "%"}</Percentage>
            </>
            :
            <>
              <Percentage  isPositive={true}>{Math.floor(data.percentage) + "%"}</Percentage>
            </>
         }
    </StyleWidget>
  )
}

export default Widget


const StyleWidget = styled.div`
    display: flex;
    align-items: center;
`

const Text = styled.div`
  margin-left: 0.5rem;
   h3{
    font-weight: 900;
   }
   p{
    font-size: 16px;
    color: rgba(234,234,255,0.68);
   }
`

const Icon = styled.div`
    margin-right: 0.5rem;
    padding: 0.5rem;
    font-size: 20px;
    border-radius: 3px;
    color: ${({color})=>color};
    background-color: ${({bgColor})=>bgColor};
    cursor: pointer;
`

const Percentage = styled.div`
    margin-left: 0.5rem;
    font-size: 14px;
    border-radius: 3px;
    color: ${({isPositive})=> isPositive ? "rgb(114,255,40)" : "rgb(255,77,73)"};
    
`