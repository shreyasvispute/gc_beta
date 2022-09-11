import React, { useState, useEffect } from "react";
import { usePopper } from "react-popper";
import { ActionTypes, DataTypes, shortId } from "../../utils/studentTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TextIcon from "../../../assets/img/Text";
import MultiIcon from "../../../assets/img/Multi";
import HashIcon from "../../../assets/img/Hash";
import "../../../scss/style.css";

function getPropertyIcon(dataType) {
  switch (dataType) {
    case DataTypes.NUMBER:
      return <HashIcon />;
    case DataTypes.TEXT:
      return <TextIcon />;
    case DataTypes.SELECT:
      return <MultiIcon />;
    default:
      return null;
  }
}
export default function Header({
  column: { id, created, label, dataType, getResizerProps, getHeaderProps },
  setSortBy,
  table_idx,
  dataDispatch,
}) {
  const [expanded, setExpanded] = useState(created || false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [inputRef, setInputRef] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    strategy: "absolute",
  });
  const [header, setHeader] = useState(label);
  const [typeReferenceElement, setTypeReferenceElement] = useState(null);
  const [typePopperElement, setTypePopperElement] = useState(null);
  const typePopper = usePopper(typeReferenceElement, typePopperElement, {
    placement: "right",
    strategy: "fixed",
  });
  const [showType, setShowType] = useState(false);

  const buttons = [
    {
      onClick: (e) => {
        dataDispatch({
          type: ActionTypes.UPDATE_COLUMN_HEADER,
          columnId: id,
          label: header,
        });
        setExpanded(false);
      },
    },
    {
      onClick: (e) => {
        dataDispatch({
          type: ActionTypes.UPDATE_COLUMN_HEADER,
          columnId: id,
          label: header,
        });
        setExpanded(false);
      },
    },
    {
      onClick: (e) => {
        dataDispatch({
          type: ActionTypes.UPDATE_COLUMN_HEADER,
          columnId: id,
          label: header,
        });
        dataDispatch({
          type: ActionTypes.ADD_COLUMN_TO_LEFT,
          columnId: id,
          focus: false,
        });
        setExpanded(false);
      },
    },
    {
      onClick: (e) => {
        dataDispatch({
          type: ActionTypes.UPDATE_COLUMN_HEADER,
          columnId: id,
          label: header,
        });
        dataDispatch({
          type: ActionTypes.ADD_COLUMN_TO_RIGHT,
          columnId: id,
          focus: false,
        });
        setExpanded(false);
      },
    },
    {
      onClick: (e) => {
        dataDispatch({
          type: ActionTypes.UPDATE_COLUMN_HEADER,
          columnId: id,
          label: header,
        });
        dataDispatch({ type: ActionTypes.DELETE_COLUMN, columnId: id });
        setExpanded(false);
      },
    },
  ];

  const propertyIcon = getPropertyIcon(dataType);

  const types = [
    {
      onClick: (e) => {
        dataDispatch({
          type: "update_column_type",
          columnId: id,
          dataType: DataTypes.SELECT,
        });
        setExpanded(false);
      },
    },
    {
      onClick: (e) => {
        dataDispatch({
          type: "update_column_type",
          columnId: id,
          dataType: DataTypes.TEXT,
        });
        setExpanded(false);
      },
    },
    {
      onClick: (e) => {
        dataDispatch({
          type: "update_column_type",
          columnId: id,
          dataType: DataTypes.NUMBER,
        });
        setShowType(false);
        setExpanded(false);
      },
    },
  ];

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      dataDispatch({
        type: "update_column_header",
        columnId: id,
        label: header,
      });
      setExpanded(false);
    }
  }

  function handleChange(e) {
    setHeader(e.target.value);
  }

  function handleBlur(e) {
    e.preventDefault();
    dataDispatch({
      type: "update_column_header",
      columnId: id,
      label: header,
    });
  }
  function getHeader() {
    if (id !== 999999) {
      return (
        <>
          <div {...getHeaderProps()} className="th noselect d-inline-block">
            <div
              className="th-content"
              onClick={() => setExpanded(true)}
              ref={setReferenceElement}
            >
              <span className="svg-icon svg-gray icon-margin">
                {propertyIcon}
              </span>
              {label}
            </div>
            <div {...getResizerProps()} className="resizer" />
          </div>
          {expanded && (
            <div className="overlay" onClick={() => setExpanded(false)} />
          )}
          {expanded && (
            <div
              ref={setPopperElement}
              style={{ ...styles.popper, zIndex: 3 }}
              {...attributes.popper}
            >
              <div
                className="bg-white shadow-5 border-radius-md"
                style={{
                  width: 240,
                }}
              >
                <div
                  style={{
                    paddingTop: "0.75rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                  }}
                >
                  <div className="is-fullwidth" style={{ marginBottom: 12 }}>
                    <input
                      className="form-input"
                      ref={setInputRef}
                      type="text"
                      value={header}
                      style={{ width: "100%" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
                <div className="list-padding">
                  <button
                    className="sort-button"
                    type="button"
                    onMouseEnter={() => setShowType(true)}
                    onMouseLeave={() => setShowType(false)}
                    ref={setTypeReferenceElement}
                  >
                    <span className="svg-icon svg-text icon-margin">
                      {getPropertyIcon}
                    </span>
                    <span className="text-transform-capitalize">
                      {dataType}
                    </span>
                  </button>
                  {showType && (
                    <div
                      className="shadow-5 bg-white border-radius-md list-padding"
                      ref={setTypePopperElement}
                      onMouseEnter={() => setShowType(true)}
                      onMouseLeave={() => setShowType(false)}
                      {...typePopper.attributes.popper}
                      style={{
                        ...typePopper.styles.popper,
                        width: 200,
                        backgroundColor: "white",
                        zIndex: 4,
                      }}
                    >
                      {types.map((type) => (
                        <button className="sort-button" onClick={type.onClick}>
                          <span className="svg-icon svg-text icon-margin">
                            {type.icon}
                          </span>
                          {type.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div
                  className="list-padding"
                  key={shortId()}
                  // style={{
                  //   borderTop: `2px solid`,
                  // }}
                >
                  {buttons.map((button) => (
                    <button
                      type="button"
                      className="sort-button"
                      onMouseDown={button.onClick}
                    >
                      <span className="svg-icon svg-text icon-margin">
                        {button.icon}
                      </span>
                      {button.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      );
    }
    return (
      <div {...getHeaderProps()} className="th noselect d-inline-block">
        <div
          className="th-content d-flex justify-content-center"
          onClick={(e) =>
            dataDispatch({
              type: "add_column_to_left",
              columnId: 999999,
              focus: true,
            })
          }
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (created) {
      setExpanded(true);
    }
  }, [created]);

  useEffect(() => {
    setHeader(label);
  }, [label]);

  useEffect(() => {
    if (inputRef) {
      inputRef.focus();
      inputRef.select();
    }
  }, [inputRef]);

  return getHeader();
}
