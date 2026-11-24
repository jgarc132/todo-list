import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm';
import {useState, useEffect} from 'react';
import Header from '../../shared/Header';

function  TodosPage({token}){
    const [error,setError] = useState("");
    const [isTodoListLoading,setIsTodoListLoading] = useState(false);
    const [todoList, setTodoList] = useState([]);
useEffect(() => {
    async function fetchTodos(){
        setIsTodoListLoading(true);
               
        try{
            const params = new URLSearchParams({
                limit:100,
            });
            const response = await fetch(`/api/tasks?${params}`,{
            headers: { 'X-CSRF-TOKEN' : token},
            credentials: 'include',
            },
        )

            if(response.status === 401){
            throw new Error('unauthorized');
            }
            if(!response.ok){
            throw new Error(`Request Failed: ${response.status}`);
            }

            const data = await response.json();
            setTodoList(data.tasks);
        }catch(error){
            setError(error.message);
        }finally{
            setIsTodoListLoading(false);
        }
    }
        if(token){
        fetchTodos();
    }
    },[token]);
    
    
    









   async function addTodo(todoTitle){
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false
    };



        setTodoList(previous => [newTodo, ...previous]);
    try{    
        const response = await fetch('/api/tasks',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN' : token,
            },
            credentials: 'include',
            body: JSON.stringify({
                title: newTodo.title,
                isCompleted: newTodo.isCompleted,
            }),
        });
        if(!response.ok){
            throw new Error(`Request failed: ${response.status}`);
        }
        const savedTodo = await response.json();
        setTodoList((previous) => previous.map((todo) => (todo.id === newTodo.id ? savedTodo:todo))
    );



    }catch(error){
        setTodoList((previous) => previous.filter((todo) => todo.id !== newTodo.id));
        setError(error.message);
    }

    }





    async function completeTodo(id){
       const originalTodo = todoList.find((todo) => todo.id === id);
        setTodoList((previous) => previous.map((todo) => (todo.id === id ? {...todo,isCompleted : true } : todo)));
        try{
            const response = await fetch(`/api/tasks/${id}`,{
                method: "PATCH",
                headers: {
                    'Content-Type' : 'application/json',
                    'X-CSRF-TOKEN': token,

                },
                credentials: 'include',
                body: JSON.stringify({ isCompleted: true}),
            });
            if(!response.ok){
                throw new Error(`Request failed: ${response.status}`);
            }
        }catch(error){
            setTodoList((previous) => previous.map((todo) => (todo.id === originalTodo.id ? originalTodo : todo)));
            setError(error.message);
      }  
    }
    async function updateTodo(editedTodo){
        const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
        setTodoList((previous) => previous.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo)));
        try{
            const response = await fetch(`/api/tasks/${editedTodo.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'include',
                body: JSON.stringify({
                    title: editedTodo.title,
                    isCompleted: editedTodo.isCompleted,
                }),
            });
            if(!response.ok){
                throw new Error(`Request failed: ${response.status}`);
            }
        }catch(error){
            setTodoList((previous) => previous.map((todo) => (todo.id === originalTodo.id ? originalTodo : todo)));
            setError(error.message);
        }

    }
    return (
    <div>
          {error && (
            <div>
            <p>{error}</p>
            <button type="button" onClick={() => setError('')}>
                Clear Error
            </button>
            </div>
            )}
        {isTodoListLoading && <p>Todo list loading...</p>}
        <TodoForm onAddTodo={addTodo}/>
        <TodoList 
        todoList={todoList} 
        onCompleteTodo={completeTodo} 
        onUpdateTodo={updateTodo}
        />
    </div>   
  )
}

export default TodosPage;