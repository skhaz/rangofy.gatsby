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
      key: "1",
    },
    {
      image: "https://i.imgur.com/WTWwrhM.jpg",
      name: "Tomato",
      key: "2",
    },
    /*
    {
      image: "https://i.imgur.com/JOL6DG1.jpg",
      name: "Coffee",
      key: 3
    },
*/
    {
      image: "https://i.imgur.com/TaKE8RQ.jpg",
      name: "Salad",
      key: "4",
    },

    {
      image: "https://i.imgur.com/EwB1EG0.jpg",
      name: "Star",
      key: "5",
    },

    {
      image: "https://i.imgur.com/R5kIKjN.jpg",
      name: "Bicyclet",
      key: "6",
    },
    /*
    {
      image: "https://i.imgur.com/pdSaFk6.jpg",
      name: "Plant",
      key: 7
    },
    */
    {
      image: "https://i.imgur.com/NPd4MJd.jpg",
      name: "Hamburger",
      key: "8",
    },
    {
      image: "https://i.imgur.com/IeBUq2X.jpg",
      name: "Honey",
      key: "9",
    },
    {
      image: "https://i.imgur.com/fExK5EE.jpg",
      name: "Mushroom",
      key: "10",
    },
    {
      image: "https://i.imgur.com/PBEZcVZ.jpg",
      name: "Hats",
      key: "12",
    },
    {
      image: "https://i.imgur.com/ApTUwqP.jpg",
      name: "Breakfast",
      key: "13",
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
          infinite
          dots
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
