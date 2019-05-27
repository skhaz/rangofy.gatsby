module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-apiserver",
      options: {
        name: "places",
        url: process.env.GATSBY_PLACES_API,
      },
    },
    {
      resolve: "gatsby-plugin-react-helmet",
    }
  ],
}
