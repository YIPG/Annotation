import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Annotation } from "./Annotation"
import { Upload } from "./Upload"
import { Admin } from "./Admin"
import { LP } from "./LandingPage"
import { Header } from "./util/header"

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={LP} />
        <Route exact path="/upload" component={Upload} />
        <Route path="/admin" component={Admin} />
        <Route path="/tasks/:id" component={Annotation} />
      </div>
    </Router>
  )
}
