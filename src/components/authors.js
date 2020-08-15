import React from 'react'
import {Link, graphql, useStaticQuery} from 'gatsby'
import { node } from 'prop-types'

const Authors = () => {
    const data = useStaticQuery(graphql`
        query {
            wpgraphql {
                users {
                    edges {
                        node {
                            name
                        }
                    }
                }
            }
        }
    `)
    
    return (
        <div>
            {
                data.wpgraphql.users.edges.map((edge, key) => {
                    return (
                        <ul key={key}>
                            <Link to={`/category/${edge.node.slug}`}>
                                <li>{edge.node.name}</li>
                            </Link>
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default Authors