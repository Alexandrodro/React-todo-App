import React, { Component } from 'react';
//Components
import AppHeader from '../AppHeader';
import SearchPannel from '../SearchPannel';
import ItemStatusFilter from '../ItemStatusFilter/';
import TodoList from '../TodoList';
import ItemAddForm from '../ItemAddForm';
//Styles
import './App.css';

export default class App extends Component {

	maxId = 100;

	state = {
		todoData: [
			this.createTodoItem('Always be happy 😉 !', true)
		],
		term: '',
		filter: 'all' //all, active, done
	};
	
	createTodoItem(label, important = false) {
		return {
			label: label,
			important: important,
			done: false,
			id: this.maxId++
		}
	}
	// Find index todo item
	findIndexItem(id, todoData) {
		return todoData.findIndex((el) => el.id === id);
	}
	// Delete todo item for TodoListItem
	onDeleteItem = (id) => {
		this.setState(({ todoData }) => {
			const idx = this.findIndexItem(id, todoData)

			const newArray = [
				...todoData.slice(0, idx),
				...todoData.slice(idx + 1)
			];

			return {
				todoData: newArray
			}
		});
	};
	// Add todo item for TodoListItem
	onAddItem = (text) => {
		this.setState(({ todoData }) => {
			const newArray = [
			this.createTodoItem(text),
				...todoData
			];

			return {
				todoData: newArray
			}
		});
	};

	toggleProperty = (id, propName) => {
		this.setState(({ todoData }) => {
			// const idx = this.findIndexItem(id, arr);
			const idx = todoData.findIndex((el) => el.id === id);
			//Update done state in idx object
			const oldItem = todoData[idx];
			const newItem = { ...oldItem, [propName]: !oldItem[propName] };
			// Construct new todoData array
			const newArray = [
				...todoData.slice(0, idx),
				newItem,
				...todoData.slice(idx + 1)
			];
			return {
				todoData: newArray
			}
		});
	}
	// Toogle for changing done state of TodoListItem
	onToggleDone = (id) => {
		this.toggleProperty(id, 'done');
	};
	// Toogle for changing important state of TodoListItem
	onToggleImportant = (id) => {
		this.toggleProperty(id, 'important');
	};

	onSearchChange = (term) => {
		this.setState({ term });
	}

	onFilterChange = (filter) => {
		this.setState({ filter });
	}

	searchItems(items, term) {
		if (term.length === 0) return items;

		return items.filter((item) => {
			return ~item.label
				.toLowerCase()
				.indexOf(term.toLowerCase());
		});
	}

	filterItems(items, filter) {
		switch (filter) {
			case 'all':
				return items;
			case 'important':
				return items.filter((item) => item.important);
			case 'active':
				return items.filter((item) => !item.done);
			case 'done':
				return items.filter((item) => item.done);
			default:
				return items;
		}
	}

	render() {
		const { todoData, term, filter } = this.state;

		const visibleItems = this.filterItems(this.searchItems(todoData, term), filter);
		//Quantity dones for AppHeader
		const doneCount = todoData.filter((el) => {
			return el.done;
		}).length;
		const todoCount = todoData.length - doneCount;

		return (
			<div className="todo-app">
				<AppHeader
					done={doneCount}
					todo={todoCount}
				/>
				<div className="search-panel d-flex row">
					<SearchPannel
						onSearchChange={this.onSearchChange} />
					<ItemStatusFilter
						filter={filter}
						onFilterChange={this.onFilterChange} />
				</div>
				<TodoList
					todos={visibleItems}
					onDeleted={this.onDeleteItem}
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone} />
				<ItemAddForm
					onAdd={this.onAddItem} />
			</div>
		);
	};

};