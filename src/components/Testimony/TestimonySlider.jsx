import React from 'react'
import Slider from "react-slick";

import {testimony} from './data'
import TestMonyCard from './TestMonyCard';


const TestimonySlider = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:  true,
        centerPadding : '60px',
        focusOnSelect : true,
        slickPrev : true
      };


  return (
    <div className='slider'>
           <h3 className='slider_head'>Our Testimony</h3>
        <Slider {...settings}>
         
            {
                testimony.map((item) => (
                    <TestMonyCard item={item}/>
                ))
            }
         
         
        </Slider>
         </div>
  )
}

export default TestimonySlider