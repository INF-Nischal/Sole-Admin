import { getAllOrders } from "@/lib/actions/Order";
import OrderTable from "@/components/tables/OrderTable";

const Orders = async () => {
  const orders = await getAllOrders();
  return (
    <div>
      <OrderTable orders={orders} />
    </div>
  );
};

export default Orders;
