import React, { useEffect, useState } from "react"
import { useFirebase } from "~/providers/firebase"
import SignIn from "~/components/signin"
import Form from "~/components/form"

export default () => {
  const [isSignedIn, setSignedIn] = useState(null)

  const firebase = useFirebase()

  const auth = firebase.auth()

  const firestore = firebase.firestore()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setSignedIn(!!user)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const renderUnauthorized = () => <SignIn firebase={firebase} auth={auth} />

  const renderEditor = () => <Form firestore={firestore} />

  return (
    <>
      {isSignedIn && renderEditor()}
      {isSignedIn !== null && !isSignedIn && renderUnauthorized()}
    </>
  )
}
