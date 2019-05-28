module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        fieldName: "query",
        typeName: "Place",
        url: "https://us-central1-fifteenner.cloudfunctions.net/gql",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-netlify",
  ],
}
