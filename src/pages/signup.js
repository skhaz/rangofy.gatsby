import React from "react"
import { Helmet } from "react-helmet"
import Form from "react-jsonschema-form"

const schema = {
  title: "Schema dependencies",
  description: "These samples are best viewed without live validation.",
  type: "object",
  properties: {
    simple: {
      src:
        "https://spacetelescope.github.io/understanding-json-schema/reference/object.html#dependencies",
      title: "Simple",
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        credit_card: {
          type: "number",
        },
      },
      required: ["name"],
      dependencies: {
        credit_card: {
          properties: {
            billing_address: {
              type: "string",
            },
          },
          required: ["billing_address"],
        },
      },
    },
    conditional: {
      title: "Conditional",
      $ref: "#/definitions/person",
    },
    arrayOfConditionals: {
      title: "Array of conditionals",
      type: "array",
      items: {
        $ref: "#/definitions/person",
      },
    },
    fixedArrayOfConditionals: {
      title: "Fixed array of conditionals",
      type: "array",
      items: [
        {
          title: "Primary person",
          $ref: "#/definitions/person",
        },
      ],
      additionalItems: {
        title: "Additional person",
        $ref: "#/definitions/person",
      },
    },
  },
  definitions: {
    person: {
      title: "Person",
      type: "object",
      properties: {
        "Do you have any pets?": {
          type: "string",
          enum: ["No", "Yes: One", "Yes: More than one"],
          default: "No",
        },
      },
      required: ["Do you have any pets?"],
      dependencies: {
        "Do you have any pets?": {
          oneOf: [
            {
              properties: {
                "Do you have any pets?": {
                  enum: ["No"],
                },
              },
            },
            {
              properties: {
                "Do you have any pets?": {
                  enum: ["Yes: One"],
                },
                "How old is your pet?": {
                  type: "number",
                },
              },
              required: ["How old is your pet?"],
            },
            {
              properties: {
                "Do you have any pets?": {
                  enum: ["Yes: More than one"],
                },
                "Do you want to get rid of any?": {
                  type: "boolean",
                },
              },
              required: ["Do you want to get rid of any?"],
            },
          ],
        },
      },
    },
  },
}

const log = type => console.log.bind(console, type)

export default () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title 2</title>
        <link href="//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/flatly/bootstrap.min.css" rel="stylesheet"></link>
      </Helmet>
      <Form
        schema={schema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")}
      />
    </>
  )
}
