import React from "react";

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      julyFourth: this.getCorrectFourth(),
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      fireworkMode: false
    };
  }

  checkLeapYear() {
    const now = new Date();
  }

  getCorrectFourth() {
    //this year or next year (no negative times!)
    const now = new Date();
    const thisYearsFourth = new Date(now.getFullYear(), 6, 4, 0, 0, 0, 0);

    if (now.getTime() > thisYearsFourth.getTime()) {
      return new Date(now.getFullYear() + 1, 6, 4, 0, 0, 0, 0); //next year's fourth
    } else {
      return new Date(now.getFullYear(), 6, 4, 0, 0, 0, 0); //this year's fourth
    }
  }

  getDaysUntilTheForth(dayToFind) {
    let julyFourthDayNumber = 0;
    let daysInFeb = 0;
    let daysInCurrentYear = 0;
    let daysInMonths = [];
    let dayToFindNum = 0;

    if (
      (this.state.julyFourth.getFullYear() % 4 === 0 &&
        this.state.julyFourth % 100 === 0) ||
      this.state.julyFourth % 400 === 0
    ) {
      julyFourthDayNumber = 186;
    } else {
      julyFourthDayNumber = 185;
    }

    if (
      (dayToFind.getFullYear() % 4 === 0 && dayToFind % 100 === 0) ||
      dayToFind % 400 === 0
    ) {
      daysInFeb = 28;
      daysInCurrentYear = 365;
    } else {
      daysInFeb = 29;
      daysInCurrentYear = 366;
    }
    daysInMonths = [31, daysInFeb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    for (let i = 0; i < dayToFind.getMonth(); i++) {
      dayToFindNum += daysInMonths[i];
    }

    for (let i = 0; i < dayToFind.getDate(); i++) {
      dayToFindNum += 1;
    }

    let ret = 0;

    if (this.state.julyFourth.getFullYear() === dayToFind.getFullYear()) {
      ret = julyFourthDayNumber - dayToFindNum - 1;
    } else {
      ret = daysInCurrentYear - dayToFindNum + julyFourthDayNumber;
    }

    if (this.state.fireworkMode) {
      if (dayToFind.getHours() > 19) {
        return ret - 1;
      } else {
        return ret + 1;
      }
    } else {
      return ret;
    }
  }

  getHourDiff(current) {
    if (current > 19 && current < 24) {
      //past 8pm

      return 23 - (current - 20);
    } else {
      //not past 8pm
      return 23 - current - 4;
    }

    //0 - 23
    //8pm is 19
    //past 8pm, hours set to 23,
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const now = new Date();
      if (this.state.fireworkMode) {
        this.setState(({ milliseconds }) => ({
          milliseconds: 1000 - now.getMilliseconds(),
          days: this.getDaysUntilTheForth(now),
          //hours: now.getHours() === 0 ? 0 : 23 - now.getHours(),
          hours: now.getHours() === 0 ? 0 : this.getHourDiff(now.getHours()),
          minutes: 59 - now.getMinutes(),
          seconds: now.getSeconds() === 0 ? 0 : 60 - now.getSeconds()
        }));
      } else {
        this.setState(({ milliseconds }) => ({
          milliseconds: 1000 - now.getMilliseconds(),
          days: this.getDaysUntilTheForth(now),
          hours: now.getHours() === 0 ? 0 : 23 - now.getHours(),
          //hours: now.getHours() === 0 ? 0 : this.getHourDiff(now.getHours()),
          minutes: 59 - now.getMinutes(),
          seconds: now.getSeconds() === 0 ? 0 : 60 - now.getSeconds()
        }));
      }
    }, 1);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  toggleMode() {
    this.setState({
      fireworkMode: !this.state.fireworkMode
    });
    console.log(this.state.fireworkMode);
  }

  render() {
    return (
      <>
        <center>
          <h1>4th of July Countdown</h1>
          <table style={{ textAlign: "center" }}>
            <tr>
              <td style={{ width: "10%" }}>
                <div>
                  <h2>{this.state.days}</h2>
                </div>
              </td>
              <td style={{ width: "10%" }}>
                <div>
                  <h2>{this.state.hours}</h2>
                </div>
              </td>
              <td style={{ width: "10%" }}>
                <div>
                  <h2>{this.state.minutes}</h2>
                </div>
              </td>
              <td style={{ width: "10%" }}>
                <div>
                  <h2>{this.state.seconds}</h2>
                </div>
              </td>
              <td style={{ width: "10%" }}>
                <div>
                  <h2>{this.state.milliseconds}</h2>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h2>Days</h2>
              </td>
              <td>
                <h2>Hours</h2>
              </td>
              <td>
                <h2>Minutes</h2>
              </td>
              <td>
                <h2>Seconds</h2>
              </td>
              <td>
                <h2>Milliseconds</h2>
              </td>
            </tr>
          </table>
          <br />
          <input
            type="checkbox"
            id="8pm"
            value={this.state.fireworkMode}
            onClick={e => this.toggleMode()}
          />
          <label for="8pm">
            {" "}
            <b>Countdown to 8PM Fireworks</b>
          </label>
          <br />
        </center>
      </>
    );
  }
}
export default Countdown;
