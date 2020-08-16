import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Logo from "../images/LOGO.svg"
import GooglePlayStore from "../../assets/GooglePlay.svg"
import AppStore from "../../assets/AppStore.svg"
import footerStyles from "./footer.module.css"
import InstagramLogo from "../../assets/icon-instagram.svg"
import YoutubeLogo from "../../assets/icon-youtube.svg"
import TwitterLogo from "../../assets/icon-twitter.svg"
import FacebookLogo from "../../assets/icon-facebook.svg"
import Warn from "../images/warn.svg"
const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  return (
    <footer className={footerStyles.footerWrapper}>
      <div className={footerStyles.content}>
        <div>
          <img src={Logo} alt="logo" className={footerStyles.logo} />
          <p>تەکنەلۆژیا جیهانی ئێمەیە</p>
        </div>
        <div>
          <p>
            <b>لینکە خێراکان</b>
          </p>
          <p>سۆشیاڵ میدیاکانمان</p>
          <p>مەرجەکانی کارکردنمان</p>
          <p>ئاگاداریمان لە تایبەتمەندی</p>
          <p>لە کوێ بماندۆزیتەوە؟</p>
        </div>
        <div>
          <p>
            <b>یارمەتی</b>
          </p>
          <p>یارمەتی وێبسایت</p>
          <p>پرسیارە دووبارە بووەوەکان</p>
          <p>پەیوەندیمان پێوە بکە</p>
          <p>مەرجەکانی کووکیس</p>
        </div>
        <div className={footerStyles.mobileApp}>
          <GooglePlayStore />
          <AppStore />
          <div className={footerStyles.iconsWrapper}>
            <div className={footerStyles.logoContainer}>
              <InstagramLogo />
            </div>
            <div className={footerStyles.logoContainer}>
              <YoutubeLogo />
            </div>
            <div className={footerStyles.logoContainer}>
              <TwitterLogo />
            </div>
            <div className={footerStyles.logoContainer}>
              <FacebookLogo />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
