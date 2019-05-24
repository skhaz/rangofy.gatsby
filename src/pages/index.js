import React, { useCallback } from "react"
import Map from "../components/map.js"

const addMarkers = links => map => {
  links.forEach((link, index) => {
    const marker = new window.google.maps.Marker({
      map,
      position: link.coords,
      label: `${index + 1}`,
      title: link.title,
    })
    marker.addListener(`click`, () => {
      window.location.href = link.url
    })
  })
}

const mapProps = {
  options: {
    center: { lat: 20, lng: 40 },
    zoom: 4,
    disableDefaultUI: true,
  },

  onMount: addMarkers([]),
}

export default () => {
  const MemoMap = useCallback(<Map {...mapProps} />, [])

  return <>{MemoMap}</>
}
