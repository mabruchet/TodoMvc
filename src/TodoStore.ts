import { Todo } from './Interfaces'

declare type ChangeCallBack = (store: TodoStore) => void

export default class TodoStore {

  public todos: Todo [] = []
  private static i = 0
  private callbacks: ChangeCallBack[] = []

  private static increment () {
    return this.i++
  }

  inform () {
    this.callbacks.forEach(cb => cb(this))
  }

  onChange (cb: ChangeCallBack) {
    this.callbacks.push(cb)
  }

  addTodo (title: string): void {
    this.todos = [{
      id: TodoStore.increment(),
      title: title,
      completed: false
    }, ...this.todos]
    this.inform()
  }

  removeTodo (todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo)
    this.inform()
  }

  toggleTodo (todo: Todo): void {
    this.todos = this.todos.map(t => t === todo ? { ...t, completed: !t.completed } : t)
    this.inform()
  }

  updateTitle (todo: Todo, title: string) {
    this.todos = this.todos.map(t => t === todo ? { ...t, title } : t)
    this.inform()
  }

  editTodo (todo: Todo, title: string): void {
    this.todos = this.todos.map(t => t === todo ? { ...t, title } : t)
    this.inform()
  }

  toggleAll (completed = true) {
    this.todos = this.todos.map(t => completed !== t.completed ? { ...t, completed } : t)
    this.inform()
  }

  clearCompleted (): void {
    this.todos = this.todos.filter(t => !t.completed)
    this.inform()
  }

}
