import React from 'react'
import Slider from 'react-slick'


const ImageSlider = () => {

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoPlay: true,
      slidesToScroll: 1
    }
  return (
    <Slider {...settings}>
        <div><h2>Lorem ipsum dolor sit amet.</h2></div>
        <div><h2>Lorem ipsum dolor sit amet.</h2></div>
        <div><h2>Lorem ipsum dolor sit amet.</h2></div>
        <div><h2>Lorem ipsum dolor sit amet.</h2></div>
        <div><h2>Lorem ipsum dolor sit amet.</h2></div>
    </Slider>
  )
}

export default ImageSlider