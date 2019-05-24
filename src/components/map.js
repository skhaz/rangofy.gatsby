import React, { useEffect, useRef } from "react"

export default function Map({ options, onMount, className }) {
  const props = { ref: useRef(), className }

  const handleComplete = () => {
    const map = new window.google.maps.Map(props.ref.current, options)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const location = new window.google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          )
          map.setCenter(location)
          map.setZoom(13)
          console.log(location)
        },
        error => {
          alert(error)
        },
        { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
      )
    }

    onMount && onMount(map)
  }

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyA3rUroV_dcTe0VC5bUYp6v5sAP3p29WIg` /* +
        process.env.GOOGLE_MAPS_API_KEY */
      const headScript = document.getElementsByTagName("script")[0]
      headScript.parentNode.insertBefore(script, headScript)
      script.addEventListener("load", handleComplete)
      return () => script.removeEventListener("load", handleComplete)
    } else {
      handleComplete()
    }
  })

  return <div {...props} style={{ height: "100vh" }} />
}
