//import React from "react"
import PropTypes from "prop-types" // <- import prop-types

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import Course_Card from "./Course_Card"

function Course_Slider({ Courses }) {
  const desktopSlides = 3
  const loopEnabled = Courses.length > desktopSlides

  return (
    <>
      {Courses.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={loopEnabled}
          breakpoints={{
            1024: {
              slidesPerView: desktopSlides,
            },
          }}
          className="max-h-[30rem] pt-8 px-2"
        >
        {Courses.map((course, i) => (
          <SwiperSlide key={course._id || i}>
            <Course_Card course={course} Height="h-[250px]" index={i} />
          </SwiperSlide>
        ))}

        </Swiper>
      ) : (
        <div className="flex flex-col sm:flex-row gap-6">
          <p className="h-[201px] w-full rounded-xl skeleton"></p>
          <p className="h-[201px] w-full rounded-xl hidden lg:flex skeleton"></p>
          <p className="h-[201px] w-full rounded-xl hidden lg:flex skeleton"></p>
        </div>
      )}
    </>
  )
}

// PropTypes validation
Course_Slider.propTypes = {
  Courses: PropTypes.arrayOf(PropTypes.object), // <- define Courses as an array of objects
}

// Default props in case none are passed
Course_Slider.defaultProps = {
  Courses: [],
}

export default Course_Slider
