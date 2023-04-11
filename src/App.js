
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

import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  StockOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

import Product from './List/Product.page';
import ProductAdd from './List/ProductAdd';
import Day from './Day/Day.page';


const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <div id='wrapper' >
        <Router>
          <Layout style={{ width: '100%', backgroundColor: 'white', height: '900px' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: ' rgba(0, 0, 0, 0.1)' }}> 
              <div className="logo"  >
                {/* <a className="logo" href='/'  ></a> */}
              </div>
              <Menu className=''  style={{ height:"100%" }}
                theme="light"
                width="100%"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                  {
                    key: '1',
                    icon: <HomeOutlined />,
                    label: <Link to="/">Dashboard</Link>,
                  },
                  {
                    key: '2',
                    icon: <UserOutlined />,
                    label: 'Bán hàng',
                    children: [
                      {
                        key: '2.1',
                        label: <Link to="/Day">Doanh thu bán lẻ theo ngày</Link>,
                      },
                      {
                        key: '2.2',
                        label: <Link to="/Income">Doanh thu bán lẻ theo tháng</Link>,
                      },
                    ]
                  },
                  {
                    key: '3',
                    icon: <StockOutlined />,
                    label: 'Báo cáo' ,
                    children: [
                      {
                        key: '3.1',
                        label: <Link to="/">Báo cáo cuối ngày bán hàng</Link>,
                      },
                      {
                        key: '3.2',
                        label: <Link to="/Report">Báo cáo bán hàng theo thời gian </Link>,
                      },
                    ]
                  },
                  {
                    key: '4',
                    icon: <UploadOutlined />,
                    label: <Link to="/Product">Product</Link>,
                  },
                ]}
              />
            </Sider>
            <Layout className="site-layout" >
              <Header style={{ padding: 0, background: colorBgContainer }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: () => setCollapsed(!collapsed),
                })}
              </Header>
              <Content 
                style={{
                  margin: '24px 16px',
                  height: '100%',
          
                  background: colorBgContainer,
                }}
              >
                <Routes>
                  <Route path="/Report" element={<Report />} /> 
                  <Route path="/Income" element={<Income />} /> 
                  <Route path="/Day" element={<Day />} /> 
                  <Route path="/Product" element={<Product />} /> 
                  <Route path="/Product/new" element={<ProductAdd />} /> 
                  <Route path="/Product/edit" element={<ProductAdd/>} /> 
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </Router>
      </div>
    </> 
  );
}

export default App;
