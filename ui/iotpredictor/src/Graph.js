import React from "react";
import PropTypes from "prop-types";
import { VictoryChart, VictoryTheme, VictoryArea, VictoryAxis } from "victory";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

/*

<VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />



        const xAmount = 276

        tickValues={}

*/

class Graph extends React.Component {
	state = {
		data: null
	};
	componentDidMount() {
		const endpoint = fetch(
			"http://96101388.ngrok.io/raw/type/temp/2018-04-27T00:00:00/2018-04-27T23:00:00"
		);

		endpoint
			.then(data => data.json())
			.then(data =>
				data.map(d => ({
					...d,
					timestamp: format(d.timestamp, "h:mm")
				}))
			)
			.then(data => {
				this.setState({ data });
			})
			.catch(err => {
				alert(err);
			}); //end endpoint
	} //end componenetDidMount
	render() {
		if (!this.state.data) return null;

		return (
			<div>
				<div className="table">
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
							data={this.state.data}
							x="timestamp"
							y="value"
						/>
					</VictoryChart>
				</div>
				<h3>x= time, y= temperature(degrees celcius)</h3>
			</div>
		);
	}
}

export default Graph;
