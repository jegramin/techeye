import React, { Component } from "react"
import { navigate } from "gatsby"
import "./SearchBox.css"
let algoliasearch, autocomplete, client, index
if (typeof window !== "undefined") {
  algoliasearch = require("algoliasearch/lite")
  autocomplete = require("autocomplete.js")
  client = algoliasearch(GATSBY_ALGOLIA_APP_ID, GATSBY_ALGOLIA_SEARCH_API_KEY)
  index = client.initIndex(process.env.GATSBY_ALGOLIA_INDEX_NAME)
}
function newHitsSource(index, params) {
  return function doSearch(query, cb) {
    index
      .search(query, params)
      .then(function (res) {
        cb(res.hits, res)
      })
      .catch(function (err) {
        console.error(err)
        cb([])
      })
  }
}
class SearchBox extends Component {
  componentDidMount() {
    if (typeof window === "undefined") {
      return
    }
    autocomplete("#algolia-search-input", { hint: false }, [
      {
        source: newHitsSource(index, { hitsPerPage: 5 }),
        displayKey: "title",
        templates: {
          suggestion: function ({ _highlightResult: { title, description } }) {
            return `
                <p class="title">${title.value}</p>
                `
            // <p class="description">${description.value}</p>
          },
        },
      },
    ]).on("autocomplete:selected", function (
      event,
      suggestion,
      dataset,
      context
    ) {
      navigate(suggestion.path)
    })
    // autocomplete('#algolia-search-input', { hint: false }, [
    //   {
    //     source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
    //     displayKey: 'title',
    //     templates: {
    //       suggestion: function({ _highlightResult: { title, description } }) {
    //         return `
    //             <p class="title">${title.value}</p>
    //             <p class="description">${description.value}</p>
    //             `
    //       },
    //       footer:
    //         '<div class="branding">Powered by <img src="https://www.algolia.com/static_assets/images/press/downloads/algolia-logo-light.svg" /></div>',
    //     },
    //   },
    // ]).on('autocomplete:selected', function(
    //   event,
    //   suggestion,
    //   dataset,
    //   context
    // ) {
    //   navigate(suggestion.path)
    // })
  }
  render() {
    return (
      <div style={{ marginBottom: "1rem" }}>
        <input type="search" id="algolia-search-input" placeholder="Search" />
      </div>
    )
  }
}
export default SearchBox
