import { Swiper, SwiperSlide } from "swiper/react";
import ounass from '@/assets/images/ounass.webp'
import kcal from '@/assets/images/kcal.webp'
import entertainer from '@/assets/images/entertainer.webp'
import loomCollection from '@/assets/images/loom.webp'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/autoplay"

import "./slider.scss";

const dummySlider = [
  {
    img_url: ounass,
    caption: 'Ounass'
  },
  {
    img_url: kcal,
    caption: 'Kcal Extra'
  },
  {
    img_url: entertainer,
    caption: 'The Entertainer'
  },
  {
    img_url: loomCollection,
    caption: 'The Loom Collection'
  }
]

// import Swiper core and required modules
import SwiperCore, {
  Autoplay, Pagination
} from 'swiper';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination]);
export default function Slider() {
  return (
    <>
      <Swiper 
        dir='ltr'
        pagination={{ "clickable": true }}
        autoplay={{
          "delay": 5000,
          "disableOnInteraction": false
        }}
        centeredSlides={true}
        loop={true}
        style={{direction: 'ltr'}}
        className="mySwiper">
          {
            dummySlider.map((el, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={el.img_url} alt={el.caption} />
                  <div className="caption">
                    {el.caption}
                  </div>
                </SwiperSlide>
              )
            })
          }
      
      </Swiper>
    </>
  )
}