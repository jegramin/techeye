require("dotenv").config({
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
                            databaseId
                            excerpt
                        }
                    }
                }
            }
        }
      `,
    transformer: ({ data }) =>
      data.wpgraphql.posts.edges.map(
        ({ node: { id, excerpt, title, databaseId } }) => ({
          id,
          title,
          description: excerpt,
          path: databaseId,
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
