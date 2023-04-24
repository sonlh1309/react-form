import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Income from '../Income/Income.page';
import Cookies from "js-cookie";
import Report from '../Report/Report.page';
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as HashRouter, Router, Routes, Route, Link } from "react-router-dom";
import '../App.css'
import Dropdown from "react-bootstrap/Dropdown";
import { deleteDetailUser } from '../store/reducers/user.reducer';
import Chitietsp from '../Chitiet/Chitiet.page';

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

import Product from '../List/Product.page';
import ProductAdd from '../List/ProductAdd';
import Day from '../Day/Day.page';
import Quy from '../Quy/Quy.page';
import Year from '../Year/Year.page';
import ChangePass from '../ChangePass/ChangePass.page';
import Chungtu from '../Chungtu/Chungtu.page';

const { Header, Sider, Content } = Layout;


export default function HomePage(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { detailUser } = useSelector((state) => state.user);

  const logout = async () => {
    Cookies.remove("token");
    dispatch(deleteDetailUser());
  };

  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
    
      <div id='wrapper' >
    
          <Layout style={{ width: '100%', backgroundColor: 'white', height: '900px' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: ' rgba(0, 0, 0, 0.1)' }}> 
              <div className="logo"></div>
              <Menu className=''
                style={{ height: "100%" }}
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
                        label: <Link to="/dtbanletheongay">Doanh thu bán lẻ theo ngày</Link>,
                      },
                      {
                        key: '2.2',
                        label: <Link to="/dtbanletheothang">Doanh thu bán lẻ theo tháng</Link>,
                      },
                      {
                        key: '2.3',
                        label: <Link to="/dtbanletheoquy">Doanh thu bán lẻ theo quý</Link>,
                      },
                      {
                        key: '2.4',
                        label: <Link to="/dtbanletheonam">Doanh thu bán lẻ theo năm</Link>,
                      },
                      {
                        key: '2.5',
                        label: <Link to="/dtbanletheoct">Doanh thu bán lẻ theo chứng từ</Link>,
                      },
                      {
                        key: '2.6',
                        label: <Link to="/dtbanletheovt">Doanh thu bán lẻ theo sản phẩm</Link>,
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
               
                <span className='tool__right'>
              
                <Dropdown>
                  <Dropdown.Toggle
                    className="setting__dropdown d-flex align-items-center btn-black" 
                    id="dropdown-basic"
                  >
                    <i className="bx bx-chevron-down"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="drop__menu">
                    <Dropdown.Item href="">Quản lí tài khoản</Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/changepass")}> 
                      Đổi mật khẩu
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => logout()}>Đăng xuất</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </span>
              <span className="admin_name">{detailUser ? detailUser.name : ""}</span>
              </Header>
              <Content 
                style={{
                  margin: '24px 16px',
                  height: '100%',
                  background: colorBgContainer,
                }}
              >
                <Routes>
                  {/* <Route path="/" exact component={HomePage} /> */}
                  <Route path="/Report"           element={<Report />} /> 
                  <Route path="/dtbanletheothang" element={<Income />} /> 
                  <Route path="/dtbanletheongay"  element={<Day />} /> 
                  <Route path="/dtbanletheoquy"   element={<Quy />} /> 
                  <Route path="/dtbanletheonam"   element={<Year />} /> 
                  <Route path="/dtbanletheoct"    element={<Chungtu />} /> 
                  <Route path="/dtbanletheovt"    element={<Chitietsp/>} /> 
                  <Route path="/Product"          element={<Product />} /> 
                  <Route path="/Product/new"      element={<ProductAdd />} /> 
                  <Route path="/Product/edit"     element={<ProductAdd />} /> 
                  <Route path="/changepass"       element={<ChangePass/>}/>
                </Routes>
              </Content>
            </Layout>
          </Layout>

      </div>
    </> 
  );
}