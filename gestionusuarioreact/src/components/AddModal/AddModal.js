import "bootstrap/dist/css/bootstrap.min.css";
import { Button , Label, Col, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Form, Input
} from "reactstrap";
import React, {useState} from "react"

export default function AddModal(props) {
    const { showAddModal, setShowAddModal, data, setData , ...rest } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setShowAddModal(!showAddModal);

    const handleSubmit = (e) => {
        e.preventDefault()
        const Usuario = e.target.Usuario.value;
        const Rol = e.target.Rol.value;
        const Estado= e.target.Estado.value;
        const id =  data.length + 1; 
        setData([{id, Usuario, Rol, Estado},...data]);
        setShowAddModal(false)
    }


    return (
        <Modal isOpen={showAddModal} toggle={toggle}>
            <Form onSubmit={handleSubmit}>
                <ModalHeader>
                    <div><h3>Nuevo Usuario</h3></div>
                </ModalHeader>

                <ModalBody>
                <FormGroup row className='mt-2'>
                <Label sm={3}>Usuario</Label>
                <Col sm={9}>
                    <input className="form-control"  type="text"
                                name="Usuario"
                                placeholder=""
                                required
                                />
                               </Col> 
                </FormGroup>

                <FormGroup row className='mt-2'>
                    <Label sm={3}>Rol</Label>
                    <Col sm={9}>
                    <Input  type="select"
                            name="select"
                            name="Rol"
                    >
                        <option>Administrador</option>
                        <option>Usuario</option>
                    </Input>
                    </Col>
                </FormGroup>
                
                <FormGroup row className='mt-2'>
                    <Label sm={3}>Estado</Label>
                    <Col sm={9}>
                    <Input  type="select"
                            name="select"
                            name="Estado"
                    >
                        <option>Autorizado</option>
                        <option>No autorizado</option>
                        <option>Pendiente</option>
                    </Input>
                    </Col>
                </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" type="submit">Insertar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}



