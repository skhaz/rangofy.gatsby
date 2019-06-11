import React from "react"
import Box from "@material-ui/core/Box"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"

export default () => {
  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" p={1}>
        <Box p={1} width="100%" bgcolor="grey.300">
          <Typography variant="h4" gutterBottom>
            h4. Heading
          </Typography>
          <Typography variant="body1" gutterBottom>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>
        </Box>
      </Box>

      <Box display="flex" p={1}>
        <Box p={1} width="100%" bgcolor="grey.300">
          <TextField fullWidth label="Name" margin="normal" />
        </Box>
      </Box>
    </div>
  )
}
