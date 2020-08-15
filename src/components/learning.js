import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { node } from "prop-types"
import homeComponents from "./homeComponents.module.css"
import Book from "../../assets/learning.svg"
import More from "../../assets/more.svg"
import User from "../images/user.svg"

const Learning = () => {
  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        posts(where: { categoryName: "learning" }, first: 5) {
          edges {
            node {
              title
              date
              content
              excerpt
              slug
              uri
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
                  sourceUrl(size: MEDIUM_LARGE)
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <div className={homeComponents.wrapper}>
      <Link to={`/in/learning`}>
        <div className={homeComponents.header}>
          <More />
          <h3>فێربوون</h3>
          <Book />
        </div>
      </Link>
      <div className={homeComponents.container}>
        {data.wpgraphql.posts.edges.map(edge => {
          return (
            <div key={edge.node.slug}>
              <Link
                to={`${edge.node.uri}`}
                style={{ textDecoration: "none", color: "#161616" }}
              >
                <div
                  className={homeComponents.card}
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.53125) 0%, rgba(255,255,255,0) 100%),url(${edge.node.featuredImage.node.sourceUrl})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* <p>{edge.node.categories.edges[0].node.name}</p> */}
                  <div className={homeComponents.cardCategory}>
                    {edge.node.categories.edges.map((edge, key) => (
                      <p key={key}>{edge.node.name}</p>
                    ))}
                  </div>
                  <h4>{edge.node.title}</h4>
                  <div className={homeComponents.author}>
                    <p>{edge.node.author.node.name}</p>
                    <img src={User} />
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Learning
