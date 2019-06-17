import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import { Formik } from "formik"
import { useDocumentOnce } from "react-firebase-hooks/firestore"
import * as Yup from "yup"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(4),
  },

  paper: {
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
}))

const validationSchema = Yup.object({
  name: Yup.string().required("name is required"),
  whatsapp: Yup.boolean().default(false),
})

const Root = props => <div className={props.className}>{props.children}</div>

const Profile = props => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    values,
    touched,
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        name="name"
        label="Name"
        margin="normal"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
      />
      <TextField
        fullWidth
        name="mobile"
        label="Mobile"
        margin="normal"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.mobile}
      />
      <FormControlLabel
        name="whatsapp"
        label="WhatsApp?"
        control={<Checkbox checked={values.whatsapp} />}
        onChange={handleChange}
        onBlur={handleBlur}
      />
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
    </form>
  )
}

export default ({ firestore }) => {
  const classes = useStyles()

  const uid = "1jHeyVss8f8Ivwe4dtjB"

  const docRef = firestore.doc(`places/${uid}`)

  const [document, loading, error] = useDocumentOnce(docRef)

  const handleSubmit = (values, { setSubmitting }) => {
    docRef.update(values).then(() =>
      setTimeout(() => {
        setSubmitting(false)
      }, 300)
    )
  }

  return (
    <Root className={classes.root}>
      {!loading && !error && (
        <Paper className={classes.paper}>
          <Formik
            validationSchema={validationSchema}
            initialValues={document.data()}
            onSubmit={handleSubmit}
            render={props => <Profile {...props} />}
          />
        </Paper>
      )}
    </Root>
  )
}
