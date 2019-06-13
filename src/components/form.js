import React, { useEffect, useState } from "react"
import Box from "@material-ui/core/Box"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { useFirebase } from "~/providers/firebase"

export default () => {
  const [isSignedIn, setSignedIn] = useState(null)

  const firebase = useFirebase()

  const firebaseAuth = firebase.auth()

  const uiConfig = {
    signInFlow: "popup",

    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],

    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  }

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      setSignedIn(!!user)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const renderUnauthorized = () => (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
  )

  const renderEditor = () => (
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

  return (
    <>
      {isSignedIn && renderEditor()}
      {isSignedIn !== null && !isSignedIn && renderUnauthorized()}
    </>
  )
}
