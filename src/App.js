
// import './App.css';
import Income from './Income/Income.page';
import Report from './Report/Report.page';
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {

  return (
    <div className='App'>
      <Router>
        <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/home">My Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/Report">Report</Nav.Link>
              <Nav.Link href="/Income">Income</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/Report" element={<Report />} /> 
          <Route path="/Income" element={<Income />} /> 
        </Routes>
      </div>
    </Router>
  </div>
  );
}

export default App;
