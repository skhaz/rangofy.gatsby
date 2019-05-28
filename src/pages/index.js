import React, { useCallback, useState } from "react"
import { graphql } from "gatsby"

import Div100vh from "react-div-100vh"

import Map from "../components/map.js"

export const query = graphql`
  {
    query {
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
  const { query } = props.data

  const [markers, setMarkers] = useState([])

  const addMarkers = places => map => {
    const markers = places.map(({ position }) => {
      return new window.google.maps.Marker({ map, position })
    })

    setMarkers(markers)
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

    onMount: addMarkers(query.places),
  }

  const MemoMap = useCallback(<Map {...mapProps} />, [])

  return <Div100vh>{MemoMap}</Div100vh>
}
