import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import {useEditableTitle} from '../../../hooks/useEditableTitle'
import {isValidTodoTitle} from '../../../utils/todoValidation'

function TodoListItem({todo, onCompleteTodo,onUpdateTodo}){        const {
        isEditing,
        workingTitle,
        startEditing,
        cancelEdit,
        updateTitle,
        finishEdit
        } = useEditableTitle(todo.title);

    function handleUpdate(event){
        if (!isEditing) return;
        event.preventDefault();
         const finalTitle = finishEdit();
        onUpdateTodo({ ...todo, title: finalTitle });
       
        
    }
   
    return(
        
        <li>
        <form onSubmit={handleUpdate}>
        {isEditing ? (
            <>
        <TextInputWithLabel 
         value={workingTitle}
         elementId={todo.id}
         labelText="Todo"
         onChange={ (event) => updateTitle(event.target.value)}/>
        <button 
        type="button"
         onClick={cancelEdit}
        >Cancel</button>
        <button
        type="button"
        onClick={handleUpdate}
        disabled={!isValidTodoTitle(workingTitle)}
        >Update
        </button>
        </>
        )
        : (
            <>
            <label>
            <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
            />
            </label>
            <span onClick={() => startEditing()}>{todo.title}</span>
            </>
            )}
         </form>
        </li>
    );
}
export default TodoListItem;