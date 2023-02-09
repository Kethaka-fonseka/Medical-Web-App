import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import NavBar from "../components/NavBar";

export default function Home() {
  const [patientList, setpatientList] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      dataField: "firstName",
      text: "First Name",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "lastName",
      text: "Last Name",
      sort: true,
      filter: textFilter(),
    },
    { dataField: "dob", text: "Date of Birth", filter: textFilter() },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      navigate(`/patient/${row._id}`)
    },
  };

  useEffect(() => {
    checkValidation();
    axios
      .get("http://localhost:8070/patients")
      .then((res) => {
        setpatientList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

const checkValidation = () =>{
 if(window.localStorage.getItem('username')==null){
  window.location.href = '/login'
 }
}

  return (
    <div>
      <NavBar/>
      <BootstrapTable
        bootstrap4
        keyField="First Name"
        columns={columns}
        data={patientList}
        pagination={pagination}
        filter={filterFactory()}
        rowEvents={rowEvents}
      />
    </div>
  );
}
