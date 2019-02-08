import React from 'react';
//Components
import TodoListItem from '../TodoListItem';
//Styles
import './TodoList.css';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {

	const elements = todos.map((item) => {
		const { id, done, important, label } = item;

		let classNames = 'list-group-item';
		if (done) {
			classNames += ' done';
		}

		if (important) {
			classNames += ' important';
		}

		return (
			<li key={id} className={classNames}>
				<TodoListItem
					label={label}
					onDeleted={() => onDeleted(id)}
					onToggleImportant={() => onToggleImportant(id)}
					onToggleDone={() => onToggleDone(id)} />
			</li>
		);
	});

	return (
		<ul className="list-group todo-list">
			{elements}
		</ul>
	);
};

export default TodoList;