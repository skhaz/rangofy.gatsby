import React, { useEffect, useRef } from "react"

export default function Map({ options, onMount, className }) {
  const props = { ref: useRef(), className }

  const handleLoad = () => {
    const inner = new window.google.maps.Map(props.ref.current, options)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { accuracy, latitude: lat, longitude: lng } = position.coords

          if (accuracy < 30000) {
            inner.setCenter({ lat, lng })
            inner.setZoom(11)
          }
        },
        error => {},
        {
          enableHighAccuracy: true,
          timeout: 3000,
          maximumAge: 0,
        }
      )
    }

    onMount && onMount(inner)
  }

  useEffect(() => {
    if (window.google) {
      return handleLoad()
    }

    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src =
      `https://maps.google.com/maps/api/js?key=` +
        process.env.GATSBY_MAPS_API_KEY

    const headScript = document.getElementsByTagName("script")[0]
    headScript.parentNode.insertBefore(script, headScript)
    script.addEventListener("load", handleLoad)

    return () => {
      script.removeEventListener("load", handleLoad)
    }
  })

  return <div {...props} style={{ height: "100%" }} />
}
