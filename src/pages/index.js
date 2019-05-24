import React, { useCallback } from "react"
import Div100vh from "react-div-100vh"

import Map from "../components/map.js"

export default () => {
  const addMarkers = links => map => {
    links.forEach((link, index) => {
      const marker = new window.google.maps.Marker({
        map,
        position: link.coords,
        label: `${index + 1}`,
        title: link.title,
      })
      marker.addListener("click", () => {})
    })
  }

  const mapProps = {
    options: {
      disableDefaultUI: true,
      zoomControl: true,
      zoom: 5,
      center: {
        lat: -23.533773,
        lng: -46.62529,
      },
    },

    onMount: addMarkers([]),
  }

  const MemoMap = useCallback(<Map {...mapProps} />, [])

  return <Div100vh>{MemoMap}</Div100vh>
}
