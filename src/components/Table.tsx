import { useMemo } from "react";
import MaterialReactTable from "material-react-table";

import { useParams } from "react-router-dom";

import { TableProps } from "../interfaces/table.interface";

export const Table: React.FC<TableProps> = ({
  data,
  enableTableHead = true,
}) => {
  const params = useParams();
  const pair = params.pair?.split("_") || "_";

  const columns = useMemo(
    () => [
      {
        muiTableBodyCellProps: () => ({
          className: enableTableHead ? "bids" : "asks",
        }),
        accessorKey: "price",
        header: `Price(${pair[1]})`,
      },
      {
        accessorKey: "amount",
        header: `Amount(${pair[0]})`,
      },
      {
        accessorKey: "total",
        header: "Total",
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      // @ts-ignore
      columns={columns}
      data={data}
      enableTableHead={enableTableHead}
      enableColumnActions={false}
      enableColumnFilters={false}
      enablePagination={false}
      enableSorting={false}
      enableBottomToolbar={false}
      enableTopToolbar={false}
      muiTableBodyRowProps={{ hover: false }}
    />
  );
};

export default Table;
