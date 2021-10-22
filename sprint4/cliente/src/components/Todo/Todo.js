import React, {useState,useEffect} from 'react'
import TodoListar from './TodoListar';
import "bootstrap/dist/css/bootstrap.min.css";

const Todo = () => {
    const url = "https://jsonplaceholder.typicode.com/todos";
    const [resultado, setResultado] = useState();
    const [error, setError] = useState([]);

    const listTodo = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(url, requestOptions)
            .then(async (response) => {
                if (response.ok) {
                    setResultado(await response.json());
                    setError(null);
                } else {
                    setError(await response.text());
                }
            })
            .catch((err) => {
                setError(err.message);
            }
            );
    }

    useEffect(() => {
        listTodo();
    }, [])
    return (
        <div>
            <TodoListar
                resultado={resultado}
                error={error}
            />
        </div>
    )
}

export default Todo
