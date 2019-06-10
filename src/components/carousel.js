import React, { useState } from "react"
import Carousel from "nuka-carousel"

import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

const Slide = ({ value, changeMe }) => {
  const classes = useStyles()

  return (
    <Card onClick={() => changeMe(value)} className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default () => {
  const [index, setIndex] = useState(0)

  const [slides, setSlides] = useState([1, 2, 3, 4, 5, 6, 7, 8])

  return (
    <Carousel
      swiping
      withoutControls
      style={{
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
      }}
      cellAlign="center"
      slideWidth="345px"
      cellSpacing={30}
      slidesToShow={8}
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
