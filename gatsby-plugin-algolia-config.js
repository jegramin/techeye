require('dotenv').config({
    path: `.env`,
  })
  const queries = [
    {
      query: `
        {
            wpgraphql {
                posts {
                    edges {
                        node {
                            id
                            title
                            slug
                            excerpt
                        }
                    }
                }
            }
        }
      `,
      transformer: ({ data }) =>
        data.wpgraphql.posts.edges.map(
          ({
            node: {
              id,
              excerpt,
              title,
              slug
            },
          }) => ({
            id,
            title,
            description: excerpt,
            path: slug,
          })
        ),
    },
  ]
  module.exports = {
    appId: process.env.GATSBY_ALGOLIA_APP_ID,
    apiKey: process.env.GATSBY_ALGOLIA_ADMIN_API_KEY,
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
    queries,
  }