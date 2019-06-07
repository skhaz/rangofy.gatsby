import React, { useCallback } from "react"
import { graphql } from "gatsby"
import Container from "../components/container.js"
import Map from "../components/map.js"
import Carousel from "../components/carousel.js"

export const query = graphql`
  {
    remote {
      places {
        name
        position {
          lat: latitude
          lng: longitude
        }
      }
    }
  }
`

export default props => {
  const { remote } = props.data

  const addMarkers = places => map => {
    const { maps } = window.google

    places.forEach(({ name, position }) => {
      const marker = new maps.Marker({ map, position, name })

      maps.event.addListener(marker, "click", () => {})
    })
  }

  const mapProps = {
    options: {
      center: {
        lat: -23.533773,
        lng: -46.62529,
      },
      disableDefaultUI: true,
      gestureHandling: "greedy",
      zoom: 6,
    },

    onMount: addMarkers(remote.places),
  }

  const MemoMap = useCallback(<Map {...mapProps} />, [])

  const MemoCarousel = useCallback(<Carousel />, [])

  return (
    <Container>
      {MemoMap}
      {MemoCarousel}
    </Container>
  )
}
