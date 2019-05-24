import React, { useEffect, useRef } from "react"

export default function Map({ options, onMount, className }) {
  const props = { ref: useRef(), className }

  const handleLoad = () => {
    const inner = new window.google.maps.Map(props.ref.current, options)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { accuracy, latitude: lat, longitude: lng } = position.coords

          if (accuracy < 20000) {
            inner.setCenter({ lat, lng })
            inner.setZoom(12)
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

    onMount && onMount(inner)
  }

  useEffect(() => {
    if (window.google) {
      handleLoad()
    } else {
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src =
        `https://maps.google.com/maps/api/js?key=` +
        process.env.GATSBY_MAPS_API_KEY
      const headScript = document.getElementsByTagName("script")[0]
      headScript.parentNode.insertBefore(script, headScript)
      script.addEventListener("load", handleLoad)

      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)

      window.addEventListener("resize", () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty("--vh", `${vh}px`)
      })

      return () => script.removeEventListener("load", handleLoad)
    }
  })

  return <div {...props} style={{ height: "100vh" }} />
}
