
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
const BlogSwiperSection = ()=>{
    const MockArrayPagenums=[1,2,3,4,5,6,7,8,9,10,11,12,13]


    return(
        <div className="flex w-full justify-center items-center">
        <Swiper
            className="w-[30%] self-center"
            slidesPerView={8}
            spaceBetween={0}
            pagination={{ clickable: true }}
            modules={[Navigation]}
            navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            }}
            breakpoints={{
                446: { slidesPerView: 8 },
                640: { slidesPerView: 8 },
            }}
        >
            {MockArrayPagenums.map((data, index) => (
                <SwiperSlide key={index}>
                    <h1 className="px-4 text-black">{data}</h1>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
    )
}

export default BlogSwiperSection;