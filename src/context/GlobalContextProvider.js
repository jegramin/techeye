import React from "react"

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initialState = {
  view: "grid",
}

function reducer(state, action) {
  switch (action.type) {
    case "grid": {
      return {
        ...state,
        view: state.view = "grid"
      }
    }
    case "list": {
      return {
        ...state,
        view: state.view = "list"
      }
    }
    
    default:
      throw new Error("Bad Action Type")
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider