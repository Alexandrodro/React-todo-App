import React, { Component } from 'react';
//Styles
import './ItemStatusFilter.css';

export default class ItemStatusFilter extends Component {

	buttons = [
		{ name: 'all', label: 'All' },
		{ name: 'important', label: 'Important' },
		{ name: 'active', label: 'Active' },
		{ name: 'done', label: 'Done' }
	];

	render() {

		const {filter, onFilterChange} = this.props;

		const buttons = this.buttons.map(({ name, label }) => {
			const isActive = filter === name;
			const clazz = isActive ? 'btn-info' : 'btn-outline-dark';

			return (
				<button type="button"
					className={`btn ${clazz}`}
					key={name}
					onClick={() => onFilterChange(name)}>
					{label}
				</button>
			);
		});

		return (
			<div className="btn-group col-12">
				{buttons}
			</div>
		);
	}
}