import React from "react"
import { Helmet } from "react-helmet"
import Form from "react-jsonschema-form"

/*
const workdaySchema = {
  type: "object",
  properties: {
    workday: {
      type: "string",
      title: "Day of the week",
      enum: [
        "All",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    start: {
      type: "string",
      format: "date-time",
      title: "Start",
    },
    end: {
      type: "string",
      format: "date-time",
      title: "End",
    },
  },
}
*/
const mainSchema = {
  title: "Registration",
  type: "object",
  properties: {
    profile: {
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
    },
    places: {
      title: "Places",
      type: "array",
      items: {
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
          sunday: {
            type: "object",
            title: "Sunday",
            properties: {
              from: {
                type: "number",
                title: "From",
              },
              to: {
                type: "number",
                title: "To",
              }
            }
          },
        },
      },
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

      <Form
        schema={mainSchema}
        uiSchema={uiSchema}
        onSubmit={({ formData }, event) => {
          console.log("submitted formData", formData)
          console.log("submit event", event)
        }}
      />
    </>
  )
}
