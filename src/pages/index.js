import React from "react"
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl"

const accessToken =
  "pk.eyJ1Ijoic2toYXoiLCJhIjoiY2p2emw0NGg5MDFoYjQ4cXFwY2JmcWlwNSJ9.8Pt18c4NYwuOf108P4lR_Q"

const Map = ReactMapboxGl({ accessToken })

export default () => {
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer>
    </Map>
  )
}
