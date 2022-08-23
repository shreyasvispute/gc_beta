import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  ButtonGroup,
  Row,
  Col,
  InputGroup,
  Form,
  Dropdown,
  Card,
  Table,
  Image,
  DropdownButton,
  Modal,
  Spinner,
  Container,
  Accordion,
} from "@themesberg/react-bootstrap";
import { useParams } from "react-router-dom";
import { useTable } from "react-table";
import { JsonToTable } from "react-json-to-table";
import LoadingOverlay from "react-loading-overlay";
import { Document, Page, Outline } from "react-pdf/dist/esm/entry.webpack";
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faCog,
  faCheck,
  faSearch,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../utils/http-axios";
import uploadService from "../utils/fileUploadServices";
import studentServices from "../utils/studentServices";
import Documentation from "../../components/Documentation";
import AccordionComponent from "../../components/AccordionComponent";
// import testImage from "C:\\Projects\\GC_beta\\GC_beta\\sample_output\\Deng\\p1-t3.png"
// let testImage = require("C:\\Projects\\GC_beta\\GC_beta\\sample_output\\Deng\\p1-t3.png")

//Ry
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import { Column, HeaderCell, Cell } from "rsuite-table";

export default () => {
  let params = useParams();
  const [studentName, setStudentName] = useState("");
  const [tables, setTables] = useState([]);

  useEffect(() => {
    if (tables.length === 0) {
      fetchData();
      document.title = `View Transcripts`;
      console.log("viewing transcripts of student: ");
    }
    console.log(studentName);
  }, [studentName]);

  const fetchData = async () => {
    const response = await axios
      .get(`/api/students/${params["id"]}/transcript?action=view`)
      .then((response) => {
        //console.log(response.data['tables']);
        setTables(response.data["tables"]);
        setStudentName(response.data["student_name"]);
      })
      .catch();
  };

  const columns = [
    {
      //=(alldata) => [console.log(alldata[0]),
      dataField: "index",
      text: "index",
    },
    {
      dataField: "Course Title",
      text: "Course Title",
    },
    {
      dataField: "Credit",
      text: "Credit",
    },
    {
      dataField: "Score",
      text: "Score",
    },
    {
      dataField: "Grade Point",
      text: "Grade Point",
    },
  ];

  const EditCell = ({ rowData, onChange, ...props }) => {
    tables.map((table) => {
      rowData = JSON.parse(table.table_data)["data"];

      console.log(JSON.parse(table.table_data)["schema"]["fields"]);
    });
    console.log("obgynnnnnnnnnnnnnnnnnnnnnnnn");
    console.log(rowData);
    console.log("rowDatazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
    return (
      <Cell {...props}>
        {rowData !== null ? (
          <input className="input" defaultValue={JSON.stringify(rowData)} />
        ) : (
          rowData
        )}
      </Cell>
    );
  };

  //Ry---modified
  const onSaveData = async () => {
    // const columns = Array.from(tableEl.querySelectorAll("th")).map(
    //   (it) => it.textContent
    // );
    // const rows = tableEl.querySelectorAll("tbody > tr");
    // return Array.from(rows).map((row) => {
    //   const cells = Array.from(row.querySelectorAll("td"));
    //   return columns.reduce((obj, col, idx) => {
    //     obj[col] = cells[idx].textContent;
    //     return obj;
    //   }, {});
    // });

    console.log("Save data");
  };

  return (
    <>
      <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="mb-4 mb-lg-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Students List</Breadcrumb.Item>
            <Breadcrumb.Item active>Prepared Transcripts</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Prepared Transcripts</h4>
          <p className="mb-0">
            You are viewing the processed transcript of student [{studentName}].
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="primary" size="sm">
            <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New Student
          </Button>
        </div>
      </div>
      <Accordion defaultActiveKey="0">
        {tables.map((table, idx) => {
          let columnNames = JSON.parse(table.table_data)["schema"]["fields"];
          const newColumnNames = columnNames.map((v) => ({
            ...v,
            dataField: v.name,
            text: v.name,
          }));

          return (
            <Accordion.Item eventKey={idx} key={"table-" + idx}>
              <Accordion.Header>
                Table {idx} on Page {table.page}
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>
                    <Image src={table.image_path} />
                  </Col>
                  {/* Ry*/}
                  <Col>
                    <BootstrapTable
                      key={`$(table.page) "+" $(table.table_num)`}
                      keyField="index"
                      data={JSON.parse(table.table_data)["data"]}
                      columns={newColumnNames}
                      cellEdit={cellEditFactory({
                        mode: "click",
                        blurToSave: true,
                      })}
                    />

                    <Button type="submit" id="btn" onClick={onSaveData}>
                      save
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <EditCell />
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <Row>
        <Col>
          <Link
            to={{
              pathname: `/ViewTableData/${params["id"]}`,
            }}
          >
            <Button> View Table Data </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};
