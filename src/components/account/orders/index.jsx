import Link from "next/link";
import { useSelector } from "react-redux";
import { formatDate } from "@utils/method";
import { CURRENCY } from "@utils/constant";
import { AiOutlineEye } from "react-icons/ai";
import { Td, Tr, Th, Thead, Tbody, Table } from "@bootstrap";
import { OrdersTable } from "@components/account/orders/order.style";
import { ButtonView, EmptyStatus } from "@components/account/account.style";

const OrdersList = () => {
  const customer = useSelector((state) => state.customer);
  const orders = customer?.orders?.edges;

  return orders.length > 0 ? (
    <OrdersTable>

    </OrdersTable>
  ) : (
    <EmptyStatus>You have no order!</EmptyStatus>
  );
};

export default OrdersList;
