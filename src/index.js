import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tableresults from './Tableresults.js'


// Array for target volumes in dB SPL
const volumes = {
	safe_volume: 85,
	moderate_volume: 100,
	fairlyloud_volume: 110,
	veryloud_volume: 115,
	painful_volume: 120
};
const { safe_volume, moderate_volume, 
		fairlyloud_volume, veryloud_volume, 
		painful_volume } 
		= volumes;

// Base power calculator function
function powerCalculation(sensitivity, volume_level) {
	console.log(sensitivity, volume_level);
	return 10 ** ((volume_level - sensitivity) / 10)
}

// Base voltage calculator
function voltageCalculation(power, impedance) {
	return Math.sqrt(power / 1000 * impedance)
}

// Base current calculator
function currentCalculation(power, impedance) {
	return Math.sqrt(power / (1000 * impedance)) * 1000
}


class InputForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			sensitivity: '', 
			impedance: '',
			errormessageone: '',
			errormessagetwo: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		//let name = event.target.name;
		//let value = event.target.value;

		// Logging purposes
		console.log(event)
		console.log(event.target.name)
		console.log(event.target.value)

		let {value, name} = event.target;
		let {errone, errtwo} = '';

		// Displays an error on the side of the input box
		// when the entry is non-numerical
		// *** Can use ? operator when optimizing the IF statements
		if(name === "impedance") {
			if(value !== "" && !Number(value)) {
				// Displays error for Impedance
				errone = "  Impedance must be a number";
			}
		}
		if(name === "sensitivity") {
			if(value !== "" && !Number(value)) {
				// Displays error for Sensitivity
				errtwo = "  Sensitivity must be a number";
			}
		}	

		this.setState({
			[name]: value,
			errormessageone: errone,
			errormessagetwo: errtwo
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		// Logging purposes
		const data = this.state;
		console.log(data)

		// Assigning the local variables to input
		let impedance = this.state.impedance;
		let sensitivity = this.state.sensitivity;

		// Checks if entries submitted are not numerical
		// Returns an alert message
		// Can use ? operator later for optimization
		if(impedance !== '' && sensitivity !== '' && 
			!Number(impedance) && !Number(sensitivity)) {
			// Both entries are non-numbers
			alert("Impedance and Sensitivity entries are not numbers");
		}
			else if(impedance !== '' && !Number(impedance)) {
				// Impedance is not a number
				alert("Impedance entry is not a number");
			}
			else if(sensitivity !== '' && !Number(sensitivity)) {
				// Sensitivity is not a number
				alert("Sensitivity entry is not a number");
			}
			else if(impedance === '' && sensitivity === '') {
				// Empty field
				return;
			}
	
		this.setState(state => ({
			impedance: this.state.impedance,
			sensitivity: this.state.sensitivity,
			power_safe: powerCalculation(sensitivity, volumes.safe_volume).toPrecision(2),
			power_moderate: powerCalculation(sensitivity, volumes.moderate_volume).toPrecision(3),
			power_fairlyloud: powerCalculation(sensitivity, volumes.fairlyloud_volume).toPrecision(4),
			power_veryloud: powerCalculation(sensitivity, volumes.veryloud_volume).toPrecision(5),
			power_painful: powerCalculation(sensitivity, volumes.painful_volume).toPrecision(5),
			voltage_safe: voltageCalculation(powerCalculation(sensitivity,volumes.safe_volume), impedance).toPrecision(2),
			voltage_moderate: voltageCalculation(powerCalculation(sensitivity,volumes.moderate_volume), impedance).toPrecision(3),
			voltage_fairlyloud: voltageCalculation(powerCalculation(sensitivity,volumes.fairlyloud_volume), impedance).toPrecision(4),
			voltage_veryloud: voltageCalculation(powerCalculation(sensitivity,volumes.veryloud_volume), impedance).toPrecision(4),
			voltage_painful: voltageCalculation(powerCalculation(sensitivity,volumes.painful_volume), impedance).toPrecision(4),
			current_safe: currentCalculation(powerCalculation(sensitivity,volumes.safe_volume), impedance).toPrecision(3),
			current_moderate: currentCalculation(powerCalculation(sensitivity,volumes.moderate_volume), impedance).toPrecision(4),
			current_fairlyloud: currentCalculation(powerCalculation(sensitivity,volumes.fairlyloud_volume), impedance).toPrecision(4),
			current_veryloud: currentCalculation(powerCalculation(sensitivity,volumes.veryloud_volume), impedance).toPrecision(4),
			current_painful: currentCalculation(powerCalculation(sensitivity,volumes.painful_volume), impedance).toPrecision(4),
		}));
	}

	render(){
		return (
			<div className="initialpage">
			<form onSubmit={this.handleSubmit}>
			  <h1>Thanks for coming to the headphone amp calculator page!</h1><br />
			  <p> Impedance (Ohms): </p>
			  <input
			  	name="impedance"
			    className="impedance"
			    type="text"
			    placeholder="Impedance"
			    onChange={this.handleChange}
   			    value={this.state.impedance}
			  />
			  {this.state.errormessageone}
			  <p> Sensitivity (db SPL / mW): </p>
			  <input
			  	name="sensitivity"
			    className="sensitivity"
			    type="text"
			    placeholder="Sensitivity"
			    onChange={this.handleChange}
			    value={this.state.sensitivity}
			  />
			  {this.state.errormessagetwo}
			  <br /> <br />
			  <button 
			    type="submit"
			    className="submit"
			    >Calculate
			  </button>
			  <br /><br />
			</form>
			  <div>
			    <Tableresults 
			    power_safe={this.state.power_safe} 
			    power_moderate={this.state.power_moderate}
			    power_fairlyloud={this.state.power_fairlyloud}
			    power_veryloud={this.state.power_veryloud}
			    power_painful={this.state.power_painful}
			    voltage_safe={this.state.voltage_safe}
			    voltage_moderate={this.state.voltage_moderate}
			    voltage_fairlyloud={this.state.voltage_fairlyloud}
			    voltage_veryloud={this.state.voltage_veryloud}
			    voltage_painful={this.state.voltage_painful}
			    current_safe={this.state.current_safe}
			    current_moderate={this.state.current_moderate}
			    current_fairlyloud={this.state.current_fairlyloud}
			    current_veryloud={this.state.current_veryloud}
			    current_painful={this.state.current_painful}
			    />
			  </div>
			</div>
		);
	}
}


ReactDOM.render(
	<InputForm />,
	document.getElementById('root')
);

// Printing out volumes array
// for(var index in volumes) {
//	document.write(index + " : " + volumes[index] + " dB SPL" + "<br />");
//}

// Printing out calculated power calculations from the volumes array
// document.write( "<br />")		// just putting space between
// for(var index in volumes) {
//	document.write( powerCalculation(sensitivity, volumes[index]).toPrecision(3) + " mW" + "<br />" );
//}