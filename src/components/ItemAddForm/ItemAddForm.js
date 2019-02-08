import React, { Component } from 'react';
//Styles
import './ItemAddForm.css';

export default class ItemAddForm extends Component {

	state = {
		label: ''
	}

	onSubmit = (e) => {
		e.preventDefault();
		const {label} = this.state;
		const labelLength = label.replace(/\s+/g, '').length;
		//If empty, exit
		if (labelLength === 0) return;

		this.props.onAdd(label);
		//Clear label state
		this.setState({
			label: ''
		});
	};

	onLabelChange = (e) => {
		this.setState({
			label: e.target.value
		});
	};

	render() {
		return (
			<form
				className="item-add-form d-flex"
				onSubmit={this.onSubmit}>
				<input type="text"
					className="form-control"
					onChange={this.onLabelChange}
					placeholder="What is new ?"
					value={this.state.label} />
				<button className="btn btn-primary">
					Add todo
				</button>
			</form>
		);
	}
}