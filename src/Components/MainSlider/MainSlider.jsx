import React from 'react'
import Slider from 'react-slick'
import img1 from '../../assets/images/grocery-banner.png'
import img2 from '../../assets/images/grocery-banner-2.jpeg'
import img3 from '../../assets/images/slider-2.jpeg'

export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight:true,
        autoplay:true,
        autoplaySpeed:1000,
        // arrows:false, // to remove arrow so no width scroll

      }

  return (
    <>
        <div className="container">
        <Slider {...settings} >
        <img src={img3} alt="" className=''/>
        <img src={img1} alt="" className=''/>
        <img src={img2} alt="" className=''/>
        


        </Slider>
        </div>
    </>
  )
}
