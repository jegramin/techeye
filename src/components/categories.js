import React from 'react'
import {Link, graphql, useStaticQuery} from 'gatsby'
import { node } from 'prop-types'

const Categories = () => {
    const data = useStaticQuery(graphql`
        query {
            wpgraphql {
                categories(where: {parent: 0}) {
                    edges {
                        node {
                            name
                            slug
                            children {
                                edges {
                                    node {
                                        name
                                        slug
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `)
    
    return (
        <div>
            {
                data.wpgraphql.categories.edges.map((edge, key) => {
                    return (
                        <ul key={key}>
                            <Link to={`/category/${edge.node.slug}`}>
                                <li>{edge.node.name}
                                    <ul>
                                        {edge.node.children.edges.filter(edge => edge.node !== null).map((edge, key) => {
                                            return(
                                                <Link to={`/category/${edge.node.slug}`} key={key}>
                                                    <li>{edge.node.name}</li>
                                                </Link>
                                            )
                                        })}
                                    </ul>
                                </li>
                            </Link>
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default Categories