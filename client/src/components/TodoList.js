import {useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync, toggleTodoAsync, removeTodoAsync } from '../redux/todos/services';
import { selectFilterTodos } from '../redux/todos/todosSlice';
import Loading from './Loading';
import Error from './Error'


function TodoList() {
    const dispatch = useDispatch();
    const filteredTodos = useSelector(selectFilterTodos);
    const isLoading = useSelector((state) => state.todos.isLoading);
    const error = useSelector((state) => state.todos.error);

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);

    const handleToggle = async (id, completed) => {
        await dispatch(toggleTodoAsync({id, data: {completed}}));
    }

    const handleDestroy = async (id) => {
        if(window.confirm("Are ou sure? ")){
           await dispatch(removeTodoAsync(id))
        }
    }

    if(isLoading) {
        return <Loading />;
    }

    if(error) {
        return <Error message={error}/>;
    }


    return (
        <>
            <ul className="todo-list">
               {
                filteredTodos.map((item) => (
                    <li key={item.id} className={item.completed ? 'completed' : ''}>
                    <div className="view">
                        <input 
                            className="toggle" 
                            type="checkbox" 
                            checked={item.completed} 
                            onChange={() => handleToggle(item.id, !item.completed)} />
                        <label>{item.title}</label>
                        <button className="destroy" onClick={() =>handleDestroy(item.id)}></button>
                       
                    </div>
                </li>
                ))
               }
            </ul>
        </>
    )
}

export default TodoList;
