module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ["Roboto:300,400,500", "Material+Icons"],
        },
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        fieldName: "remote",
        typeName: "Place",
        url: process.env.GATSBY_PLACES_GQL,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Kioskify",
        short_name: "Kioskify",
        start_url: "/",
        background_color: "#51317c",
        theme_color: "#51317c",
        display: "standalone",
      },
    },
  ],
}
