"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ChevronDownIcon, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "../Modal";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [countryFilter, setCountryFilter] = React.useState("All");
  const [dataset, setDataset] = React.useState(data);

  const statuses = ["All", ...new Set(data.map((item) => item.status))];
  const countries = ["All", ...new Set(data.map((item) => item.country))];

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
  });

  React.useEffect(() => {
    setDataset(data);
  }, [data]);
  // console.log("Dataset in table:", dataset);
  // console.log("Data in table:", data);

  const handleDelete = (product_id) => {
    const updatedDataset = dataset.filter(
      (item) => item.product_id !== product_id
    );
    setDataset(updatedDataset);
  };

  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const [viewData, setViewData] = React.useState(null);
  const handleView = (row) => {
    setViewData(row.original);
    setIsViewModalOpen(true);
  };

  const [editData, setEditData] = React.useState(null);
  const handleEdit = (row) => {
    setEditData(row.original);
    setIsEditModalOpen(true);
  };
  const handleInputChange = (key, newValue) => {
    setEditData((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };
  const handleSaveEdit = () => {
    const updatedDataset = dataset.map((item) =>
      item.product_id === editData.product_id ? editData : item
    );
    setDataset(updatedDataset);
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center py-4  justify-between gap-5">
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

      <div className="rounded-md border max-w-[600px] md:min-w-full">
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
            {table.getRowModel().rows?.length ? (
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
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Ellipsis className="w-4 h-4 cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="min-w-[6rem]">
                        <DropdownMenuItem onClick={() => handleEdit(row)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleView(row)}>
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                Delete
                              </span>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will delete
                                  your details and remove your data from our
                                  servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={(e) => {
                                    // console.log("Deleting row:", row.original);
                                    handleDelete(row.original.product_id);
                                  }}
                                  className={buttonVariants({
                                    variant: "destructive",
                                  })}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

        {viewData && (
          <Modal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            title="Order details"
          >
            <div className="flex flex-col gap-4">
              {Object.entries(viewData).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2">
                  <h4 className="uppercase">{key.replace(/_/g, " ")}</h4>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </Modal>
        )}

        {editData && (
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="Edit details"
          >
            <div className="flex flex-col gap-4">
              {Object.entries(editData).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2">
                  <h4 className="uppercase">{key.replace(/_/, " ")}</h4>
                  <Input
                    value={value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <Button onClick={handleSaveEdit}>Save Changes</Button>
              </div>
            </div>
          </Modal>
        )}
      </div>

      <div className="flex items-center gap-5  justify-end">
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
