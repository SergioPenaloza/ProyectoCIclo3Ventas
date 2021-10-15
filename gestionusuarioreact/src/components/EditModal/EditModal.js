import "bootstrap/dist/css/bootstrap.min.css";
import { Button , Label, Col, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Form, Input
} from "reactstrap";
import React, {useState} from "react"

export default function EditModal(props) {
    const { showEditModal, setShowEditModal, data, setData, item , ...rest } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setShowEditModal(!showEditModal);

    const handleSubmit = (e) => {
        e.preventDefault()
        const Usuario = e.target.Usuario.value;
        const Rol = e.target.Rol.value;
        const Estado= e.target.Estado.value;
        const id =  item.id
        const personArray = [{ Usuario, Rol, Estado,id}]
        let nuewData = data.map(obj => personArray.find(o => o.id === obj.id) || obj);
        setData(nuewData);
        setShowEditModal(false)
    }

    console.log("data:", data)


    return (
        <Modal isOpen={showEditModal} toggle={toggle}>
            <Form onSubmit={handleSubmit}>
                <ModalHeader>
                    <div><h3>Editar</h3></div>
                </ModalHeader>
                <ModalBody>
                <FormGroup row>
                <Label sm={3}>ID</Label>
                <Col sm={9}>
                    <input className="form-control"  type="text"
                                name="id"
                                readOnly
                                value={item.id}
                                />
                               </Col> 
                </FormGroup>

                

                <FormGroup row className='mt-2'>
                <Label sm={3}>Name</Label>
                <Col sm={9}>
                    <input className="form-control"  type="text"
                                name="Usuario"
                                placeholder=""
                                defaultValue={item.Usuario}
                                required
                                />
                               </Col> 
                </FormGroup>

                <FormGroup row className='mt-2'>
                    <Label sm={3}>Rol</Label>
                    <Col sm={9}>
                    <Input type="select" name="select" name="Rol" defaultValue={item.Rol}>
                            <option>Administrador</option>
                            <option>Usuario</option>
                        </Input>
                    </Col>
                </FormGroup>
                
                <FormGroup row className='mt-2'>
                    <Label sm={3}>Estado</Label>
                    <Col sm={9}>
                        <Input type="select" name="select" name="Estado" defaultValue={item.Estado}>
                            <option>Autorizado</option>
                            <option>No autorizado</option>
                            <option>Pendiente</option>
                        </Input>
                    </Col>
                </FormGroup>

                </ModalBody>

                <ModalFooter>
                    <Button color="primary" type="submit">Guardar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}