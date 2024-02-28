import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import TodoContainer from '../../../containers/todolist/TodoContainer';
import ListModalBox from '../../../components/commons/ListModalBox';

const NewTodoList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {isOpen && (
                <ListModalBox isOpen={isOpen} onClose={onClose}>
                    <TodoContainer />
                </ListModalBox>
            )}
            <Link className="btn" name="todolist" onClick={() => setIsOpen(!isOpen)}>
                할 일 추가
            </Link>
        </>
    );
};

export default NewTodoList;