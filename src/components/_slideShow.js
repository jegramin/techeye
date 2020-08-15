import React from 'react'
import {Link, graphql, useStaticQuery} from 'gatsby'
import { node } from 'prop-types'

const SlideShow = () => {
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
                      acf_details {
                        toBeInSlideshow
                      }
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
        <div>
            {
                data.wpgraphql.posts.edges.filter(edge => edge.node.acf_details.toBeInSlideshow).map(edge => {
                    return(
                        <Link to={`/blogs/${edge.node.slug}`} style={{textDecoration: 'none', color: 'red'}} key={edge.node.slug}>
                            <p>{edge.node.categories.edges[0].node.name}</p>
                            {/* <div>
                                <img src={edge.node.featured_media.localFile.childImageSharp.fixed.src} alt='' />
                            </div> */}
                            <h4>{edge.node.title}</h4>
                            <p dangerouslySetInnerHTML={{__html: edge.node.excerpt}}></p>
                            <div>
                                <p>{edge.node.date}</p>
                                <p>by: "{edge.node.author.node.name}"</p>
                            </div>
                            <br />
                            <br />
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default SlideShow