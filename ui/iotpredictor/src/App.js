import React, { Component } from "react";
import { VictoryChart, VictoryTheme, VictoryArea, VictoryAxis } from "victory";
import "./App.css";

/* Getting the json data from the stream
const info = fetch("some data");

const data = info.then(data => data.json())

*/

const data = [
  { time: "12:05pm", temp: 20 },
  { time: "13:05pm", temp: 22 },
  { time: "14:05pm", temp: 23 },
  { time: "15:05pm", temp: 22 }
];

class App extends React.Component {
  render() {
    return (
      <div>
        {/* chart implementation*/}
        <div>
          <h1> IOT Predictor</h1>
        </div>
        <div>
          <svg style={{ height: 0 }}>
            <defs>
              <linearGradient id="myGradient">
                <stop offset="0%" stopColor="yellow" />
                <stop offset="25%" stopColor="yellow" />
                <stop offset="50%" stopColor="red" />
                <stop offset="75%" stopColor="gold" />
              </linearGradient>
            </defs>
          </svg>
          <VictoryChart>
            <VictoryArea
              style={{
                data: { fill: "url(#myGradient)" }
              }}
              data={data}
              x="time"
              y="temp"
            />
          </VictoryChart>
        </div>
        <h3> x= time, y= temperature(degrees celcius)</h3>
      </div>
    );
  }
}

export default App;
