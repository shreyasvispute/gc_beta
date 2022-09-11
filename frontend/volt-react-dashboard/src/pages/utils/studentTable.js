import faker from "faker";
// import axios from "../utils/http-axios";

import axios from "axios";

export function makeData(count, studentId) {
  let data = [];
  let options = [];
  // for (let i = 0; i < count; i++) {
  //   let row = {
  //     ID: faker.mersenne.rand(),
  //     firstName: faker.name.firstName(),
  //     lastName: faker.name.lastName(),
  //     email: faker.internet.email(),
  //     age: Math.floor(20 + Math.random() * 20),
  //     music: faker.music.genre(),
  //   };
  //   options.push({ label: row.music });

  //   data.push(row);
  //   console.log(data);
  // }

  // let columns = [
  //   {
  //     id: "firstName",
  //     label: "First Name",
  //     accessor: "firstName",
  //     minWidth: 100,
  //     dataType: DataTypes.TEXT,
  //     options: [],
  //   },
  //   {
  //     id: "lastName",
  //     label: "Last Name",
  //     accessor: "lastName",
  //     minWidth: 100,
  //     dataType: DataTypes.TEXT,
  //     options: [],
  //   },
  //   {
  //     id: "age",
  //     label: "Age",
  //     accessor: "age",
  //     width: 80,
  //     dataType: DataTypes.NUMBER,
  //     options: [],
  //   },
  //   {
  //     id: "email",
  //     label: "E-Mail",
  //     accessor: "email",
  //     width: 300,
  //     dataType: DataTypes.TEXT,
  //     options: [],
  //   },
  //   {
  //     id: "music",
  //     label: "Music Preference",
  //     accessor: "music",
  //     dataType: DataTypes.SELECT,
  //     width: 200,
  //     options: options,
  //   },
  //   {
  //     id: 999999,
  //     width: 20,
  //     label: "+",
  //     disableResizing: true,
  //     dataType: "null",
  //   },
  // ];

  let tableArray = [];
  getTableData(studentId).then((data) => {
    data.tables.map((e) => {
      let tables = {};
      tables["page"] = e.page;
      tables["table_num"] = e.table_num;
      tables["table_data"] = e.table_data;
      tables["image_path"] = e.image_path;
      tableArray.push(tables);
    });
    tableArray.map((e) => {
      let columnObject = [];
      let rows = [];
      let columnNames = [];

      let parsedColumns = JSON.parse(e.table_data)["schema"]["fields"];
      let rowNames = JSON.parse(e.table_data)["data"];

      rowNames.map((e) => {
        e["ID"] = faker.mersenne.rand();
      });
      rowNames.forEach((element) => {
        if (element[""] || element[""] === "") {
          delete element[""];
        }
      });
      rows.push(...rowNames);

      parsedColumns.map((n) => {
        let names = {};
        if (n.name !== "") {
          names["id"] = n.name;
          names["accessor"] = n.name;
          names["label"] = n.name;
          names["width"] = 100;
          names["disableResizing"] = false;
          names["dataType"] = DataTypes.TEXT;
          columnNames.push(names);
        }
      });
      columnNames.push({
        id: 999999,
        width: 20,
        label: "+",
        disableResizing: true,
        dataType: "null",
      });
      columnObject.push(columnNames);
      e.table_data = { columns: columnNames, data: rowNames };
    });
    console.log("tablearray", tableArray);
  });

  return {
    data: tableArray,
    skipReset: false,
    table_idx: 0,
  };
}

async function getTableData(studentId) {
  const response = await axios.get(
    `/api/students/${studentId}/transcript?action=view`
  );
  return response.data;
}

export function shortId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

export const ActionTypes = Object.freeze({
  UPDATE_TABLE_CONFIG: "update_table_config",
  ADD_OPTION_TO_COLUMN: "add_option_to_column",
  ADD_ROW: "add_row",
  UPDATE_COLUMN_TYPE: "update_column_type",
  UPDATE_COLUMN_HEADER: "update_column_header",
  UPDATE_CELL: "update_cell",
  ADD_COLUMN_TO_LEFT: "add_column_to_left",
  ADD_COLUMN_TO_RIGHT: "add_column_to_right",
  DELETE_COLUMN: "delete_column",
  ENABLE_RESET: "enable_reset",
});

export const DataTypes = Object.freeze({
  NUMBER: "number",
  TEXT: "text",
  SELECT: "select",
});
