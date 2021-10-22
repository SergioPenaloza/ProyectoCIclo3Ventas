import React from 'react'

const TodoListar = (props) => {
    return (
        <div className="card">
            <div className="card-header">
                Personajes
            </div>
            <div className="card-body">
                <div className="row  mb-3">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.resultado ? (
                                props.resultado.map((todo) => (
                                    <tr key={todo.id}>
                                        <td>{todo.title}</td>
                                        <td>{todo.completed ? ' SI' : " NO"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2}>
                                        "Cargando..."
                                    </td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card-footer text-muted">
                Derechos de Autor 2021
            </div>
        </div>
    )
}

export default TodoListar
