import React from "react"
import { Link } from "gatsby"
import Slideshow from "../components/slideShow"
import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import News from "../components/news"
import Learning from "../components/learning"
import indexStyles from "../components/layout.module.css"
import Tag from "../components/tag"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Slideshow />
    <News />
    <Learning />
    <Tag />
    {/* <div className={indexStyles.advertizings}>
      <p>لە ماڵپەڕی تێك ئای ڕێكلامەکانت بکەبۆ گەیشتن بە ئامانجە ڕاستەکان</p>
      <button>با قسە بکەین</button>
      <button>زانیاری زیاتر</button>
    </div> */}
  </Layout>
)

export default IndexPage
