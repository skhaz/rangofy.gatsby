import React, { useState } from "react"
import Carousel from "nuka-carousel"

const Slide = ({ value, changeMe }) => {
  return (
    <div style={{ backgroundColor: "red", width: "100px" }}>
      <h1 onClick={() => changeMe(value)}>slide</h1>
    </div>
  )
}

export default () => {
  const [index, setIndex] = useState(0)

  const [slides, setSlides] = useState([1, 2, 3, 4, 5, 6, 7])

  return (
    <Carousel
      swiping
      withoutControls
      style={{
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        width: "300px",
        margin: "auto",
        position: "absolute",
      }}
      cellAlign="center"
      slideWidth="100px"
      opacityScale={1}
      transitionMode="scroll3d"
      cellSpacing={30}
      slidesToShow={3}
      zoomScale={0.85}
      slideIndex={index}
    >
      {slides &&
        slides.map((index, value) => (
          <Slide
            key={`slide-${index}`}
            value={value}
            changeMe={i => {
              setIndex(i)
            }}
          />
        ))}
    </Carousel>
  )
}
