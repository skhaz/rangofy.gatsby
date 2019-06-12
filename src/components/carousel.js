import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Slider from "react-slick"

const SlideItem = props => {
  const { name, image } = props.item

  const Image = styled.img`
    width: 100%;
    border-radius: 5px;
    margin: 0;
  `

  const Caption = styled.span`
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    font-family: monospace;
    padding: 3px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    text-align: center;
  `

  const Wrapper = styled.div`
    box-sizing: border-box;
    position: relative;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  `

  return (
    <Wrapper>
      <Image alt={name} src={image} />
      <Caption>{name}</Caption>
    </Wrapper>
  )
}

export default props => {
  // const { places } = props

  const items = [
    {
      image: "https://i.imgur.com/kHbYaF9.jpg",
      name: "Camera",
    },
    {
      image: "https://i.imgur.com/WTWwrhM.jpg",
      name: "Tomato",
    },
    {
      image: "https://i.imgur.com/TaKE8RQ.jpg",
      name: "Salad",
    },
    {
      image: "https://i.imgur.com/EwB1EG0.jpg",
      name: "Star",
    },
    {
      image: "https://i.imgur.com/R5kIKjN.jpg",
      name: "Bicyclet",
    },
    {
      image: "https://i.imgur.com/NPd4MJd.jpg",
      name: "Hamburger",
    },
    {
      image: "https://i.imgur.com/IeBUq2X.jpg",
      name: "Honey",
    },
    {
      image: "https://i.imgur.com/fExK5EE.jpg",
      name: "Mushroom",
    },
    {
      image: "https://i.imgur.com/PBEZcVZ.jpg",
      name: "Hats",
    },
    {
      image: "https://i.imgur.com/ApTUwqP.jpg",
      name: "Breakfast",
    },
  ]

  const [numberOfSlides, setNumberOfSlides] = useState(null)

  function windowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const { width } = windowDimensions()

      setNumberOfSlides(parseInt(width / 240, 10))
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      {numberOfSlides && (
        <Slider
          infinite={false}
          dots={false}
          slidesToShow={numberOfSlides}
          slidesToScroll={numberOfSlides}
        >
          {items.map((item, index) => (
            <SlideItem key={index} item={item} />
          ))}
        </Slider>
      )}
    </>
  )
}
