import { Table, Button } from "react-bootstrap";
import React from "react";

type Column = {
  header: string;
  name: string;
};

function DataTable({
  columns,
  rows,
  hasUpdate,
  hasDelete,
  handleUpdate,
  handleDelete,
}: {
  columns: Column[];
  rows: any[];
  hasUpdate: boolean;
  hasDelete: boolean;
  handleUpdate: Function;
  handleDelete: Function;
}) {
  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.header}>{column.header}</th>
          ))}
          {(hasUpdate || hasDelete) && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={`${row.id}-${column.name}`}>
                {row[column.name].name || row[column.name]}
              </td>
            ))}
            {(hasUpdate || hasDelete) && (
              <td>
                {hasUpdate && (
                  <Button
                    className="me-2"
                    variant="warning"
                    onClick={() => handleUpdate(row.id)}
                  >
                    Modifier
                  </Button>
                )}
                {hasDelete && (
                  <Button variant="danger" onClick={() => handleDelete(row.id)}>
                    Supprimer
                  </Button>
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
