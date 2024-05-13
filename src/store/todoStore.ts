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
    
  },
  *update(todo: ITodo) {

  },
  *delete(id: ITodo['id']) {

  }

})