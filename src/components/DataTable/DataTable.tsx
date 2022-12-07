import React, { ChangeEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { BasicButton } from "@components/Buttons/Button";
import { Input } from "@components/forms/Inputs";

type Column = {
  header: string;
  name: string;
};

const Table = styled.table`
  max-width: 1500px;
  margin-top: 2rem;
  text-align: center;

  th,
  td {
    padding: 0 1rem;
  }

  tr td:last-child {
    display: flex;
  }

  @media (max-width: 700px) {
    & thead {
      display: none;
    }

    & tr {
      border-bottom: 0.1px solid black;
    }

    & td {
      display: flex;
    }

    & td::before {
      content: attr(label);
      font-weight: bold;
      width: 120px;
      min-width: 120px;
    }
  }
`;

const SortingIcon = styled.i`
  transform: scale(60%);
  position: relative;
  top: 0.4rem;
  margin-left: 0.5rem;
`;

function DataTable({
  columns,
  rows,
  hasShowDetails,
  hasUpdate,
  hasDelete,
  handleUpdate,
  handleDelete,
}: {
  columns: Column[];
  rows: any[];
  hasShowDetails?: boolean;
  hasUpdate: boolean;
  hasDelete: boolean;
  handleUpdate: Function;
  handleDelete: Function;
}) {
  const navigate = useNavigate();
  const [sortedRows, setSortedRows] = useState([] as any[]);
  const [filteredRows, setFilteredRows] = useState([] as any[]);
  const [sortType, setSortType] = useState("id");
  const [filter, setFilter] = useState("");

  const sortRows = (type: string) => {
    const sorted: any[] = [...rows].sort((a, b) => {
      switch (type) {
        case "id":
          return parseInt(a.id) - parseInt(b.id);
        case "type":
          return a.type.name.localeCompare(b[type].name);
        case "address":
          return a.address.name.localeCompare(b[type].name);
        case "date":
          const date1 = Date.parse(a.date);
          const date2 = Date.parse(b.date);
          return date2 - date1;
        default:
          return a[type].localeCompare(b[type]);
      }
    });
    setSortedRows(sorted);
  };

  const filterRows = (filter: string) => {
    if (filter === "") setFilteredRows(sortedRows);

    const filtered = [...sortedRows].filter((item) =>
      item.name.includes(filter)
    );
    setFilteredRows(filtered);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setFilter(value);
  };

  useEffect(() => {
    sortRows(sortType);
  }, [sortType]);

  useEffect(() => {
    filterRows(filter);
  }, [filter, sortedRows]);

  return (
    <div>
      <div>
        <Input
          type="text"
          label="Filter les donnnées"
          name="filter"
          value={filter}
          setValue={onChange}
        />
      </div>
      <Table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={`${index}-${column.name}`}>
                {column.header}
                <button onClick={() => setSortType(column.name)}>
                  <SortingIcon className="material-icons">north</SortingIcon>
                </button>
              </th>
            ))}
            {(hasUpdate || hasDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td
                  key={`${row.id}-${column.name}`}
                  label={column.header}
                  onClick={() => setSortType(column.name)}
                >
                  {row[column.name]
                    ? row[column.name].name || row[column.name]
                    : 0}
                </td>
              ))}
              {(hasUpdate || hasDelete) && (
                <td label="Actions">
                  {hasShowDetails && (
                    <BasicButton
                      variant="primary"
                      onClick={() => navigate(`./${row.id}`)}
                    >
                      Voir
                    </BasicButton>
                  )}
                  {hasUpdate && (
                    <BasicButton
                      variant="warning"
                      onClick={() => handleUpdate(row.id)}
                    >
                      Modifier
                    </BasicButton>
                  )}
                  {hasDelete && (
                    <BasicButton
                      variant="danger"
                      onClick={() => handleDelete(row.id)}
                    >
                      Supprimer
                    </BasicButton>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DataTable;
