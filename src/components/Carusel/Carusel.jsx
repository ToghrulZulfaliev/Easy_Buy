import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import './carusel.css';

export default function App() {





    return (
        <>
            <Swiper
                modules={[Autoplay]}
                className="mySwiper"
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false
                }}
                loop={true}
                speed={1000}
            >
                <SwiperSlide>
                    <img
                        src="/images/shopmens.png-min.jpg"
                        alt="Men's Collection"
                    />
                    <div className="slide-content">
                        <h2>Men's Collection</h2>
                        <p>Discover latest trends</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <img
                        src="/images/newimages.jpg"
                        alt="Women's Collection"
                    />
                    <div className="slide-content">
                        <h2>Women's Collection</h2>
                        <p>Elegant styles for every occasion</p>
                    </div>
                </SwiperSlide>
                {/* 
                <SwiperSlide>
                    <img
                        src="/images/shopwoman2.png"
                        alt="Accessories"
                    />

                </SwiperSlide> */}
            </Swiper>
        </>
    );
}