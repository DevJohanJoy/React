import React from 'react';

interface Todo {
    value: string;
    completed: boolean;
}

function App() {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [todosList, setTodosList] = React.useState<Todo[]>([]);

    function addTodoItem() {
        if (inputRef.current != null) {
            if (
                inputRef.current.value != null &&
                inputRef.current.value.trim() != ''
            ) {
                let _todosList: Todo[] = [
                    ...todosList,
                    {
                        value: inputRef.current.value,
                        completed: false,
                    },
                ];

                setTodosList(_todosList);
            }
        }
    }

    function toggleCompleteTodoItem(index: number) {
        if (Number.isInteger(index) && index >= 0 && index < todosList.length) {
            let _todosList: Todo[] = [...todosList];
            _todosList[index].completed = !_todosList[index].completed;
            setTodosList(_todosList);
        }
    }

    function removeTodoItem(index: number) {
        if (Number.isInteger(index) && index >= 0 && index < todosList.length) {
            let _todosList: Todo[] = [...todosList];
            _todosList.splice(index, 1);
            setTodosList(_todosList);
        }
    }

    return (
        <div className='vw-100 vh-100 d-flex flex-column align-items-stretch p-4 gap-4'>
            <div className='flex-grow-1 d-flex flex-column align-items-stretch gap-2 overflow-y-auto pe-2'>
                {todosList.map((todo, index) => (
                    <TodoItem
                        todo={todo}
                        toggleComplete={() => toggleCompleteTodoItem(index)}
                        remove={() => removeTodoItem(index)}
                    />
                ))}
            </div>
            <div className='d-flex flex-row gap-2'>
                <input
                    ref={inputRef}
                    type='text'
                    className='flex-grow-1 form-control form-control-lg'
                    placeholder='Add a task here'
                />
                <button
                    type='button'
                    className='btn btn-lg btn-primary'
                    onClick={addTodoItem}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

function TodoItem({
    todo,
    toggleComplete,
    remove,
}: {
    todo: Todo;
    toggleComplete: () => void;
    remove: () => void;
}) {
    return (
        <div className='card'>
            <div className='card-body d-flex flex-row align-items-center gap-2'>
                <div
                    className={`card-text flex-grow-1 ${
                        todo.completed ? 'text-decoration-line-through' : ''
                    }`}
                >
                    {todo.value}
                </div>
                <button className='btn btn-primary' onClick={toggleComplete}>
                    {todo.completed ? 'Uncomplete' : 'Complete'}
                </button>
                <button className='btn btn-danger' onClick={remove}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default App;
