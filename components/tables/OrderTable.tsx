"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/types/Order";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface OrderTableProps {
  orders: Order[];
}

const OrderTable = ({ orders }: OrderTableProps) => {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/dashboard/order/${id}`);
  };

  const handleDelete = (id: string) => {};

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Order Number</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Order Status</TableHead>
          <TableHead className="text-right">Edit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order._id}>
            <TableCell className="font-medium">{order.invoiceNumber}</TableCell>
            <TableCell>{order.orderNumber}</TableCell>
            <TableCell>{order.orderedDate}</TableCell>
            <TableCell>{order.userId.email}</TableCell>
            <TableCell>{order.totalPrice}</TableCell>
            <TableCell>{order.deliveryStatusMessage}</TableCell>
            <TableCell>
              <div className="flex gap-4 justify-end">
                {/* <button onClick={() => handleDelete(order._id)}>
                  <Image
                    src={"/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </button> */}
                <button onClick={() => handleEdit(order._id)}>
                  <Image
                    src={"/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
