import React from 'react';
//Styles
import './TodoListItem.css';

const TodoListItem = ({ label, onDeleted, done, important, onToggleDone, onToggleImportant }) => {

	return (
		<div className="todo-list-item d-flex justify-content-between">
			<div className="todo-list-item-label"
				onClick={onToggleDone}>
				{label}
			</div>
			<div className="btn-group align-items-baseline">
				<button type="button"
					className="btn btn-outline-success btn-sm"
					onClick={onToggleImportant}>
					<i className="fa fa-exclamation"></i>
				</button>
				<button type="button"
					className="btn btn-outline-danger btn-sm"
					onClick={onDeleted}>
					<i className="fa fa-trash-o"></i>
				</button>
			</div>
		</div>
	);
};

export default TodoListItem;