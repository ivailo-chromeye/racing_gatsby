module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    raceDays: {
      "TUESDAY": {
        date: "2020-06-16",
        active: false,
      }, 
      "WEDNESDAY": {
        date: "2020-06-17",
        active: false,
      }, 
      "THURSDAY": {
        date: "2020-06-18",
        active: false,
      }, 
      "FRIDAY": {
        date: "2020-06-19",
        active: false,
      },
      "SATURDAY": {
        date: "2020-06-20",
        active: false,
      },
    },
  },
  plugins: [
    `gatsby-plugin-transition-link`,
    'gatsby-plugin-sass',
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // your WordPress source
        baseUrl: `https://development.chromeye.com/rp/hubs/cheltenham/`,
        protocol: `https`,
        // is it hosted on wordpress.com, or self-hosted?
        hostingWPCOM: false,
        // does your site use the Advanced Custom Fields Plugin?
        useACF: true,
        perPage: 100,
        excludedRoutes: [
          "**/yoast/v1/configurator",
          "**/yoast/v1/reindex_posts",
          "**/yoast/v1/ryte",
          "**/yoast/v1/file_size",
          "**/yoast/v1/statistics",
          "**/yoast/v1/connect",
          "**/articles",
          "**/statusses",
          "**/taxonomies",
          "**/comments",
          "**/tags",
          "**/categories",
          "**/users",
          "**/blocks",
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/
        }
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
