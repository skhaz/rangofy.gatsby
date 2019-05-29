import React from "react"
import { Helmet } from "react-helmet"
import Form from "react-jsonschema-form"

const profileSchema = {
  title: "Contact",
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      title: "E-mail",
    },
    url: {
      type: "string",
      format: "uri",
      title: "Website",
    },
    telephone: {
      type: "string",
      title: "Telephone",
      minLength: 10,
    },
    whatsapp: {
      type: "boolean",
      title: "Whatsapp?",
      default: false,
    },
  },
}

const workdaySchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      title: "E-mail1111",
    },
  },
}

const placeSchema = {
  type: "object",
  title: "New place",
  properties: {
    name: {
      type: "string",
      title: "Name",
    },
    address: {
      type: "string",
      title: "Address",
    },
    mobile: {
      type: "boolean",
      title: "Mobile?",
      default: false,
    },
    cover: {
      type: "string",
      format: "data-url",
      title: "Cover",
    },
    photos: {
      type: "array",
      format: "uri",
      title: "Photos",
      items: {
        type: "string",
        format: "data-url",
      },
    },
    places: {
      title: "Workdays",
      type: "array",
      items: workdaySchema,
    },
  },
}

const mainSchema = {
  title: "Registration",
  type: "object",
  properties: {
    profileSchema,
    places: {
      title: "Places",
      type: "array",
      items: placeSchema,
    },
  },
}

const uiSchema = {}

const theme =
  "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/flatly/bootstrap.min.css"

export default () => {
  return (
    <>
      <Helmet>
        <link href={theme} rel="stylesheet" />
      </Helmet>

      <Form schema={mainSchema} uiSchema={uiSchema} />
    </>
  )
}
