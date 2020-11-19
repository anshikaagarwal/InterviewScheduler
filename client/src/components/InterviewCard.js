import React, { Component } from "react";
import { DateRange } from "@material-ui/icons"
class InterviewCard extends Component {
  constructor() {
    super();
    this.state = {
      hover: false
    }
  }
  render() {
    console.log("data inside card:", this.props);
    return (
      <div style={{
        width: "100%",
        margin: "10px",
        boxShadow: this.state.hover ? "0 8px 16px 0 rgba(0,0,0,0.3)" : "0 8px 8px 0 rgba(0,0,0,0.2)",
        borderRadius: "5px",
        transition: "0.5"
      }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ backgroundColor: "green", width: "10px", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }} ></div>
          <div style={{ flex: 1, display: "flex" }}>
            <div style={{ flex: 5, display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 2, borderBottom: "1px solid #D5D8DC" }}>
                <div style={{ fontSize: "30px", fontWeight: "bold", color: "green", margin: '10px' }}>{this.props.data.date}</div>
                <div style={{ fontSize: "15px", fontWeight: "bold", color: "green", margin: '10px' }}>{this.props.data.name}</div>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", margin: "10px" }}>
                <div style={{ flex: 1, color: "grey" }}>Time: {this.props.data.starttime} - {this.props.data.endtime}</div>
                <div style={{ flex: 1, color: "grey" }}>Participants:{this.props.data.participants.length}</div>
              </div>
            </div>
            <div style={{ flex: 1, borderLeft: "1px solid #D5D8DC", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div><DateRange fontSize="large" /></div>
              <div style={{ fontWeight: "bold" }}>Edit</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InterviewCard;