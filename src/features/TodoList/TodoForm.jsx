import { useRef , useState} from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel'

function TodoForm({ onAddTodo }){
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");
    const inputRef = useRef();

    const handleAddTodo = (event) => {
        event.preventDefault();

    if(workingTodoTitle){
        onAddTodo(workingTodoTitle);
        setWorkingTodoTitle("");
        inputRef.current.focus();
    }
};
    function onChange(event){
        setWorkingTodoTitle(event.target.value);
    }
    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel 
            ref={inputRef}
            value={workingTodoTitle}
            onChange={onChange}
            elementId="todoTitle"
            labelText="Todo"></TextInputWithLabel>
            <button 
            type="submit"
            disabled={!workingTodoTitle.trim()}
            >Add Todo</button>
        </form>
    );
}
export default TodoForm;