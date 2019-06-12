import React, { useCallback } from "react"
import { graphql } from "gatsby"
import Container from "~/components/container"
import Map from "~/components/map"
import Carousel from "~/components/carousel"

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
  const { places } = props.data.remote

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

    onMount: addMarkers(places),
  }

  const MemoMap = useCallback(<Map {...mapProps} />, [])

  const MemoCarousel = useCallback(
    <div
      style={{
        position: "absolute",
        left: 60,
        bottom: 30,
        right: 60,
      }}
    >
      <Carousel places={places} />
    </div>,
    []
  )

  return (
    <Container>
      {MemoMap}
      {MemoCarousel}
    </Container>
  )
}
