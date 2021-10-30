import React, { Component } from "react";
import "./styles/Ballot.css";

class Ballot extends Component {
  constructor(props) {
    super(props);

    const { election } = this.props;

    this.state = {
      election: election,
      totalPreferences: election.candidates.length,
      tracker: new Array(election.candidates.length).fill(null),
    };

    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(e) {
    console.log(e.target.value);
    console.log(e.target.name);
    const idx = Number(e.target.name) - 1;
    const pref = Number(e.target.value);

    const { tracker } = this.state;

    // if (pref === totalPreferences + 1) tracker[idx] = null;
    tracker[idx] = pref;
    console.log(tracker);
    this.setState({
      tracker: tracker,
    });
  }

  renderTableHeader() {
    return (
      <>
        <th key={1}>ID</th>
        <th key={2}>Name</th>
      </>
    );
  }

  renderTableData() {
    const { election, totalPreferences } = this.state;

    return election.candidates.map((candidate, index) => {
      const { user_name } = candidate; //destructuring
      var cols = [];
      for (let i = 1; i <= totalPreferences; i++) {
        cols.push(
          <td>
            <input type="radio" key={i * 100} value={i} name={index + 1} />
            {i}
          </td>
        );
      }

      /*cols.push(
          <td>
            <input type="radio" value={totalPreferences + 1} name={index + 1} />{" "}
            clear
          </td>
        );*/
      console.log(index + 1);
      return (
        <tr key={index + 1}>
          <td>{index + 1}</td>
          <td>{user_name}</td>
          {cols}
        </tr>
      );
    });
  }

  handleSubmit() {
    const { totalPreferences, tracker } = this.state;

    var val = new Array(tracker.length).fill(null);
    for (let i = 0; i < val.length; i++) {
      if (tracker[i] !== null) val[tracker[i] - 1] += 1;
    }

    for (let i = 0; i < totalPreferences; i++) {
      if (val[i] !== 1) {
        console.log("Submission Failed");
        return;
      }
    }

    console.log("Submission Accepted");
  }

  render() {
    const { election } = this.state;

    return (
      <div onChange={this.onChangeValue}>
        <h1 id="title">Ranked Choice Ballot - {election.name} </h1>
        <table id="candidates">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
        <div className="submission">
          <button className="submit" onClick={() => this.handleSubmit()}>
            {"SUBMIT"}
          </button>
        </div>
      </div>
    );
  }
}

export default Ballot;
