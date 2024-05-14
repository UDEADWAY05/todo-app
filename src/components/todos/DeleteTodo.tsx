import { todoStore } from "../../store/todoStore";
import { ITodo } from "../../types/todo";

interface IDeleteTodoProps {
    todoId: ITodo['id'];
}

export const DeleteTodo = ({ todoId }: IDeleteTodoProps) => {
    const onDeleteTodo = async () => {
        todoStore.delete(todoId);
    }

    return (
        <i className="fa fa-trash" aria-hidden="true" onClick={onDeleteTodo}></i>
    );
}
