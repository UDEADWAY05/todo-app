import { makeAutoObservable } from 'mobx'
import { api } from '../api'
import { isSuccessResponse, Response } from '../types/response';
import { ITodo } from '../types/todo';

export const todoStore = makeAutoObservable({
  todo: [] as ITodo[],
  *get() {
    const result: Response<ITodo[]> = yield api.getTodos()

    if (isSuccessResponse(result)) {
      todoStore.todo = result.data;
    };
  },
  *create(title: string) {
    const result: Response<ITodo> = yield api.createTodo(title)

    if (isSuccessResponse(result)) {
      todoStore.todo.push(result.data)
    }
  },
  *update(todo: ITodo) {
    const result: Response<ITodo> = yield api.updateTodo(todo)

    if (isSuccessResponse(result)) {
      todoStore.todo = todoStore.todo.map(
        todo => todo.id === result.data.id ? result.data : todo
      )
    }
  },
  *delete(id: ITodo['id']) {
    const result: Response<ITodo[]> = yield api.deleteTodo(id)

    if (isSuccessResponse(result)) {
      todoStore.todo = result.data;
    }
  }

})