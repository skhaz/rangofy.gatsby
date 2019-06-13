import React from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

export default ({ firebase, auth }) => {
  const uiConfig = {
    signInFlow: "popup",

    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],

    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  }

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
}
