import React from 'react'
import SearchBox from './SearchBox'
import Header from './header'
import Footer from './footer'
import layoutStyles from './layout.module.css'
import Sidbar from './sidebar'

const Layout = (props) => {
    return (
        <div className={layoutStyles.container}>
            <Header />
            <Sidbar />
            <div className={layoutStyles.content}>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout