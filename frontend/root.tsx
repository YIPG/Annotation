import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { App } from "./app"
import { Upload } from "./upload"

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Upload} />
        <Route path="/tasks/:id" component={App} />
      </div>
    </Router>
  )
}
