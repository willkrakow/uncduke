module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
    title: `Which blue will win?`,
    description: "Who's gonna win the 2022 NCAA Men's Basketball Championship?"
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/images`,
      },
    },
  ],
}
