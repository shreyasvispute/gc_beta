import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Row,
  Col,
  Image,
  Accordion,
} from "@themesberg/react-bootstrap";
import { useParams } from "react-router-dom";
import { useTable } from "react-table";
import { JsonToTable } from "react-json-to-table";
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "../utils/http-axios";
import Table from "./ActionTable";
import EditTableCell from "./EditTableCell";
// import testImage from "C:\\Projects\\GC_beta\\GC_beta\\sample_output\\Deng\\p1-t3.png"
// let testImage = require("C:\\Projects\\GC_beta\\GC_beta\\sample_output\\Deng\\p1-t3.png")

export default () => {
  let params = useParams();
  const [rowdata, setRowData] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [tables, setTables] = useState([]);

  const data = React.useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
      },
      {
        col1: "react-table",
        col2: "rocks",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
    ],
    []
  );
  const columns = [
    {
      Header: "Name",
      accessor: "username",
      Cell: EditTableCell,
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: EditTableCell,
    },
  ];

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setRowData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const onAddRowClick = () => {
    setRowData(
      rowdata.concat({ username: "", email: "", gender: "", phone: "" })
    );
  };

  const onSaveData = async () => {
    console.log("Save data");
  };

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
        // console.log(response.data['tables']);
        setTables(response.data["tables"]);
        setStudentName(response.data["student_name"]);
      })
      .catch();
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
                  <Col>
                    <JsonToTable
                      hover
                      className="user-table align-items-center"
                      json={JSON.parse(table.table_data)["data"]}
                    />
                    <button
                      onClick={onAddRowClick}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Add Row
                    </button>
                    <div className="flex justify-center mt-8">
                      <pre>{JSON.parse(table.table_data)["Schema"]}</pre>

                      <Table columns={columns} data={rowdata} />
                    </div>
                    <button
                      onClick={onSaveData}
                      className="bg-green-500  mt-8 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Save
                    </button>
                    {/*<Table {...getTableProps()} hover className="user-table align-items-center">*/}
                    {/*    <thead>*/}
                    {/*    {// Loop over the header rows*/}
                    {/*        headerGroups.map(headerGroup => (*/}
                    {/*            // Apply the header row props*/}
                    {/*            <tr {...headerGroup.getHeaderGroupProps()}>*/}
                    {/*                {// Loop over the headers in each row*/}
                    {/*                    headerGroup.headers.map(column => (*/}
                    {/*                        // Apply the header cell props*/}
                    {/*                        <th {...column.getHeaderProps()}>*/}
                    {/*                            {// Render the header*/}
                    {/*                                column.render('Header')}*/}
                    {/*                        </th>*/}
                    {/*                    ))}*/}
                    {/*            </tr>*/}
                    {/*        ))}*/}
                    {/*    </thead>*/}
                    {/*    /!* Apply the table body props *!/*/}
                    {/*    <tbody {...getTableBodyProps()}>*/}
                    {/*    {// Loop over the table rows*/}
                    {/*        rows.map(row => {*/}
                    {/*            // Prepare the row for display*/}
                    {/*            prepareRow(row)*/}
                    {/*            return (*/}
                    {/*                // Apply the row props*/}
                    {/*                <tr {...row.getRowProps()}>*/}
                    {/*                    {// Loop over the rows cells*/}
                    {/*                        row.cells.map(cell => {*/}
                    {/*                            // Apply the cell props*/}
                    {/*                            return (*/}
                    {/*                                <td {...cell.getCellProps()}>*/}
                    {/*                                    {// Render the cell contents*/}
                    {/*                                        cell.render('Cell')}*/}
                    {/*                                </td>*/}
                    {/*                            )*/}
                    {/*                        })}*/}
                    {/*                </tr>*/}
                    {/*            )*/}
                    {/*        })}*/}
                    {/*    </tbody>*/}
                    {/*</Table>*/}
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </>
  );
};
