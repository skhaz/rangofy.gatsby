import React, { useEffect, useRef } from "react"

export default ({ options, onMount, className }) => {
  const props = { ref: useRef(), className }

  const onLoad = () => {
    onMount && onMount(new window.google.maps.Map(props.ref.current, options))
  }

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src =
        `https://maps.google.com/maps/api/js?key=` +
        process.env.GOOGLE_MAPS_API_KEY
      const headScript = document.getElementsByTagName("script")[0]
      headScript.parentNode.insertBefore(script, headScript)
      script.addEventListener("load", onLoad)
      return () => script.removeEventListener("load", onLoad)
    } else {
      onLoad()
    }
  })

  return <div {...props} style={{ height: "100vh" }} />
}
