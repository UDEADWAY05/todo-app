import { ITodo } from "../../types/todo";

interface IDeleteTodoProps {
    todoId: ITodo['id'];
}

export const DeleteTodo = ({ todoId }: IDeleteTodoProps) => {
    const onDeleteTodo = async () => {
        // deleteTodo(todoId);
    }

    return (
        <i className="fa fa-trash" aria-hidden="true" onClick={onDeleteTodo}></i>
    );
}
