function TodoList(){
    const todoList = [
    {id: 1, title: "Go to work"},
    {id: 2, title: "Eat"},
    {id: 3, title: "Code"}
  ];
    return(
    <ul>
        {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
    );
}
export default TodoList;