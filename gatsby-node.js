const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve("./src/templates/blog.js")
  const blogResults = await graphql(`
    query {
      wpgraphql {
        posts {
          edges {
            node {
              databaseId
              slug
              categories {
                edges {
                  node {
                    slug
                  }
                }
              }
              tags {
                edges {
                  node {
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  blogResults.data.wpgraphql.posts.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/browse/${edge.node.databaseId}`,
      context: {
        databaseId: edge.node.databaseId,
        categoryId: edge.node.categories.edges.map(edge => edge.node.slug),
        tagId: edge.node.tags.edges.map(edge => edge.node.slug),
      },
    })
  })

  const postsTemplate = path.resolve("./src/templates/category.js")
  const PostsResults = await graphql(`
    query {
      wpgraphql {
        categories(first: 100) {
          edges {
            node {
              slug
              databaseId
            }
          }
        }
      }
    }
  `)
  PostsResults.data.wpgraphql.categories.edges.forEach(edge => {
    createPage({
      component: postsTemplate,
      path: `/in/${edge.node.slug}`,
      context: {
        databaseId: edge.node.databaseId,
        categoryId: edge.node.databaseId,
      },
    })
  })

  const tagsTemplate = path.resolve("./src/templates/tag.js")
  const tagResults = await graphql(`
    query {
      wpgraphql {
        tags(first: 100) {
          edges {
            node {
              slug
              databaseId
            }
          }
        }
      }
    }
  `)
  tagResults.data.wpgraphql.tags.edges.forEach(edge => {
    createPage({
      component: tagsTemplate,
      path: `/in/${edge.node.slug}`,
      context: {
        databaseId: edge.node.databaseId,
        tagId: edge.node.databaseId,
      },
    })
  })

  const authorBlogsTemplate = path.resolve("./src/templates/authorBlogs.js")
  const authorBlogsResults = await graphql(`
    query {
      wpgraphql {
        users {
          edges {
            node {
              slug
              databaseId
            }
          }
        }
      }
    }
  `)
  authorBlogsResults.data.wpgraphql.users.edges.forEach(edge => {
    createPage({
      component: authorBlogsTemplate,
      path: `/browse/profile/${edge.node.slug}`,
      context: {
        databaseId: edge.node.databaseId,
        authorId: edge.node.databaseId,
      },
    })
  })
}
