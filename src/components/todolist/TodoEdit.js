import { useCallback, useEffect, useState } from 'react';
import './TodoEdit.scss';
import { MdClose } from "react-icons/md";

const TodoEdit = ({ insertToggle, selectedTodo, onUpdate, onInsertToggle }) =>  {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onUpdate(selectedTodo.seq, value);
      setValue(''); //value 초기화
      //기본이벤트(새로고침) 방지
      e.preventDefault();
    },
    [onUpdate, selectedTodo.seq, value],
  );

  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.content);
    }
  }, [selectedTodo]);
  
  return (
    <div className="background">
      <form onSubmit={onSubmit} className="todoedit__insert">
        <h2>
          수정하기
          <button type="button" className='ExitBtn' onClick={onInsertToggle}>
            <MdClose />
          </button>
        </h2>
        <input
          onChange={onChange}
          value={value}
          maxLength={23}
          placeholder="할 일을 입력하세요"
        />
        <button type="submit" disabled={!value.trim()}>수정</button>
      </form>
    </div>
  );
}

export default TodoEdit;
