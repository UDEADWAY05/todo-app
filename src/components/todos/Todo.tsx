import { observer } from "mobx-react-lite";
import { todoStore } from "../../store/todoStore";
import { ITodo } from "../../types/todo";
import { DeleteTodo } from "./DeleteTodo";

interface ITodoProps {
    todo: ITodo;
    onEditHandler: (id: ITodo['id']) => void;
}

export const Todo = observer(({ todo, onEditHandler }: ITodoProps) => {
    const onChangeCheck = async () => {
      todoStore.update({
        ...todo,
        completed: !todo.completed,
      })  
    }

    return (
        <div className="todo">
            <div className="todo__title">
                <p style={todo.completed ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>{todo.title}</p>
            </div>
            <div className="todos__btns">
                <label htmlFor="check"></label>
                <input type="checkbox"
                    name="check" id="check"
                    checked={todo.completed}
                    onChange={onChangeCheck}
                />
                <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={() => onEditHandler(todo.id)}></i>
                <DeleteTodo todoId={todo.id} />
            </div>
        </div>
    );
})
