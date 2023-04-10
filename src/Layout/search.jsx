import React, { useState } from "react";
import { Button, Paper } from "@mui/material";
import Input from '@mui/material/Input';
export default function Search2(props) {
  const { handleSearch } = props;

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const doSearch = () => {
    const cleanText = search.trim().toLowerCase();
    handleSearch(cleanText, startDate, endDate);
  };


  return (
    <>
      <div className="col3">
        <div className="paper">
          <p className="typography">Tìm kiếm</p>
        
          <Input
            style={{ margin: '10px' }}
            type="text"
            placeholder="Tìm kiếm tên hợp đồng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                doSearch(search);
              }
            }}
          />
        </div>
      </div>
      <div className="col3_2" pt={3}>
        <Paper>
          <p className="typography">Ngày tạo hợp đồng</p>
          <div className="col3__calender">
            <p className="typographys"> Từ ngày</p>
            <Input
              className="col3__inputt"
              type="date"
              id="start-date"
              placeholder="dd-mm-yyyy"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col3_calenders">
            <p className="typographys">Đến ngày</p>
            <Input
              type="date"
              id="end-date"
              className="col3__input"
              placeholder="dd-mm-yyyy"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </Paper>
        <div>
        <Button className="col3__button btn-success" fullWidth onClick={doSearch}>Lọc</Button>
        </div>
      </div>
    </>
    
  );
}
