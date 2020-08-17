import React, { useContext, useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import blogStyles from "../styles/blogs.module.css"
import User from "../images/user.svg"
import More from "../images/more.svg"
import Grid from "../images/grid.svg"
import List from "../images/list.svg"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider"

export const query = graphql`
  query($databaseId: Int!, $authorId: ID!) {
    wpgraphql {
      posts(where: { author: $databaseId }) {
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
      user(id: $authorId, idType: DATABASE_ID) {
        name
      }
    }
  }
`

const Author = props => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const [limit, setLimit] = useState(4)
  const [loadable, setLoadable] = useState(true)
  useEffect(() => {
    postsArr.length >= props.data.wpgraphql.posts.edges.length &&
      setLoadable(false)
  }, [limit])

  const postsArr = props.data.wpgraphql.posts.edges.slice(0, `${limit}`)
  const loadMore = () => {
    setLimit(limit + 2)
  }

  function engToAr(num) {
    return num.replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d])
  }

  function getTimeDiff(datetime) {
    var datetime =
      typeof datetime !== "undefined" ? datetime : "2014-01-01 01:02:03.123456"
    var datetime = new Date(datetime).getTime()
    var now = new Date().getTime()
    if (isNaN(datetime)) {
      return ""
    }
    console.log(datetime + " " + now)
    if (datetime < now) {
      var milisec_diff = now - datetime
    } else {
      var milisec_diff = datetime - now
    }
    var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24))
    var date_diff = new Date(milisec_diff)
    return Math.floor(days / 31) > 0
      ? engToAr(Math.floor(days / 31).toString()) + " مانگ بەر لە ئێستا "
      : +days > 0
      ? engToAr(days.toString()) + " رۆژ بەر لە ئێستا "
      : +date_diff.getHours() - 6 > 0
      ? engToAr((date_diff.getHours() - 6).toString()) +
        " کاتژمێر بەر لە ئێستا "
      : +date_diff.getMinutes() > 0
      ? engToAr(date_diff.getMinutes().toString()) + " خولەک بەر لە ئێستا "
      : +" ساتێک لەمەوبەر "
  }

  let app = ""
  if (state.view === "list") {
    app = postsArr.map(edge => {
      return (
        <div key={edge.node.slug}>
          <div className={blogStyles.listWrapper}>
            <img src={edge.node.featuredImage.node.sourceUrl} alt="" />
            {/* <p>{edge.node.categories.edges[0].node.name}</p> */}
            <div className={blogStyles.listContent}>
              <h3>{edge.node.title}</h3>
              <div className={blogStyles.listAuthor}>
                <p>{getTimeDiff(edge.node.date)}</p>
                <p>{edge.node.author.node.name}</p>
                {/* <img src={User}/> */}
              </div>
              <p dangerouslySetInnerHTML={{ __html: edge.node.excerpt }}></p>
              <Link to={`${edge.node.uri}`} className={blogStyles.read}>
                <img src={More} />
                <p>خوێندنەوە</p>
              </Link>
            </div>
          </div>
          <br />
          <br />
        </div>
      )
    })
  } else {
    app = postsArr.map((edge, key) => {
      return (
        <div key={key} className={blogStyles.wrapper}>
          <div className={blogStyles.cardContainer}>
            <Link
              to={`${edge.node.uri}`}
              style={{ textDecoration: "none", color: "#161616" }}
              key={edge.node.slug}
            >
              <div
                className={blogStyles.card}
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.53125) 0%, rgba(255,255,255,0) 100%),url(${edge.node.featuredImage.node.sourceUrl})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* <p>{edge.node.categories.edges[0].node.name}</p> */}
                <div className={blogStyles.cardCategory}>
                  {edge.node.categories.edges.map((edge, key) => (
                    <p key={key}>{edge.node.name}</p>
                  ))}
                </div>
                <h4>{edge.node.title}</h4>
                <div className={blogStyles.author}>
                  <p>{edge.node.author.node.name}</p>
                  <img src={User} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      )
    })
  }

  const gridBtnColor = {
    backgroundColor: state.view === "list" ? "#5F6C7B" : "#3DA9FC",
  }
  const listBtnColor = {
    backgroundColor: state.view === "grid" ? "#5F6C7B" : "#3DA9FC",
  }
  return (
    <Layout>
      <div className={blogStyles.gradWrapper}>
        <div className={blogStyles.btns}>
          <button
            style={gridBtnColor}
            onClick={() => dispatch({ type: "grid" })}
          >
            <img src={Grid} />
          </button>
          <button
            style={listBtnColor}
            onClick={() => dispatch({ type: "list" })}
          >
            <img src={List} />
          </button>
          <h3>هەموو بابەتەکانی {props.data.wpgraphql.user.name}</h3>
        </div>
        <div className={blogStyles.content}>{app}</div>
        <button
          className={blogStyles.loadMore}
          style={{ backgroundColor: !loadable && "#ccc" }}
          onClick={() => loadMore()}
          disabled={!loadable && true}
        >
          ئەنجامی زیاتر
        </button>
      </div>
    </Layout>
  )
}

export default Author
