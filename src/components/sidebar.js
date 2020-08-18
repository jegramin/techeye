import React, { useRef, useState, useEffect } from "react"
import { Link, graphql, useStaticQuery, navigate } from "gatsby"
import { node } from "prop-types"
import sidbarStyles from "./sidebar.module.css"
import Logo from "../images/sidebarLogo.svg"
import Close from "../images/closeSidebar.svg"
import Modal from "./modal"
import Search from "./SearchBox"
import headerStyles from "./header.module.css"
import InstagramLogo from "../images/icon-instagram.svg"
import YoutubeLogo from "../images/icon-youtube.svg"
import TwitterLogo from "../images/icon-twitter.svg"
import FacebookLogo from "../images/icon-facebook.svg"

const Sidebar = () => {
  const [subMenu, setSubMenu] = useState()
  const [hasModal, setHasModal] = useState(false)
  const [highlighted, setHighlighted] = useState(false)
  const modalRef = useRef()

  useEffect(() => {
    subMenu && subMenu.childItems.edges[0]
      ? setHasModal(true)
      : setHasModal(false)
  }, [subMenu])

  const openModal = () => {
    modalRef.current.openModal()
    setHighlighted(true)
  }
  const closeModal = () => {
    modalRef.current.closeModal()
    setHighlighted(false)
  }
  const deleteSubMenu = () => {
    setHasModal(false)
    setSubMenu()
  }

  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        menuItems(where: { location: EXPANDED, parentId: "0" }) {
          edges {
            node {
              title
              label
              path
              cssClasses
              childItems {
                edges {
                  node {
                    label
                    title
                    childItems {
                      edges {
                        node {
                          label
                          title
                          path
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  function hideSidebar() {
    const sidebar = document.getElementById("sidebarWrapper")
    sidebar.classList.toggle(sidbarStyles.sidebarActive)
    closeModal()
  }

  return (
    <div className={sidbarStyles.grandWrapper}>
      <Modal ref={modalRef} deleteSubMenu={() => deleteSubMenu()}>
        {subMenu && <h3>{subMenu.label}</h3>}
        {subMenu && subMenu.search}
        {subMenu && (
          <div className={sidbarStyles.listContainer}>
            {subMenu.childItems.edges.map((edge, key) => {
              return (
                <ul
                  aria-label={edge.node.label}
                  style={{ listStyleType: "none" }}
                  key={key}
                >
                  {edge.node.childItems.edges.map((edge, key) => {
                    return (
                      <Link to={`${edge.node.path}`} key={key}>
                        <li className={sidbarStyles.subMenuLabels}>
                          {edge.node.label}
                        </li>
                      </Link>
                    )
                  })}
                </ul>
              )
            })}
          </div>
        )}
      </Modal>

      <div id="sidebarWrapper" className={sidbarStyles.sidebarWrapper}>
        <div className={sidbarStyles.header}>
          <img
            src={Close}
            onClick={hideSidebar}
            className={sidbarStyles.hideSidebar}
          />
          <Link to="/">
            <img src={Logo} alt="" />
            <p>TECH EYE</p>
          </Link>
        </div>
        <div className={sidbarStyles.mobileView}>
          <Search />
        </div>

        {data.wpgraphql.menuItems.edges.map((edge, key) => {
          return (
            <div
              key={key}
              style={
                subMenu &&
                subMenu.label === edge.node.label &&
                highlighted &&
                hasModal
                  ? {
                      background: "rgb(218, 218, 218)",
                      background: `linear-gradient(
                      90deg,
                      rgba(215, 215, 215, 0.4) 0%,
                      rgba(255, 255, 255, 0) 68%`,
                    }
                  : {}
              }
              className={sidbarStyles.categories}
              onMouseEnter={() => {
                edge.node.childItems.edges[0] && setSubMenu(edge.node)
                // !(subMenu && subMenu.label === edge.node.label && hasModal) &&
                //   closeModal()
                // !edge.node.childItems.edges[0] && setHasModal(false)
                // setHighlighted(false)
              }}
              onMouseLeave={() => {
                // setHighlighted(true)
              }}
            >
              {/* <Link to={`/category/${edge.node.slug}`} className={sidbarStyles.link}> */}
              <div
                className={sidbarStyles.category}
                onClick={() => {
                  edge.node.childItems.edges[0]
                    ? openModal()
                    : navigate(edge.node.path)
                  edge.node.childItems.edges[0] && setHighlighted(true)
                }}
                // onClick={() => {
                //   setSubMenu(edge.node)
                //   !(
                //     subMenu &&
                //     subMenu.label === edge.node.label &&
                //     subMenu &&
                //     subMenu.childItems.edges[0]
                //   ) && navigate("/")
                // }}
              >
                <div
                  className={sidbarStyles[edge.node.cssClasses]}
                  style={
                    subMenu &&
                    subMenu.label === edge.node.label &&
                    highlighted &&
                    hasModal
                      ? { backgroundColor: "#3DA9FC" }
                      : {}
                  }
                ></div>
                <p
                  onClick={() => {
                    subMenu &&
                    subMenu.label === edge.node.label &&
                    subMenu &&
                    subMenu.childItems.edges[0]
                      ? openModal()
                      : hideSidebar()
                  }}
                >
                  {edge.node.label}
                </p>
              </div>
              {/* </Link> */}
            </div>
          )
        })}

        <div className={sidbarStyles.iconsWrapper}>
          <div className={sidbarStyles.logoContainer}>
            <img src={InstagramLogo} alt="instagram" />
          </div>
          <div className={sidbarStyles.logoContainer}>
            <img src={YoutubeLogo} alt="instagram" />
          </div>
          <div className={sidbarStyles.logoContainer}>
            <img src={TwitterLogo} alt="instagram" />
          </div>
          <div className={sidbarStyles.logoContainer}>
            <img src={FacebookLogo} alt="instagram" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
