module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        fieldName: "remote",
        typeName: "Place",
        url: process.env.GATSBY_PLACES_GQL,
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-netlify",
  ],
}
