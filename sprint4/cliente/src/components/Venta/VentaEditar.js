import React, { useState } from 'react'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
const moment = require('moment');

const VentaEditar = (props) => {
    const initialFormStateDetalle = [];
    const [accionAddEdit, setaAccionAddEdit] = useState(false);
    const [detalle, setDetalle] = useState(initialFormStateDetalle);

    const addDetalle = () => {
        setDetalle([...detalle, articulo]);
        setArticulo(initialFormStateArticulo);
        detalleVentaModal();
    }
    const deleteDetalle = (id) => {
        setDetalle(detalle.filter((dato) => dato.producto !== id));
        detalleVentaModal();
    }
    const editDetalleRow = (dato) => {
        setaAccionAddEdit(true);
        setArticulo(dato);
    }
    const editDetalle = (id, editDato) => {
        setaAccionAddEdit(false);
        setDetalle(detalle.map((dato) => (dato.producto === id ? editDato : dato)))
        detalleVentaModal();
    }

    const initialFormStateCliente = {
        id: '',
        nombre: ''
    }
    const [cliente, setCliente] = useState(initialFormStateCliente)

    const initialFormStateArticulo = {
        producto: '',
        cantidad: ''
    }
    const [articulo, setArticulo] = useState(initialFormStateArticulo)

    const [venta, setVenta] = useState(props.currentVenta)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setVenta({ ...venta, [name]: value })
    }
    const handleInputChangeCliente = (event) => {
        const { name, value } = event.target
        setCliente({ ...cliente, [name]: value })
        setVenta({ ...venta, cliente })
        console.log(venta.detalle.length);
    }
    const handleInputChangeArticulo = (event) => {
        const { name, value } = event.target
        setArticulo({ ...articulo, [name]: value })
        //setVenta({ ...venta, detalle })
    }
    const [modalDetalle, setModalDetalle] = useState(false);

    const detalleVentaModal = () => {
        setModalDetalle(!modalDetalle);
    }
    return (
        <div>
            <Modal isOpen={props.modalEditar} className="modal-dialog modal-lg">
                <ModalHeader >
                    Venta
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <div className="row">
                            <div className="col-12">
                                <label className="col-form-label form-control-sm">Fecha</label>
                                <input
                                    className="form-control form-control-sm"
                                    name="fecha"
                                    type="text"
                                    autoComplete="off"
                                    value={moment(venta.fecha).format('llll')}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <label className="col-form-label form-control-sm">Cliente</label>
                                <input
                                    className="form-control form-control-sm"
                                    name="id"
                                    type="text"
                                    autoComplete="off"
                                    value={venta.cliente.id}
                                    disabled
                                />
                            </div>
                            <div className="col-9">
                                <label className="col-form-label form-control-sm">&nbsp;</label>
                                <input
                                    className="form-control form-control-sm"
                                    name="nombre"
                                    type="text"
                                    autoComplete="off"
                                    value={venta.cliente.nombre}
                                    disabled
                                />
                            </div>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <label className="col-form-label form-control-sm">
                            Vendedor:
                        </label>
                        <select
                            className="form-control form-control-sm"
                            name="vendedor"
                            value={venta.vendedor}
                            disabled
                        >
                            {props.resultadoUsuario ? (
                                props.resultadoUsuario.rtaUsuario ? (
                                    props.resultadoUsuario.rtaUsuario.map((item) => (
                                        item.rol.nombre != "Administrador" ? (
                                            <option key={item._id} value={item._id}>{item.nombre}</option>
                                        ) : (
                                            " "
                                        )
                                    ))

                                ) : (
                                    " "
                                )
                            ) : (
                                " "
                            )
                            }
                            <option value="">-- Elija un vendedor --</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label className="col-form-label form-control-sm">
                            Estado:
                        </label>
                        <select
                            className="form-control form-control-sm"
                            name="estado"
                            value={venta.estado}
                            onChange={handleInputChange}
                        >
                            <option value="1">En proceso</option>
                            <option value="2">Cancelada</option>
                            <option value="3">Entregada</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <div className="row">
                            <div className="col-12">
                                <hr className="text-dark"></hr>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="row">
                            <div className="col-12" style={{ 'height': '150px', 'overflowY': "scroll" }}>
                                <table className="table table-striped table-hover table-sm" id="productoTabla">
                                    <thead>
                                        <tr>
                                            <th scope="col">Producto</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {venta.detalle ? (

                                            venta.detalle.map((data) => (
                                                <tr>
                                                    <td>{data.producto.descripcion.substring(0, 50)}...</td>
                                                    <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(data.producto.precio)}</td>
                                                    <td>{data.cantidad}</td>
                                                    <td>{data.producto.precio * data.cantidad}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4}>No productos</td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="row">
                            <div className="col-12">
                                <hr className="text-dark"></hr>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Total:
                        </label>
                        <input
                            className="form-control"
                            name="total"
                            type="text"
                            autoComplete="off"
                            readOnly
                            value={new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(venta.total)}
                            disabled
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="btn btn-sm"
                        onClick={(event) => {
                            event.preventDefault()
                            if (!venta.cliente ||
                                !venta.vendedor ||
                                venta.detalle.length == 0 ||
                                !venta.total) return
                            props.editVenta(venta);
                            setVenta(props.currentVenta);
                            setCliente(initialFormStateCliente);
                            setArticulo(initialFormStateArticulo);
                            setDetalle(initialFormStateDetalle)
                            props.messageVentaModal();
                        }
                        }
                    >
                        Guardar
                    </Button>
                    <Button
                        color="secondary"
                        className="btn btn-sm"
                        onClick={() => {
                            props.editVentaModal();
                            setVenta(props.currentVenta);
                            setCliente(initialFormStateCliente);
                            setArticulo(initialFormStateArticulo);
                            setDetalle(initialFormStateDetalle)
                        }}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={modalDetalle} >
                <ModalHeader >
                    Venta
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        Procesado el producto
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="danger"
                        className="btn btn-sm"
                        onClick={() => {

                            detalleVentaModal();
                        }
                        }
                    >
                        Continuar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default VentaEditar
