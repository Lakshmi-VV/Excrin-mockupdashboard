"use client";
import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/Table/data-table";
import { columns } from "@/components/Table/columns";
import { data as initialData } from "@/components/Table/orderdata";
import Modal from "@/components/Modal";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

function OrderPage() {
  const { toast } = useToast();

  const [isOpen, setIsOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [error, setError] = React.useState(null);

  const [dataTableData, setDataTableData] = React.useState(initialData);
  const handleCreate = () => {
    setIsOpen(true);
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (Object.values(formData).some((value) => value !== "")) {
      setDataTableData([...dataTableData, formData]);
      setIsOpen(false);
      setFormData({});
      setError(null);
    } else {
      setError("Please fill in atleast one field");
    }
  };

  return (
    <div className="flex flex-col gap-7 px-8">
      <Header title="Orders page" />

      <div className="w-full flex justify-between">
        <h2 className="text-2xl font-bold">Orders</h2>

        <Button onClick={handleCreate}>Create new</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Create new order"
        >
          <div className="flex flex-col gap-4">
            {columns.slice(1).map((column) => (
              <div key={column.accessorKey} className="grid grid-cols-2">
                <h4 className="uppercase">{column.header}</h4>
                <Input
                  name={column.accessorKey}
                  value={formData[column.accessorKey]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  handleSubmit();
                  toast({
                    description: "Your order has been created.",
                    duration: 1000,
                  });
                }}
              >
                Create
              </Button>
            </div>
          </div>
        </Modal>
      </div>

      <DataTable columns={columns} data={dataTableData} />
      <Toaster />
    </div>
  );
}

export default OrderPage;
