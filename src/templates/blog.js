import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import blogStyles from "../styles/blog.module.css"
import authorImage from "../images/clock.svg"
import homeComponents from "../components/relatedArticles.module.css"
import User from "../images/user.svg"

export const query = graphql`
  query($databaseId: ID!, $categoryId: [String], $tagId: [String]) {
    wpgraphql {
      post(id: $databaseId, idType: DATABASE_ID) {
        title
        content
        date
        tags {
          edges {
            node {
              name
              slug
              uri
            }
          }
        }
        author {
          node {
            name
            slug
            databaseId
          }
        }
        featuredImage {
          node {
            sourceUrl(size: LARGE)
          }
        }
        categories {
          edges {
            node {
              name
              slug
              uri
            }
          }
        }
      }
      posts(
        first: 6
        where: {
          taxQuery: {
            relation: OR
            taxArray: [
              {
                taxonomy: CATEGORY
                operator: IN
                field: SLUG
                terms: $categoryId
              }
              { taxonomy: TAG, operator: IN, field: SLUG, terms: $tagId }
            ]
          }
        }
      ) {
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
`

const Blog = props => {
  return (
    <Layout>
      <div className={blogStyles.article}>
        <h1>{props.data.wpgraphql.post.title}</h1>
        {/* <div className={blogStyles.author}>
                    <div>
                        <h5>{props.data.wpgraphql.post.author.node.name}</h5>
                    </div>
                    <img src={authorImage}/>
                </div> */}
        <img
          className={blogStyles.featuredImage}
          src={props.data.wpgraphql.post.featuredImage.node.sourceUrl}
        />
        <div className={blogStyles.contentContainer}>
          <p
            dangerouslySetInnerHTML={{
              __html: props.data.wpgraphql.post.content,
            }}
          ></p>
        </div>
        {props.data.wpgraphql.post.categories.edges[0] && (
          <div className={blogStyles.categories}>
            {props.data.wpgraphql.post.categories.edges.map((edge, key) => {
              return (
                <Link
                  key={key}
                  to={`${edge.node.uri}`}
                  className={blogStyles.category}
                >
                  {edge.node.name}
                </Link>
              )
            })}
          </div>
        )}
        {props.data.wpgraphql.post.tags.edges[0] && (
          <div className={blogStyles.categories}>
            {props.data.wpgraphql.post.tags.edges.map((edge, key) => {
              return (
                <Link
                  key={key}
                  to={`${edge.node.uri}`}
                  className={blogStyles.category}
                >
                  {edge.node.name}
                </Link>
              )
            })}
          </div>
        )}
        <Link
          to={`/browse/profile/${props.data.wpgraphql.post.author.node.slug}`}
        >
          <div className={blogStyles.author}>
            <div>
              <p>نووسەر</p>
              <h3>{props.data.wpgraphql.post.author.node.name}</h3>
            </div>
            <img src={authorImage} alt="" />
          </div>
        </Link>

        <div className={homeComponents.wrapper}>
          <div className={homeComponents.header}>
            {/* <Link to={`/category/news`}>
                        <img src={More}/>
                    </Link> */}
            <h3>بابەتە پەیوەندیدارەکان</h3>
            {/* <img src={Clock}/> */}
          </div>
          <div className={homeComponents.container}>
            {props.data.wpgraphql.posts.edges.map(edge => {
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
      </div>
    </Layout>
  )
}

export default Blog
