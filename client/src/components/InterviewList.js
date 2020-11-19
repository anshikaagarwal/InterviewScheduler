import React, { Component } from "react";
import { Add } from '@material-ui/icons';
import InterviewCard from "./InterviewCard"
import { Link } from "react-router-dom"
import axios from "axios"

class InterviewList extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  async componentDidMount() {
    console.log("mounted")
    var url = 'https://cors-anywhere.herokuapp.com/http://localhost:5000/api/interview';
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(res => res.json())
      .then(response => console.log('Success:', response))
      .catch(error => console.error('Error:', error));
  }
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", }}>

        <div>Upcoming Interviews</div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "40%",
          padding: "10px 0px",
          // border: "2px solid black"
        }}>
          <InterviewCard />
          <InterviewCard />
          <InterviewCard />
          <InterviewCard />
          <InterviewCard />
          <InterviewCard />
          <InterviewCard />
        </div>
        <Link to="/interview/anshika/new">
          <div style={{ position: "fixed", bottom: "0px", right: "0px", margin: "2%", backgroundColor: "red", borderRadius: "50%", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 2px 8px 0 rgba(0,0,0,0.3)" }}>
            <Add style={{ fontSize: '40px', color: "white" }} />
          </div>
        </Link>

      </div>
    )
  }
}

export default InterviewList