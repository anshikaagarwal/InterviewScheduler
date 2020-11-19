import React, { Component } from "react";
import { TextField, Select, MenuItem, ListItemText, Input, Checkbox, InputLabel, FormControl, Button } from "@material-ui/core"

class InterviewForm extends Component {
  state = {
    selected: [],
    date: ""
  }
  handleChange = (event) => {
    this.setState({ selected: event.target.value })
  }
  candidtates = [
    { name: "Anshika", email: "anshika@gmail.com" },
    { name: "Paridhi", email: "paridhi@gmail.com" },
    { name: "Ritika", email: "ritika@gmail.com" },
    { name: "Manoj", email: "manoj@gmail.com" },
    { name: "Ram", email: "ram@gmail.com" },

  ]

  getCurrentDate = () => {
    const d = new Date();
    const currentDate = d.getYear() + 1900 + '-' + (("0" + (d.getMonth() + 1)).slice(-2)) + '-' + d.getDate();
    return currentDate;
  }

  render() {
    console.log(this.state.date)
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "70vh", }}>
        <div>Create New Interview+</div>
        <div style={{ display: "flex", flexDirection: "column", width: "40%", border: "2px solid grey", padding: "20px", borderRadius: "5px" }}>
          <TextField style={{ marginTop: "10px" }} id="outlined-basic" label="Interview Name" variant="outlined" />
          <TextField variant="outlined"
            display='block'
            margin="normal"
            id="date"
            label="Date"
            type="date"
            onKeyDown={(e) => e.preventDefault()}
            value={this.state.date}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: this.getCurrentDate() } }}
            onChange={(e) => this.setState({ date: e.target.value })}
          />
          <div style={{ display: "flex" }}>
            <TextField style={{ marginTop: "10px", flex: 1 }} id="outlined-basic" label="Start Time(HH::MM)" variant="outlined" />
            <TextField style={{ marginTop: "10px", flex: 1 }} id="outlined-basic" label="End Time(HH::MM)" variant="outlined" />
          </div>
          <FormControl style={{ marginTop: "10px" }}>
            <InputLabel id="demo-mutiple-checkbox-label">Select Participants</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={this.state.selected}
              onChange={this.handleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(',')}
              style={{ marginTop: "10px" }}
              placeholder="Select Participants"
            >
              {this.candidtates.map(({ name, email }) => (
                <MenuItem key={email} value={email}>
                  <Checkbox checked={this.state.selected.includes(email)} />
                  <ListItemText primary={name} secondary={email} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button style={{ marginTop: "10px" }} variant="contained" color="primary">Create</Button>
        </div>
      </div >
    )
  }
}

export default InterviewForm