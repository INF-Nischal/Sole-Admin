import OrderById from "@/components/ui/order/Order";
import { getOrderById } from "@/lib/actions/Order";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const order = await getOrderById(params.id);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg">Order</h1>
      <OrderById order={order} />
    </div>
  );
};

export default page;
