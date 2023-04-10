
// import './App.css';
import React, { useState } from 'react';
import Income from './Income/Income.page';
import Report from './Report/Report.page';
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Navbar, Nav } from "react-bootstrap";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Divider from '@mui/material/Divider'
import './App.css'

import Product from './List/Product.page';
import ProductAdd from './List/ProductAdd';

function App() {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className='App'>
      <div className='navvs'>
        <div>
          <IconButton
            style={{ margin: '5px' }}
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleToggle}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={open}
            onClose={handleToggle}
            className="my-custom-drawer"
          >
            <List>
              <ListItem >
              <Nav.Link style={{ justifyContent: 'center' }} href="/home">Home</Nav.Link>
              </ListItem>
              <ListItem >
              <Nav.Link href="/Report">Report</Nav.Link>
              </ListItem>
              <ListItem >
              <Nav.Link href="/Income">Income</Nav.Link>
              </ListItem>
              <ListItem >
              <Nav.Link href="/Product">Product</Nav.Link>
              </ListItem>
            </List>
          </Drawer>
        </div>
        {/* <div className='navvs_left'>
          <a>
            <span>Chi tiết bán hàng theo sản phẩm (Pivot)</span>
          </a>
        </div> */}
        
      </div>
      <Router>
        <div>
          <Routes>
            <Route path="/Report" element={<Report />} /> 
            <Route path="/Income" element={<Income />} /> 
            <Route path="/Product" element={<Product />} /> 
            <Route path="Product/new" element={<ProductAdd />} /> 
            <Route path="Product/edit" element={<ProductAdd/>} /> 
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
