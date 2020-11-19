import React, { Component } from "react";

class InterviewCard extends Component {
  constructor() {
    super();
    this.state = {
      hover: false
    }
  }
  render() {
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
        <div style={{ height: "100px", display: "flex", flexWrap: "wrap" }}>
          <div style={{ backgroundColor: "blue", width: "10px", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }} ></div>
          <div style={{ flex: 1, display: "flex" }}>
            <div style={{ flex: 5, display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 2, borderBottom: "1px solid grey" }}>Date</div>
              <div style={{ flex: 1 }}>Time and Participants</div>
            </div>
            <div style={{ flex: 1, borderLeft: "1px solid grey" }}>Edit</div>
          </div>
        </div>
      </div>
    )
  }
}

export default InterviewCard;