import React, { useCallback } from "react"

import Map from "../components/map.js"

export default () => {
  const addMarkers = links => map => {
    links.forEach((link, index) => {
      const marker = new window.google.maps.Marker({
        map,
        position: link.coords,
        // label: `${index + 1}`,
        title: link.title,
      })
      marker.addListener("click", () => {
        console.log(link.title)
      })
    })
  }

  const l = [
    {
      coords: { lat: -23.533773, lng: -46.62529 },
      title: "",
    },
  ]

  const mapProps = {
    options: {
      disableDefaultUI: true,
      zoomControl: true,
      zoom: 4,
      center: { lat: -23.533773, lng: -46.62529 },
    },

    onMount: addMarkers(l),
  }

  const MemoMap = useCallback(<Map {...mapProps} />, [])

  return <>{MemoMap}</>
}
