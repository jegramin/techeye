import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import tickerStyles from "./ticker.module.css"

const Ticker = () => {
  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        posts {
          edges {
            node {
              link
              title
              uri
            }
          }
        }
      }
    }
  `)

  return (
    <div className={`${tickerStyles.news} ${tickerStyles.red}`}>
      <ul>
        {data.wpgraphql.posts.edges.map((edge, key) => (
          <li key={key}>
            <Link to={edge.node.uri}>{edge.node.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Ticker
