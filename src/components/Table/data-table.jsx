"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  updateMyDataTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, SquarePen, CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Editcell } from "./editcell";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [countryFilter, setCountryFilter] = React.useState("All");
  const [dataset, setDataset] = React.useState(data);

  const filteredData = React.useMemo(() => {
    let filtered = dataset;
    if (statusFilter !== "All") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }
    if (countryFilter !== "All") {
      filtered = filtered.filter((item) => item.country === countryFilter);
    }

    return filtered;
  }, [dataset, statusFilter, countryFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setDataset((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
    },
  });
  const statuses = ["All", ...new Set(data.map((item) => item.status))];
  const countries = ["All", ...new Set(data.map((item) => item.country))];

  const [editingRow, setEditingRow] = React.useState(null);

  const handleEdit = (row) => {
    setEditingRow(row);
  };

  const handleSave = (row, column, value) => {
    const rowIndex = dataset.findIndex((item) => item.id === row.original.id);
    setDataset((prev) =>
      prev.map((item, index) =>
        index === rowIndex
          ? {
              ...prev[index],
              [column.id]: value,
            }
          : item
      )
    );
    setEditingRow(null);
  };
  React.useEffect(() => {
    setDataset(data);
  }, [data]);
  console.log("Dataset in table:", dataset);
  console.log("Data in table:", data);

  return (
    <div className="flex flex-col gap-9">
      <div className="flex items-center py-4  justify-between">
        <Input
          placeholder="Filter by product id..."
          value={table.getColumn("product_id")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("product_id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex gap-8">
          <div className="flex gap-5 items-center">
            <span>Show</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  All Column <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex gap-5 items-center">
            <span>Status</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  {statusFilter} <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {statuses.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex gap-5 items-center">
            <span>Country</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  {countryFilter} <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {countries.map((country) => (
                  <DropdownMenuCheckboxItem
                    key={country}
                    checked={countryFilter === country}
                    onCheckedChange={() => setCountryFilter(country)}
                    className="capitalize"
                  >
                    {country}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <SquarePen className="w-4 h-4 cursor-pointer" />
                  </TableCell>
                </TableRow>
              ))
           */}

            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.id === "select" ? (
                        <Checkbox
                          checked={cell.row.getIsSelected()}
                          onCheckedChange={(value) =>
                            cell.row.toggleSelected(!!value)
                          }
                          aria-label="Select row"
                        />
                      ) : editingRow && editingRow.id === row.id ? (
                        <Editcell
                          getValue={() => cell.getValue()}
                          row={row}
                          column={cell.column}
                          table={table}
                          onSave={(value) =>
                            handleSave(row, cell.column, value)
                          }
                        />
                      ) : (
                        <Editcell
                          getValue={() => cell.getValue()}
                          row={row}
                          column={cell.column}
                          table={table}
                          onSave={(value) =>
                            handleSave(row, cell.column, value)
                          }
                          isEditing={false}
                        />
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {editingRow && editingRow.id === row.id ? (
                      <CircleCheckBig
                        onClick={() => setEditingRow(null)}
                        className="h-4 w-4"
                      />
                    ) : (
                      <SquarePen
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => handleEdit(row)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center gap-5 p-4  justify-end">
        <Button
          variant="outline"
          size="md"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="py-2  px-5"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="py-2  px-5"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
