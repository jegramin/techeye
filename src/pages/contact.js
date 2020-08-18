import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"

const Learning = () => {
  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        page(id: "384", idType: DATABASE_ID) {
          slug
          content
          title
        }
      }
    }
  `)
  return (
    <Layout>
      <h1>{data.wpgraphql.page.title}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: data.wpgraphql.page.content,
        }}
      ></p>{" "}
    </Layout>
  )
}

export default Learning
