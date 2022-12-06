import React from "react";
import { useNavigate } from "react-router-dom";
import { BasicButton } from "@components/Buttons/Button";
import styled from "styled-components";

type Column = {
  header: string;
  name: string;
};

const Table = styled.table`
  max-width: 1000px;
  margin-top: 2rem;
  text-align: center;

  th,
  td {
    padding: 0 1rem;
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

  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={`${index}-${column.name}`}>{column.header}</th>
          ))}
          {(hasUpdate || hasDelete) && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={`${row.id}-${column.name}`} label={column.header}>
                {row[column.name]
                  ? row[column.name].name || row[column.name]
                  : 0}
              </td>
            ))}
            {(hasUpdate || hasDelete) && (
              <td className="flex flex-wrap justify-center" label="Actions">
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
  );
}

export default DataTable;
