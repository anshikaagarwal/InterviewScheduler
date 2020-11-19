import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import { InterviewList, InterviewForm } from "./components"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={InterviewList} />
        <Route path="/:id" component={InterviewForm} />
      </BrowserRouter>
    )
  }
}

export default App;
