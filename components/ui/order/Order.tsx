"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { Order } from "@/types/Order";
import React from "react";
import CustomStatusSelect from "@/components/custom/CustomStatusSelect";
import { updateOrderById } from "@/lib/actions/Order";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import { formatDate } from "@/lib/utils";
import ProductCard from "../product/ProductCard";

interface OrderProps {
  order: Order;
}

const formSchema = z.object({
  orderDeliveryStatus: z.string(),
});

const OrderById = ({ order }: OrderProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderDeliveryStatus: order.deliveryStatusMessage,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateOrderById(order._id, values);
    router.refresh();
  }

  const statusOptions = [
    { _id: "1", status: "Pending" },
    { _id: "2", status: "Completed" },
    { _id: "3", status: "Cancelled" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="font-bold text-xl">Order ID: {order.orderNumber}</p>
        <div className="flex gap-4 items-center">
          <p>Invoice</p>
          <Button>Track Order</Button>
        </div>
      </div>

      <div>
        <p className="font-semibold">
          Order Date: {formatDate(order.orderedDate)}
        </p>
      </div>

      <hr className="border-2" />

      <div>
        {order.products.map((product) => (
          <div key={product.productId._id}>
            <ProductCard
              name={product.productId.productName}
              price={product.productId.productPrice}
            />
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomStatusSelect
            form={form}
            name="orderDeliveryStatus"
            label="Order Status"
            options={statusOptions}
            onChange={() => form.handleSubmit(onSubmit)}
          />
        </form>
      </Form>
      <p>Order Total: {order.totalPrice}</p>
      <p>Order User: {order.userId.name}</p>
    </div>
  );
};

export default OrderById;
