import React from "react";
import { useNavigate } from "react-router-dom";
import { BasicButton } from "@components/Buttons/Button";

type Column = {
  header: string;
  name: string;
};

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
    <table className="w-5/6 mt-3 table-auto text-center">
      <thead>
        <tr>
          {columns.map((column) => (
            <th className="px-5" key={column.header}>
              {column.header}
            </th>
          ))}
          {(hasUpdate || hasDelete) && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td className="px-5" key={`${row.id}-${column.name}`}>
                {row[column.name].name || row[column.name]}
              </td>
            ))}
            {(hasUpdate || hasDelete) && (
              <td className="flex flex-wrap justify-center">
                {hasShowDetails && (
                  <BasicButton primary onClick={() => navigate(`./${row.id}`)}>
                    Voir
                  </BasicButton>
                )}
                {hasUpdate && (
                  <BasicButton warning onClick={() => handleUpdate(row.id)}>
                    Modifier
                  </BasicButton>
                )}
                {hasDelete && (
                  <BasicButton danger onClick={() => handleDelete(row.id)}>
                    Supprimer
                  </BasicButton>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
