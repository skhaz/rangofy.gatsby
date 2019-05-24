import React, { useCallback } from "react"
import { graphql } from "gatsby"

import Div100vh from "react-div-100vh"

import Map from "../components/map.js"

export const query = graphql`
  {
    allPlaces {
      edges {
        node {
          title
          position {
            lat
            lng
          }
        }
      }
    }
  }
`

export default props => {
  const { allPlaces } = props.data

  const addMarkers = places => map => {
    places.edges.map(({ node }) => {
      const { title, position } = node
      const marker = new window.google.maps.Marker({ map, position, title })
      marker.addListener("click", (e) => { alert(e) })
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

    onMount: addMarkers(allPlaces),
  }

  const MemoMap = useCallback(<Map {...mapProps} />, [])

  return <Div100vh>{MemoMap}</Div100vh>
}
