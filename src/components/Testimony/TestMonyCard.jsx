import React from 'react'

const TestMonyCard = ({item}) => {
  return (
    <div className='slider_card'>
        <img src={item.image} alt="logo" />
        <h3>{item.name}</h3>
        <p>{item.message}</p>
    </div>
  )
}

export default TestMonyCard