import React, { useState } from 'react'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const VentaAgregar = (props) => {
    const initialFormStateDetalle = [];
    const [accionAddEdit, setaAccionAddEdit] = useState(false);
    const [detalle, setDetalle] = useState(initialFormStateDetalle);
    const [detalleAux, setDetalleAux] = useState(initialFormStateDetalle);

    const calculatFactura = () => {
        venta.total  = 0;
        detalleAux.map(function(item) {
            venta.total += parseFloat((item.producto.substring(item.producto.indexOf("*") + 1).substring
                        (item.producto.substring(item.producto.indexOf("*") + 1).indexOf("*") + 1)))*item.cantidad
        });
    }
    const addDetalle = () => {
        setDetalle([...detalle,
        {
            producto: articulo.producto.substring(0, articulo.producto.indexOf("*")),
            cantidad: articulo.cantidad
        }
        ]);
        setDetalleAux([...detalleAux, articulo]);
        setArticulo(initialFormStateArticulo);
        detalleVentaModal();
    }
    const deleteDetalle = (id) => {
        setDetalle(detalle.filter((dato) => dato.producto !== id.substring(0, id.indexOf("*"))));
        setDetalleAux(detalleAux.filter((dato) => dato.producto !== id));
        detalleVentaModal();
    }
    const editDetalleRow = (dato) => {
        setaAccionAddEdit(true);
        setArticulo(dato);
    }
    const editDetalle = (id, editDato) => {
        console.log(id);
        setaAccionAddEdit(false);
        setDetalle(detalle.map((dato) => (dato.producto === id.substring(0, id.indexOf("*")) ?

            {
                producto: editDato.producto.substring(0, editDato.producto.indexOf("*")),
                cantidad: editDato.cantidad
            }

            : dato)))
        setDetalleAux(detalleAux.map((dato) => (dato.producto === id ? editDato : dato)))
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

    const initialFormState = {
        cliente: { id: '', nombre: '' },
        vendedor: '',
        detalle: [
            {
                producto: '',
                cantidad: ''
            }
        ],
        total: 0
    }

    const [venta, setVenta] = useState(initialFormState)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setVenta({ ...venta, [name]: value })
    }
    const handleInputChangeCliente = (event) => {
        const { name, value } = event.target
        setCliente({ ...cliente, [name]: value })
        setVenta({ ...venta, cliente })
    }
    const handleInputChangeArticulo = (event) => {
        const { name, value } = event.target
        setArticulo({ ...articulo, [name]: value })
    }
    const [modalDetalle, setModalDetalle] = useState(false);

    const detalleVentaModal = () => {
        setModalDetalle(!modalDetalle);
    }
    return (
        <div>
            <Modal isOpen={props.modalAgregar} className="modal-dialog modal-lg">
                <ModalHeader >
                    Venta
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <div className="row">
                            <div className="col-3">
                                <label className="col-form-label form-control-sm">Cliente</label>
                                <input
                                    className="form-control form-control-sm"
                                    name="id"
                                    type="text"
                                    autoComplete="off"
                                    value={cliente.id}
                                    placeholder="Identificacion"
                                    onChange={handleInputChangeCliente}
                                />
                            </div>
                            <div className="col-9">
                                <label className="col-form-label form-control-sm">&nbsp;</label>
                                <input
                                    className="form-control form-control-sm"
                                    name="nombre"
                                    type="text"
                                    autoComplete="off"
                                    value={cliente.nombre}
                                    placeholder="Nombres y Apellidos"
                                    onChange={handleInputChangeCliente}
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
                            onChange={handleInputChange}
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
                        <div className="row">
                            <div className="col-12">
                                <hr className="text-dark"></hr>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="row">
                            <div className="col-6">
                                <label className="col-form-label form-control-sm">
                                    Producto:
                                </label>
                                {accionAddEdit == false ? (
                                    <select
                                        className="form-control  form-control-sm"
                                        name="producto"
                                        value={articulo.producto}
                                        onChange={handleInputChangeArticulo}
                                    >
                                        {props.resultadoProducto ? (
                                            props.resultadoProducto.rtaProducto ? (
                                                props.resultadoProducto.rtaProducto.map((item) => (
                                                    item.estado && (detalle.length == 0 || !detalle.find(element => element.producto == item._id)) ? (
                                                        <option key={item._id} value={item._id + "*" + item.descripcion + "*" + item.precio}>{item.descripcion + " (" + new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(item.precio) + ")"}</option>
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
                                        <option value="">-- Elija una producto --</option>
                                    </select>
                                ) : (
                                    <select
                                        className="form-control  form-control-sm"
                                        name="producto"
                                        // value={articulo.producto}
                                        value={articulo.producto}
                                        readOnly
                                        onChange={handleInputChangeArticulo}
                                    >
                                        {props.resultadoProducto ? (
                                            props.resultadoProducto.rtaProducto ? (
                                                props.resultadoProducto.rtaProducto.map((item) => (
                                                    item.estado && articulo.producto.substring(0, articulo.producto.indexOf("*")) == item._id ? (
                                                        <option key={item._id} value={item._id + "*" + item.descripcion + "*" + item.precio}>{item.descripcion + " (" + new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(item.precio) + ")"}</option>
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
                                        <option value="">-- Elija una producto--</option>
                                    </select>
                                )
                                }

                            </div>
                            <div className="col-3">
                                <label className="col-form-label form-control-sm">Cantidad</label>
                                <input
                                    className="form-control form-control-sm"
                                    name="cantidad"
                                    type="number"
                                    autoComplete="off"
                                    value={articulo.cantidad}
                                    onChange={handleInputChangeArticulo}
                                />
                            </div>
                            <div className="col-3">
                                <label className="col-form-label form-control-sm">&nbsp;</label>
                                {(accionAddEdit == false ? (
                                    <Button
                                        className="form-control form-control-sm"
                                        onClick={(event) => {
                                            event.preventDefault()
                                            if (!articulo.producto || !articulo.cantidad) return
                                            addDetalle()
                                        }}
                                        size="sm" color="success"
                                    >
                                        Agregar
                                    </Button>
                                ) : (
                                    <Button
                                        className="form-control form-control-sm"
                                        onClick={(event) => {
                                            event.preventDefault()
                                            if (!articulo.producto || !articulo.cantidad) return
                                            editDetalle(articulo.producto, articulo)
                                            setArticulo(initialFormStateArticulo)
                                        }}
                                        size="sm" color="primary"
                                    >
                                        Editar
                                    </Button>
                                ))}
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
                                            <th scope="col" colSpan={2}>Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detalleAux ? (
                                            detalleAux.map((data) => (
                                                <tr key={data.producto.substring(0, data.producto.indexOf("*"))}>
                                                    <td>
                                                        {
                                                            data.producto.substring(data.producto.indexOf("*")+1).substring(
                                                                data.producto.substring(data.producto.indexOf("*")).indexOf("*")).substring(
                                                                    0,data.producto.substring(data.producto.indexOf("*")+1).substring(
                                                                        data.producto.substring(data.producto.indexOf("*")).indexOf("*")).indexOf("*")
                                                                ).substring(0,20)
                                                        }...
                                                    </td>
                                                    <td>
                                                        {
                                                            new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
                                                            data.producto.substring(data.producto.indexOf("*") + 1).substring
                                                            (data.producto.substring(data.producto.indexOf("*") + 1).indexOf("*") + 1)
                                                            )
                                                        }
                                                    </td>
                                                    <td>{data.cantidad}</td>
                                                    <td>{
                                                    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
                                                    (data.producto.substring(data.producto.indexOf("*") + 1).substring
                                                            (data.producto.substring(data.producto.indexOf("*") + 1).indexOf("*") + 1))*data.cantidad
                                                    )}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => editDetalleRow(data)}
                                                            className="btn btn-primary btn-sm"
                                                        >
                                                            Editar
                                                        </button>{" "}
                                                        <button
                                                            onClick={() => deleteDetalle(data.producto)}
                                                            className="btn btn-danger btn-sm"
                                                        >
                                                            Borrar
                                                        </button>
                                                    </td>
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
                            onChange={handleInputChange}
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
                            props.addVenta(venta);
                            setVenta(initialFormState);
                            setCliente(initialFormStateCliente);
                            setArticulo(initialFormStateArticulo);
                            setDetalle(initialFormStateDetalle)
                            setDetalleAux(initialFormStateDetalle)
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
                            props.addVentaModal();
                            setVenta(initialFormState);
                            setCliente(initialFormStateCliente);
                            setArticulo(initialFormStateArticulo);
                            setDetalle(initialFormStateDetalle);
                            setDetalleAux(initialFormStateDetalle)
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
                            calculatFactura();
                            setVenta({ ...venta, detalle });
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

export default VentaAgregar
