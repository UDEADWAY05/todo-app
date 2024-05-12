import { useState } from "react";
import { ITodo } from "../../types/todo";
import { useGetTodosQuery } from "../../ducks/todo";

interface IEditTodoProps {
    todoId: ITodo['id'];
    successfulEdit: () => void;
}

export const EditTodo = ({ todoId, successfulEdit }: IEditTodoProps) => {
    const [err, setErr] = useState('');
    const todoData = useGetTodosQuery()
    const todos: ITodo[] = todoData.data?.success ? todoData.data.data : []
    const currentTodo = todos.find(todo => todo.id === todoId);
    const [input, setInput] = useState(currentTodo?.title || '');

    const onEditTodo: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        // if (!currentTodo) {
        //     return;
        // }

        // if (input === '') {
        //     setErr('Please add valid todo!');
        //     return;
        // }

        // if (input.length > 25) {
        //     setErr('Todo must be less then 25 characters!');
        //     return;
        // }

        // await editTodo({
        //     ...currentTodo,
        //     title: input
        // })

        // successfulEdit();
    }

    return (
        <section className="add__todo">
            <h1>ToDo App</h1>
            <form className="add__todo__form" onSubmit={onEditTodo}>
                <label htmlFor="todo"></label>
                <input type="text"
                    id="todo"
                    name="todo"
                    value={input}
                    onChange={(e) => setInput(e.target.value)} />
                <button className="add__todo__btn">Edit Task</button>
                <p className="errors">{err}</p>
            </form>
        </section>
    );
}
