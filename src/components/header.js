import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import headerStyles from "./header.module.css"
import sidbarStyles from "./sidebar.module.css"
import Ticker from "./ticker"
import InstagramLogo from "../../assets/icon-instagram.svg"
import YoutubeLogo from "../../assets/icon-youtube.svg"
import TwitterLogo from "../../assets/icon-twitter.svg"
import FacebookLogo from "../../assets/icon-facebook.svg"
import Burger from "../images/burger.svg"
import Logo from "../images/sidebarLogo.svg"
import Clock from "../../assets/clock.svg"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  function slidSidebar() {
    const sidebar = document.getElementById("sidebarWrapper")
    sidebar.classList.toggle(sidbarStyles.sidebarActive)
  }

  return (
    <header className={headerStyles.header}>
      <Clock />
      <Ticker />
      <div onClick={() => slidSidebar()} className={headerStyles.burger}>
        <img src={Burger} />
        <Link to="/">
          <img src={Logo} />
          <p>TECH EYE</p>
        </Link>
      </div>
      <div className={headerStyles.iconsWrapper}>
        <div className={headerStyles.logoContainer}>
          <InstagramLogo />
        </div>
        <div className={headerStyles.logoContainer}>
          <YoutubeLogo />
        </div>
        <div className={headerStyles.logoContainer}>
          <TwitterLogo />
        </div>
        <div className={headerStyles.logoContainer}>
          <FacebookLogo />
        </div>
      </div>

      {/* <nav>
        <button className={headerStyles.navBtn}>پەیوەندی</button>
        <button className={headerStyles.navBtn}>دەربارە</button> */}
      {/* <ul className={headerStyles.navList}>
          <li>
            <Link
              className={headerStyles.navItem}
              activeClassName={headerStyles.activeNavItem}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={headerStyles.navItem}
              activeClassName={headerStyles.activeNavItem}
              to="/blogs"
            >
              Blogs
            </Link>
          </li>
        </ul> */}
      {/* </nav> */}
    </header>
  )
}

export default Header
