import React from 'react'
import {Link, graphql, useStaticQuery} from 'gatsby'
import { node } from 'prop-types'
import Layout from '../components/layout'
import blogStyles from '../styles/blogs.module.css'

function BlogsPage() {
    const data = useStaticQuery(graphql`
        query {
            wpgraphql {
              posts {
                edges {
                  node {
                    title
                    date
                    content
                    excerpt
                    slug
                    categories {
                      edges {
                        node {
                          name
                          databaseId
                        }
                      }
                    }
                    author {
                      node {
                        name
                        databaseId
                      }
                    }
                    featuredImage {
                      node {
                        sourceUrl(size: MEDIUM)
                      }
                    }
                  }
                }
              }
            }
        }
    `)
    
    return (
        <Layout>
            {
                data.wpgraphql.posts.edges.map(edge => {
                    return(
                      <div className={blogStyles.wrapper}>
                        <Link to={`/blogs/${edge.node.slug}`} style={{textDecoration: 'none', color: '#161616'}} key={edge.node.slug}>
                            <div className={blogStyles.card} style={{backgroundImage: `url(${edge.node.featuredImage.node.sourceUrl})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'}}>
                              {/* <p>{edge.node.categories.edges[0].node.name}</p> */}
                              <h4>{edge.node.title}</h4>
                              <div>
                                  <p>by: "{edge.node.author.node.name}"</p>
                              </div>
                            </div>
                        </Link>
                      </div>
                    )
                })
            }
        </Layout>
    )
}

export default BlogsPage