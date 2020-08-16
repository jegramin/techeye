import React, { useRef } from "react"
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
import Magnifier from "../../assets/search.svg"
import Modal from "./modal"
import Search from "./SearchBox"

const Header = () => {
  const modalRef = useRef()

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const openModal = () => {
    modalRef.current.openModal()
  }
  const closeModal = () => {
    modalRef.current.closeModal()
  }

  function slidSidebar() {
    const sidebar = document.getElementById("sidebarWrapper")
    sidebar.classList.toggle(sidbarStyles.sidebarActive)
  }

  return (
    <header className={headerStyles.header}>
      <Modal
        ref={modalRef}
        wrapper={{
          marginLeft: 0,
          marginRight: 0,
          marginTop: 130,
          position: "fixed",
          width: "48%",
          zIndex: 20,
          transform: "translate(-9%, 165px)",
        }}
      >
        {/* {subMenu && <h3>{subMenu.label}</h3>} */}
        <Search />
      </Modal>
      <div className={headerStyles.titlebar}>
        <div className={headerStyles.ticker}>
          <Ticker />
          <Clock className={headerStyles.clock} />
        </div>
        <div onClick={() => slidSidebar()} className={headerStyles.burger}>
          <img src={Burger} />
          <Link to="/">
            <img src={Logo} />
            <p>TECH EYE</p>
          </Link>
        </div>
      </div>

      <div className={headerStyles.iconsWrapper}>
        <div className={headerStyles.logoContainer} onClick={() => openModal()}>
          <Magnifier />
        </div>
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
