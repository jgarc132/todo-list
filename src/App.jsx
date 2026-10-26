import './App.css'
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import {useState} from 'react';

const todos = [
    {id: 1, title: "Go to work"},
    {id: 2, title: "Eat"},
    {id: 3, title: "Code"}
  ];


function App() {
  const [todoList, setTodoList] = useState(todos);
  return (
   <div>
    <h1>What's Next?</h1>
    <TodoForm />
    <TodoList todoList={todoList} />
   </div>   
  )
}

export default App
