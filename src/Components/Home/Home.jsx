import React from "react";
import MainSlider from "../MainSlider/MainSlider";
import Categories from "../Categories/Categories";
import Products from "../Products/Products";
import axios from 'axios'
import Slider from 'react-slick'
import { baseURL } from '../../utils/baseUrl'
import { useQuery } from 'react-query'

export default function Home() {
  async function getCategories() {
    return axios.get(baseURL + "categories/");
  }
  let { data, isLoading } = useQuery("getCategories", getCategories);
  console.log(data?.data?.data);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  if (isLoading)
    return (
      <div className="fa fa-spinner fa-spin d-flex justify-content-center fa-5x mt-5 text-main"></div>
    );
  return (
    <>
      <MainSlider />
      {/* <Categories /> */}

      <div className="container my-5">
        <h3>Shop Popular Categories</h3>
        <Slider {...settings}>
          {data?.data?.data?.map((val) => (
            <div className="px-1">
              <img src={val.image} className="w-100" height={250} alt="" />
              <h5>{val.name}</h5>
            </div>
          ))}
        </Slider>
      </div>

      <Products />
    </>
  );
}
