import React from "react"
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from "@material-ui/core/styles"
import { deepPurple, deepOrange } from "@material-ui/core/colors"
import CssBaseline from "@material-ui/core/CssBaseline"
import Div100vh from "react-div-100vh"

export default ({ children }) => {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Div100vh>{children}</Div100vh>
    </ThemeProvider>
  )
}
