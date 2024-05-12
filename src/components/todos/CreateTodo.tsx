import { useState } from 'react';
import { useCreateTodoMutation } from '../../ducks/todo';

export const CreateTodo = () => {
    const [err, setErr] = useState('');
    const [input, setInput] = useState('');
    const [createTodo] = useCreateTodoMutation()
  
    const onCreateTodo: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (input === '') {
            setErr('Please add valid todo!');
            return;
        }

        if (input.length > 25) {
            setErr('Todo must be less then 25 characters!');
            return;
        }

        try {
          await createTodo(input);
          setInput('');
        } catch (error) {
          setErr('Something goes wrong');
        }
    }

    return (
        <section className="add__todo">
            <h1>ToDo App</h1>
            <form className="add__todo__form" onSubmit={onCreateTodo}>
                <label htmlFor="todo"></label>
                <input type="text"
                    id="todo"
                    name="todo"
                    placeholder='Add todo'
                    value={input}
                    onChange={(e) => setInput(e.target.value)} />
                <button className="add__todo__btn">Add New Task</button>
                <p className="errors">{err}</p>
            </form>
        </section>
    );
}
