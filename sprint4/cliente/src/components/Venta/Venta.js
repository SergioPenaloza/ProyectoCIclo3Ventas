import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'reactstrap';
import VentaListar from './VentaListar';
import VentaAgregar from './VentaAgregar';
import VentaEditar from './VentaEditar';

const Venta = () => {
    const url = "http://localhost:4000/api/venta/";
    const [resultado, setResultado] = useState();
    const [error, setError] = useState();
    const [accion, setAccion] = useState();

    const [resultadoUsuario, setResultadoUsuario] = useState();

    const listUsuario = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch("http://localhost:4000/api/usuario/", requestOptions)
            .then(async (response) => {
                setResultadoUsuario(await response.json());
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                console.log(err.message);
            }
            );
    }
    const [resultadoProducto, setResultadoProducto] = useState();
    const listProducto = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch("http://localhost:4000/api/producto/", requestOptions)
            .then(async (response) => {
                setResultadoProducto(await response.json());
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                console.log(err.message);
            }
            );
    }

    const listVenta = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(url, requestOptions)
            .then(async (response) => {
                setResultado(await response.json());
                //console.log(resultado);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                console.log(err.message);
            }
            );
    }

    const [modalAgregar, setModalAgregar] = useState(false);

    const addVentaModal = () => {
        setModalAgregar(!modalAgregar);
    }

    const addVenta = async (venta) => {
        addVentaModal();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta)
        };
        fetch(url, requestOptions)
            .then(async (response) => {
                setAccion(await response.json());
                filterVenta(ventaFiltrar);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                console.log(err.message);
            }
            );
    }

    const [modalBorrar, setModalBorrar] = useState(false);

    const deleteVentaModal = () => {
        setModalBorrar(!modalBorrar);
    }

    const initialFormState = { descripcion: '', precio: '', estado: true, categoria: '' }
    const [currentVenta, setCurrentVenta] = useState(initialFormState);

    const deleteVenta = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(url + currentVenta._id, requestOptions)
            .then(async (response) => {
                setAccion(await response.json());
                filterVenta(ventaFiltrar);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                console.log(err.message);
            }
            );
    }

    const [modalEditar, setModalEditar] = useState(false);

    const editVentaModal = () => {
        setModalEditar(!modalEditar);
    }

    const rowVenta = (venta) => {
        setCurrentVenta(venta);
    }

    const editVenta = async (venta) => {

        editVentaModal();
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta)
        };
        fetch(url + venta._id, requestOptions)
            .then(async (response) => {
                setAccion(await response.json());
                filterVenta(ventaFiltrar);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                console.log(err.message);
            }
            );
    }

    const [modalMensaje, setModalMensaje] = useState(false);

    const messageVentaModal = () => {
        setModalMensaje(!modalMensaje);
    }

    const [ventaFiltrar, setVentaFiltrar] = useState({ filtrar: '' })

    const filterVenta = (venta) => {
        setVentaFiltrar(venta);
        if (venta.filtrar.length > 0) {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            fetch(url + " " + venta.filtrar, requestOptions)
                .then(async (response) => {
                    setResultado(await response.json());
                    setError(null);
                })
                .catch((err) => {
                    setError(err.message);
                    console.log(err.message);
                }
                );
        }
    }

    useEffect(() => {
        //listVenta();
        listUsuario();
        listProducto();
    }, []);

    return (
        <Container>
            <VentaListar
                resultado={resultado}
                error={error}
                addVentaModal={addVentaModal}
                deleteVenta={deleteVenta}
                deleteVentaModal={deleteVentaModal}
                modalBorrar={modalBorrar}
                rowVenta={rowVenta}
                editVentaModal={editVentaModal}
                messageVentaModal={messageVentaModal}
                modalMensaje={modalMensaje}
                accion={accion}
                filterVenta={filterVenta}
            />
            {modalEditar ? (
                <VentaEditar
                    resultadoUsuario={resultadoUsuario}
                    modalEditar={modalEditar}
                    editVentaModal={editVentaModal}
                    editVenta={editVenta}
                    currentVenta={currentVenta}
                    messageVentaModal={messageVentaModal}
                    modalMensaje={modalMensaje}
                    accion={accion}
                />
            ) : (
                <VentaAgregar
                    resultadoProducto={resultadoProducto}
                    resultadoUsuario={resultadoUsuario}
                    modalAgregar={modalAgregar}
                    addVentaModal={addVentaModal}
                    addVenta={addVenta}
                    messageVentaModal={messageVentaModal}
                    modalMensaje={modalMensaje}
                    accion={accion}
                />  
            )}          
        </Container>
    )
}

export default Venta
