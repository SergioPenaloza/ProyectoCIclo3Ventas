import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Input, Button , Container, Modal, ModalBody, ModalHeader,
          FormGroupm, ModalFooter, FormGroup
} from "reactstrap";
import React, {useState} from "react"

import AddModal from './components/AddModal';
import EditModal from './components/EditModal';

import { BsFillPencilFill, BsTrash } from "react-icons/bs";

const URL = "https://jsonplaceholder.typicode.com/users"

function App() {
  // const initialState = [
  //   { id: 1, usuario: "Juan" , rol: "Administrador", estado: "Autorizado"},
  //   { id: 2, usuario: "Yeraldine" , rol: "Administrador", estado: "Pendiente"}
  // ]
const initialState = []

  const[data, setData] =  useState(initialState)


  // Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const [item, setItem] = useState({})

  const insertFn = () => {
    setShowAddModal(true);
  }

  const editFn = (item) => {
    setShowEditModal(true);
    setItem(item);
 }

 const deleteFn = (id) => {
   let opcion = window.confirm("Are you sure you want to delete"+id);
   if (opcion == true) {
      const newdata = data.filter(e => e.id !== id );
      setData(newdata)
    }
}

 const restartFn = () => {
    setData(initialState);
 }

 



  
  return (
    <>
    <Container>
      <h1>Menú Gestión de Usuarios</h1>
      <div>Usted ingresó como: <Button outline color="primary">Administrador</Button>{' '}</div>
        <br></br>
          <Button color="primary"  onClick={()=>insertFn()}  className='m-2'>Insertar nuevo usuario</Button>
          <Button color="primary"  onClick={()=>restartFn()}  className='m-2'>Restart Data</Button>
        <br></br>
        <Table striped>
            <thead>
              <tr>
                <th>Id</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
                {data.map((item)=>(
                      <tr key={item.id}>
                        <td>{item.id}</td>
                         <td>{item.Usuario}</td>
                         <td>{item.Rol}</td>
                         <td>{item.Estado}</td>
                         <td>
                           <Button color="primary" onClick={()=>editFn(item)}><BsFillPencilFill/></Button>{" "}
                           <Button color="danger" onClick={()=>deleteFn(item.id)}><BsTrash/></Button> 
                        </td>
                      </tr>  
                ))}
            </tbody>
        </Table>
    </Container>

    <AddModal  showAddModal={showAddModal} setShowAddModal={setShowAddModal} setData={setData} data={data}  />
    <EditModal  showEditModal={showEditModal} setShowEditModal={setShowEditModal} setData={setData} data={data} item={item} />
    
    <Container>
      
    </Container>
    </>
  );
}

export default App;
