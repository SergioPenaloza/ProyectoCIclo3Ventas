import React, { useState } from 'react'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
const moment = require('moment');

const VentaListar = (props) => {
    const initialFormState = { filtrar: '' }
    const [ventaFiltrar, setVentaFiltrar] = useState(initialFormState)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setVentaFiltrar({ ...ventaFiltrar, [name]: value })
    }
    return (
        <div className="card">
            <div className="card-header">
                Venta
            </div>
            <div className="card-body">
                <div className="row  mb-3">
                    <div className="col-auto">
                        <label>Filtrar:</label>
                    </div>
                    <div className="col-auto">
                        <input
                            name="filtrar"
                            type="search"
                            className="form-control btn-sm"
                            autoComplete="off"
                            value={ventaFiltrar.filtrar}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-auto">
                        <Button
                            onClick={(event) => {
                                event.preventDefault()
                                if (!ventaFiltrar.filtrar) return
                                props.filterVenta(ventaFiltrar)
                                setVentaFiltrar(initialFormState)
                            }
                            }
                            size="sm"  color="success"
                        >
                            Buscar
                        </Button>
                    </div>
                    <div className="col-6">
                        <Button size="sm" color="primary"
                            onClick={() => {
                                props.addVentaModal()
                            }}
                        >
                            Agregar
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12" style={{ 'height': '412px', 'overflowY': "scroll" }}>
                        <Table striped hover size="sm">
                            <thead>
                                <tr>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th>Vendedor</th>
                                    <th>Total</th>
                                    <th colSpan={2}>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.resultado ? (
                                    props.resultado.rtaVenta ? (
                                        props.resultado.rtaVenta.map((item) => (
                                            <tr key={item._id}>
                                                <td>{
                                                    item.estado == 1 ?
                                                    <span className="text-primary">En proceso</span> :
                                                        item.estado == 2 ?
                                                        <span className="text-danger">Cancelada</span> :
                                                        <span className="text-success">Entregada</span>
                                                }</td>
                                                <td>{item.fecha}</td>
                                                <td>{item.cliente.id} {' '} {item.cliente.nombre}</td>
                                                <td>{item.vendedor.nombre}</td>
                                                <td>{
                                                    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(item.total)
                                                }</td>
                                                <td>
                                                    <Button
                                                        onClick={() => {
                                                            props.rowVenta(item);
                                                            props.editVentaModal()
                                                        }}
                                                        size="sm" color="success"
                                                    >
                                                        Editar
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button
                                                        onClick={() => { props.rowVenta(item); props.deleteVentaModal() }}
                                                        size="sm"  color="danger"
                                                    >
                                                        Borrar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7}><center>No hay ventas</center></td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan={7}><center>Sin filtrar ventas</center></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <div className="card-footer text-muted">
                Derechos de Autor 2021
            </div>
            <Modal isOpen={props.modalBorrar} >
                <ModalHeader >
                    Venta
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        Esta seguro que desea eliminar la venta?
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="danger"
                        className="btn btn-sm"
                        onClick={() => {
                            props.deleteVenta();
                            props.deleteVentaModal()
                            props.messageVentaModal();
                        }
                        }
                    >
                        Si
                    </Button>
                    <Button
                        color="secondary"
                        className="btn btn-sm"
                        onClick={() => {
                            props.deleteVentaModal();
                        }}
                    >
                        No
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={props.modalMensaje} >
                <ModalHeader >
                    Venta
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        {props.accion ? (
                            props.accion.ok ? (
                                <span className="text-success">{props.accion.msg}</span >
                            ) : (
                                <span className="text-danger">
                                    {props.accion.msg ? (
                                        props.accion.msg
                                    ) : (
                                        <ol className="list-group list-group-flush list-group-numbered">

                                            {
                                                props.accion.errors.descripcion ? (
                                                    <li className="list-group-item">
                                                        {props.accion.errors.descripcion.msg}
                                                    </li>
                                                ) : ("")
                                            }

                                            {
                                                props.accion.errors.precio ? (
                                                    <li className="list-group-item">
                                                        {props.accion.errors.precio.msg}
                                                    </li>
                                                ) : ("")
                                            }
                                        </ol>
                                    )}
                                </span >
                            )
                        ) : (
                            <span><center>Cargando...</center></span>
                        )}
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="secondary"
                        className="btn btn-sm"
                        onClick={() => {
                            props.messageVentaModal()
                        }}
                    >
                        Cerrar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default VentaListar
