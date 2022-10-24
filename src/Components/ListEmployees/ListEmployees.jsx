
//import styles from './listEmployees.module.css'
import { useState, React } from "react";
import EmployeeService from "../../Services/employee.service";

import { useEffect } from "react";
import { Form, Button, Modal, Table } from 'rsuite';
import logo from '../../Assets/mainPageImages/logodreamco-ConvertImage.png'
import styles from "./listEmployees.module.css"
import 'rsuite/dist/rsuite.min.css';
import EmployeeUpdateModel from "../../Models/EmplyeeUpdateModel";


function ListEmployees() {

  document.body.className = ""

  //modalState
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [editing, setIsEditing]  = useState(false);
  const [modalData, setModalData] = useState({name: "", lastName: "", streetAddress: "", refStreet1:"", refStreet2: "", comments:"", id: 0});
  const handleOpen = (data) => {
    
    if(data == null)
      return;
    setModalData(data)
    setModalIsVisible(true);
  }
  const handleClose = () => {
    setModalIsVisible(false);
    setIsEditing(false);
  }

  const handleEdit = async () =>{
    let update = new EmployeeUpdateModel(modalData.name, modalData.lastName, modalData.streetAddress, modalData.refStreet1, modalData.refStreet2, modalData.comments)
    setModalIsVisible(false);
    setIsEditing(false);
    const postResponse = await EmployeeService.put(update, modalData.id);

    console.log(postResponse);
    fetchData()
  }

  //table
  let table = document.getElementsByClassName("rs-table");
  for (let i = 0; i < table.length; i++) {
    table[i].classList.add(styles.rsTable);
  }

  //header
  let tableHeader = document.getElementsByClassName("rs-table-header-row-wrapper");
  for (let i = 0; i < tableHeader.length; i++) {
    tableHeader[i].classList.add(styles.tableHeader);
  }

  //table row
  let tableRow = document.getElementsByClassName("rs-table-cell-last");
  for (let i = 0; i < tableRow.length; i++) {
    tableRow[i].classList.add(styles.rsTableRow);
  }

  const [data, setData] = useState([]);
  const { Column, HeaderCell, Cell } = Table;

  const fetchData = async () => {
    const response = await EmployeeService.GetAll();
    setData(response);
    console.log(data);
  }


  //sorting
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };


  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };



  useEffect(() => {
    console.log("loaded");
    fetchData();
  }, [])

  //renderizar
  return (
    <>
      <div className={styles.header}>
        <img src={logo} alt="" />
        <br /><br /><br /><br /><br /><hr className={styles.hr} />
        <h1>Employee List</h1>
      </div>
      <div className={"container " + styles.tableContainer}>
        <Table
          cellBordered
          hover={false}
          height={500}
          data={getData()}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          loading={loading}
          wordWrap="break-word"
        >
          <Column flexGrow={1} align="center" fixed sortable>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />

          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>First Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Last Name</HeaderCell>
            <Cell dataKey="lastName" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Address</HeaderCell>
            <Cell dataKey="streetAddress" />
          </Column>


          <Column flexGrow={.5} fixed="right">
            <HeaderCell></HeaderCell>

            <Cell>
              {rowData => (
                <span>
                  {/* <a onClick={() => alert(`id:${rowData.id}`)}> Options </a> */}
                  <Button color="red" appearance="primary" onClick={() => handleOpen(rowData)}>
                    View
                  </Button>
                </span>
              )}
            </Cell>
          </Column>
        </Table>



        <Modal size={"md"} open={modalIsVisible} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>Employee Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form fluid onChange={setModalData} formValue={modalData}>
            <Form.Group controlId="name-9">
              <Form.ControlLabel>Employee Name</Form.ControlLabel>
              <Form.Control name="name" onChange={() => {  setIsEditing(true)}}/>
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="address-9">
              <Form.ControlLabel>Employee Last Name</Form.ControlLabel>
              <Form.Control name="lastName" onChange={() => {setIsEditing(true)} } />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="address-9">
              <Form.ControlLabel>Employee Address</Form.ControlLabel>
              <Form.Control name="streetAddress" onChange={() => { setIsEditing(true)} }/>
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="refStreet1-9">
              <Form.ControlLabel>Username</Form.ControlLabel>
              <Form.Control name="refStreet1" onChange={() => { setIsEditing(true)} }/>
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="refStreet2-9">
              <Form.ControlLabel>Username</Form.ControlLabel>
              <Form.Control name="refStreet2" onChange={() => { setIsEditing(true)} }/>
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="textarea-9">
              <Form.ControlLabel>Textarea</Form.ControlLabel>
              <Form.Control rows={5} name="comments" onChange={() => { setIsEditing(true)} }/>
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            {
              editing ? (
                <>
                  <Button onClick={handleClose} appearance="primary" color="orange">
                    Discard Changes
                  </Button>
                  <Button onClick={handleEdit} appearance="primary" color="green">
                      Save and exit
                  </Button>
                </> 
              )
              : 
              <Button onClick={handleClose} appearance="primary" color="red" >
                Ok
              </Button>
            }
            
          </Modal.Footer>
        </Modal>
      </div>
    </>


  )

}


export default ListEmployees