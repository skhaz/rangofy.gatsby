import React, { useState } from "react"
import styled from "styled-components"

export default ({ value, changeMe }) => {
  return (
    <div style={{ backgroundColor: "red", width: "100px" }}>
      <h1 onClick={() => changeMe(value)}>slide</h1>
    </div>
  )
}
