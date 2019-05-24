import React, { useEffect, useRef } from "react"

export default function Map({ options, onMount, className }) {
  const props = { ref: useRef(), className }

  const handleLoad = () => {
    const map = new window.google.maps.Map(props.ref.current, options)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { accuracy, latitude: lat, longitude: lng } = position.coords

          if (accuracy < 20000) {
            map.setCenter({ lat, lng })
            map.setZoom(12)
          }
        },
        error => {},
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      )
    }

    onMount && onMount(map)
  }

  useEffect(() => {
    if (window.google) {
      handleLoad()
    } else {
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src =
        `https://maps.google.com/maps/api/js?key=` +
        process.env.GOOGLE_MAPS_API_KEY
      const headScript = document.getElementsByTagName("script")[0]
      headScript.parentNode.insertBefore(script, headScript)
      script.addEventListener("load", handleLoad)
      return () => script.removeEventListener("load", handleLoad)
    }
  })

  return <div {...props} style={{ height: "100vh" }} />
}
