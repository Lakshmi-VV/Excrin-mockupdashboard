"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { SquarePen } from "lucide-react";
import { Editcell } from "./editcell";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product_id",
    header: "Product Id",
    cell: Editcell,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: Editcell,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: Editcell,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: Editcell,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: Editcell,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: Editcell,
  },
  {
    accessorKey: "total_price",
    header: "Total Price",
    cell: Editcell,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: Editcell,
  },
  {
    accessorKey: "payment_method",
    header: "Payment",
    cell: Editcell,
  },
];
