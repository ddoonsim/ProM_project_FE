import { useState, useRef, useCallback } from 'react';
import TodoTemplate from '../../components/todolist/TodoTemplate';
import TodoInsert from '../../components/todolist/TodoInsert';
import TodoList from '../../components/todolist/TodoList';
import TodoEdit from '../../components/todolist/TodoEdit';
import Confetti from 'react-dom-confetti';
import Swal from 'sweetalert2';

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);

  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);

  // 고유값으로 사용될 seq
  // ref를 사용하여 변수 담기
  const nextseq = useRef(4);

  const onInsertToggle = useCallback(() => {
    if (selectedTodo) {
      setSelectedTodo((selectedTodo) => null);
    }
    setInsertToggle((prev) => !prev);
  }, [selectedTodo]);

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo((selectedTodo) => todo);
  };

  const onInsert = useCallback((content) => {
    const todo = {
      seq: nextseq.current,
      content,
      done: false,
    };
    setTodos((todos) => todos.concat(todo));
    //concat(): 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열 반환
    nextseq.current += 1; // nextseq 1씩 더하기
  }, []);

  const onRemove = useCallback((seq) => {
    Swal.fire({
      title: '정말 삭제하시겠습니까?',
      text: '삭제 후에는 복구가 불가능합니다!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos((todos) => todos.filter((todo) => todo.seq !== seq));
        Swal.fire('삭제되었습니다!', '', 'success');
      }
    });
  }, [setTodos]);

  const onUpdate = useCallback(
    (seq, content) => {
      onInsertToggle();
      setTodos((todos) =>
        todos.map((todo) => (todo.seq === seq ? { ...todo, content } : todo)),
      );
    },
    [onInsertToggle],
  );

  const onToggle = useCallback((seq) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.seq === seq ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }, [setTodos],
  );

  // 진행률
  const percentTodo = () => {
    const completedTodos = todos.filter((todo) => todo.done).length;
    return todos.length ? (completedTodos / todos.length) * 100 : 0;
  };

  // 폭죽 효과
  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 70,
    elementCount: 800,
    dragFriction: 0.05,
    duration: 5000,
    stagger: 1,
    width: '30px',
    height: '30px',
    perspective: '500px',
    colors: [
      '#FFD700',
      '#FF6347',
      '#00FF00',
      '#87CEEB',
      '#FF00FF',
      '#FFFF00',
      '#00FFFF',
      '#FFA07A',
      '#FF1493',
      '#00FF7F',
    ],
    opacity: 0.9,
    origin: { x: 0.8, y: 0.2 },
  };

  return (
    <TodoTemplate>
      <div>
        <div
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            paddingLeft: '10px',
          }}
        >
        </div>
        <div
          style={{
            width: '100%',
            height: '12px',
            background: '#f3f3f3',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${percentTodo()}%`,
              height: '100%',
              background:
                'linear-gradient(to right, #0A4B59 ,#3E768C, #88B0BF)',
              borderRadius: '6px',
              transition: 'width 0.5s ease',
            }}
          />
        </div>
      </div>
      <TodoList
        todos={todos}
        onRemove={onRemove}
        onToggle={onToggle}
        onChangeSelectedTodo={onChangeSelectedTodo}
        onInsertToggle={onInsertToggle}
      />
      <TodoInsert onInsert={onInsert} />

      {insertToggle && (
        <TodoEdit
          onInsert={onInsert}
          selectedTodo={selectedTodo}
          onInsertToggle={onInsertToggle}
          onUpdate={onUpdate}
          insertToggle={insertToggle}
        />
      )}
      <Confetti active={percentTodo() === 100} config={confettiConfig} />
    </TodoTemplate>
  );
};

export default TodoContainer;
