import React, { Component } from "react";
import axiosInstance from "../axios";

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
    const idx = Number(e.target.name) - 1;
    const pref = Number(e.target.value);

    const { tracker } = this.state;

    // if (pref === totalPreferences + 1) tracker[idx] = null;
    tracker[idx] = pref;

    this.setState({
      tracker: tracker,
    });
  }

  renderTableHeader() {
    const { totalPreferences } = this.state;
    var rows = [];
    rows.push(<th>ID</th>);
    rows.push(<th>Name</th>);
    for (var i = 1; i <= totalPreferences; i++) {
      rows.push(<th>Preference {i}</th>);
    }
    return <tr> {rows} </tr>;
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
          </td>
        );
      }

      /*cols.push(
          <td>
            <input type="radio" value={totalPreferences + 1} name={index + 1} />{" "}
            clear
          </td>
        );*/

      return (
        <tr key={index + 1}>
          <td>{index + 1}</td>
          <td>{user_name}</td>
          {cols}
        </tr>
      );
    });
  }

  validateBallot() {
    const { totalPreferences, tracker } = this.state;

    var val = new Array(tracker.length).fill(null);
    for (let i = 0; i < val.length; i++) {
      if (tracker[i] !== null) val[tracker[i] - 1] += 1;
    }

    for (let i = 0; i < totalPreferences; i++) {
      if (val[i] !== 1) {
        return false;
      }
    }

    return true;
  }

  handleSubmit() {
    const { tracker, election } = this.state;

    var preferences = new Array(tracker.length).fill(null);

    for (let i = 0; i < preferences.length; i++) {
      preferences[i] = election.candidates[tracker[i] - 1].id;
    }

    axiosInstance
      .post("/election/vote/", {
        election: election.id,
        vote_details: {
          preferences: preferences,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div onChange={this.onChangeValue} className="mt-4">
        <h1 className="text-center display-4">Ranked Choice Ballot</h1>
        <p className="text-center lead">
          (Click on the radio buttons below according to your preference of
          candidates)
        </p>
        <table className="table table-striped table-bordered text-center">
          <thead className="thead-dark">{this.renderTableHeader()}</thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
        <div className="text-center">
          <button
            className="btn btn-dark"
            type="submit"
            onClick={() => this.handleSubmit()}
            disabled={!this.validateBallot()}
          >
            {"SUBMIT"}
          </button>
        </div>
      </div>
    );
  }
}

export default Ballot;
