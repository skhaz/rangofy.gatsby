import React from "react"
import AddIcon from "@material-ui/icons/Add"
import Button from "@material-ui/core/Button"
import Fab from "@material-ui/core/Fab"
import Paper from "@material-ui/core/Paper"
import { Formik, Form, FieldArray } from "formik"
import { FormikTextField, FormikSwitchField } from "formik-material-fields"
import { useCollection } from "react-firebase-hooks/firestore"
import * as Yup from "yup"
import StyledDropzone from "./dropzone"

const Root = ({ children }) => (
  <div
    style={{
      flexGrow: 1,
    }}
  >
    {children}
  </div>
)

const Wrapper = ({ children }) => (
  <Paper
    style={{
      flexDirection: "column",
      alignItems: "center",
      padding: 16,
      margin: 16,
    }}
  >
    {children}
  </Paper>
)

const PlaceEntry = ({ place, setFieldValue }) => {
  return (
    <>
      <FormikTextField
        fullWidth
        name={`${place}.name`}
        label="Name"
        margin="normal"
      />
      <FormikTextField
        fullWidth
        name={`${place}.address`}
        label="Address"
        margin="normal"
      />
      <FormikTextField
        fullWidth
        name={`${place}.phone`}
        label="Phone"
        margin="normal"
      />
      <FormikSwitchField
        fullWidth
        name={`${place}.whatsapp`}
        label="WhatsApp?"
        margin="normal"
      />

      <StyledDropzone onDropAccepted={() => {}} />
    </>
  )
}

const PlaceArray = props => {
  const { values, isSubmitting, handleSubmit, setFieldValue } = props

  return (
    <Form onSubmit={handleSubmit}>
      <FieldArray
        name="places"
        render={_ =>
          values.places.map((_, index) => (
            <Wrapper key={index}>
              <PlaceEntry
                place={`places.${index}`}
                setFieldValue={setFieldValue}
              />
            </Wrapper>
          ))
        }
      />
      <Wrapper>
        <Button
          fullWidth
          disabled={isSubmitting}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </Wrapper>
    </Form>
  )
}

export default ({ firestore }) => {
  const placesRef = firestore.collection("places")

  const [snapshot, loading, error] = useCollection(placesRef)

  const handleSubmit = async ({ places }, { setSubmitting }) => {
    const batch = firestore.batch()

    places.forEach(place => {
      const clone = { ...place }
      const { id } = clone
      delete clone.id

      batch.set(placesRef.doc(id), { ...clone }, { merge: true })
    })

    return batch.commit().then(
      setTimeout(() => {
        setSubmitting(false)
      }, 300)
    )
  }

  const handleClick = async () => {
    return placesRef.doc().set({})
  }

  const validationSchema = Yup.object().shape({
    places: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string()
            .required()
            .min(3),
          address: Yup.string().required(),
          phone: Yup.string().required(),
          whatsapp: Yup.boolean().default(false),
        })
      )
      .required("Must have at least one")
      .min(1, "Minimum of 1 place"),
  })

  const initialValues =
    snapshot && snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

  return (
    <>
      <Root>
        {!loading && !error && (
          <Formik
            validationSchema={validationSchema}
            initialValues={{ places: initialValues }}
            onSubmit={handleSubmit}
            render={props => <PlaceArray {...props} />}
          />
        )}
      </Root>
      <Fab
        color="secondary"
        onClick={handleClick}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
      >
        <AddIcon />
      </Fab>
    </>
  )
}
