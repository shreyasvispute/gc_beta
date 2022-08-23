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
import { JsonToTable } from "react-json-to-table";
import axios from "../utils/http-axios";

export default () => {
  let params = useParams();
  const [studentName, setStudentName] = useState("");
  const [tables, setTables] = useState([]);

  useEffect(() => {
    if (tables.length === 0) {
      fetchData();
      document.title = `View Table Data`;
    }
  }, [studentName]);

  const fetchData = async () => {
    const response = await axios
      .get(`/api/students/${params["id"]}/transcript?action=viewtables`)
      .then((response) => {
        response.data.tables.forEach((e) => {
          delete e._id;
        });

        setTables(response.data["tables"]);
        setStudentName(response.data["student_name"]);
      })
      .catch();
    console.log(response);
  };

  return (
    <>
      <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="mb-4 mb-lg-0">
          <h4>Transcript</h4>
          <p className="mb-0">
            You are viewing the processed transcript of student [{studentName}].
          </p>
        </div>
      </div>
      <div>
        <Row>
          <Col>
            <JsonToTable
              hover
              className="user-table align-items-center"
              json={tables}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};
