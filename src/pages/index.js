import React, { useCallback } from "react"
import Map from "../components/map.js"

const mapProps = {
  options: {
    center: { lat: 20, lng: 40 },
    zoom: 4,
  },
}

export default () => {
  const MemoMap = useCallback(<Map {...mapProps} />, [])

  return <>{MemoMap}</>
}
