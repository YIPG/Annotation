import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { App } from "./Annotation/app"
import { Upload } from "./Upload/upload"
import { Admin } from "./Admin/admin"

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Upload} />
        <Route path="/admin" component={Admin} />
        <Route path="/tasks/:id" component={App} />
      </div>
    </Router>
  )
}
