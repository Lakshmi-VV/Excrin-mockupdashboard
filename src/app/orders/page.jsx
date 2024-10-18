"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/Table/data-table";
import { columns } from "@/components/Table/columns";
import { data as initialData } from "@/components/Table/tabledata";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function OrderPage() {
  const [data, setData] = useState(initialData);
  const filteredColumns = columns.slice(1);
  const firstStepColumns = filteredColumns.slice(
    0,
    Math.ceil(filteredColumns.length / 2)
  );
  const secondStepColumns = filteredColumns.slice(
    Math.ceil(filteredColumns.length / 2)
  );
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFormSubmit = () => {
    const newOrder = {
      id: data.length + 1,
      ...formValues,
    };
    console.log("New order:", newOrder);

    setData((prevData) => {
      const updatedData = [...prevData, newOrder];
      console.log("Updated data:", updatedData);
      return updatedData;
    });
    setFormValues({});
    setStep(1);
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="flex flex-col gap-7">
      <Header title="Orders page" />

      <div className="w-full flex justify-between">
        <h2 className="text-2xl font-bold">Orders</h2>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Create new</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Enter the details</CardTitle>
                <CardDescription>
                  To create a new customer order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  {step === 1 &&
                    firstStepColumns.map((column) => (
                      <div
                        className="flex flex-col space-y-1 pb-3"
                        key={column.accessorKey}
                      >
                        <Label htmlFor={column.accessorKey}>
                          {column.header}
                        </Label>
                        <Input
                          id={column.accessorKey}
                          value={formValues[column.accessorKey] || ""}
                          onChange={handleInputChange}
                          placeholder={`Enter ${column.header.toLowerCase()}`}
                        />
                      </div>
                    ))}

                  {step === 2 &&
                    secondStepColumns.map((column) => (
                      <div
                        className="flex flex-col space-y-1 pb-3"
                        key={column.accessorKey}
                      >
                        <Label htmlFor={column.accessorKey}>
                          {column.header}
                        </Label>
                        <Input
                          id={column.accessorKey}
                          value={formValues[column.accessorKey] || ""}
                          onChange={handleInputChange}
                          placeholder={`Enter ${column.header.toLowerCase()}`}
                        />
                      </div>
                    ))}
                </form>
              </CardContent>
            </Card>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="outline">Cancel</Button>
              </AlertDialogCancel>
              {step > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
              )}
              {step === 1 ? (
                <Button onClick={nextStep}>Next</Button>
              ) : (
                <AlertDialogAction asChild>
                  <Button onClick={handleFormSubmit}>Create</Button>
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default OrderPage;
