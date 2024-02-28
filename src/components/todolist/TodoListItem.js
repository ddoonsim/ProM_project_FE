import React from 'react';
import {
	MdCheckBoxOutlineBlank,
	MdCheckBox,
	MdDelete,
	MdEdit
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle, onChangeSelectedTodo, onInsertToggle, style }) => {
	const { id, text, checked } = todo;

	return (
		<div className="TodoListItem-virtualized" style={style}>
			<div className='TodoListItem'>
				<div className={cn('checkbox', { checked })} onClick={() => onToggle(id)}>
					{checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank /> }
					<div className="text">{text}</div>
				</div>
				<div className='edit' onClick={() => {
					onChangeSelectedTodo(todo);
					onInsertToggle();
				}}>
					<MdEdit />
				</div>
				<div className="remove" onClick={() => onRemove(id)}>
					<MdDelete />
				</div>
			</div>
		</div>
	);
};

export default React.memo(TodoListItem);