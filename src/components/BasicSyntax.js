import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../App.css";

function BasicSyntax() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" style={{backgroundColor: '#0088CC',marginBottom: '3px', marginLeft: '1px'}} onClick={handleShow}>
        Tips
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Basic Syntax</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"><h5><b>Element</b></h5></th>
                <th scope="col"><h5><b>Markdown Syntax</b></h5></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Heading</th>
                <td># H1 <br/>## H2 <br/>### H3</td>
              </tr>
              <tr>
                <th scope="row">Bold</th>
                <td>**bold text**</td>
              </tr>
              <tr>
                <th scope="row">Italic</th>
                <td>*italicized text*</td>
              </tr>
              <tr>
                <th scope="row">Blockquote</th>
                <td>&gt; blockquote</td>
              </tr>
              <tr>
                <th scope="row">Ordered List</th>
                <td>1. First item <br/>2. Second item <br/>3. Third item</td>
              </tr>
              <tr>
                <th scope="row">Unordered List</th>
                <td>- First item <br/>- Second item <br/>- Third item</td>
              </tr>
              <tr>
                <th scope="row">Code</th>
                <td>`code`</td>
              </tr>
              <tr>
                <th scope="row">Horizontal Rule</th>
                <td>---</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BasicSyntax;
