export const dynamic = 'force-dynamic';

import Container from "@/app/components/Container";
import OrdersClient from './OrderClient';
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrdersByUserId from '@/actions/getOrdersByUserId';

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="OOps! Access denied" />;
  }

  const orders=await getOrdersByUserId(currentUser.id)

  if(!orders){
    return <NullData title="No orders yet"/>
  }

  return (
    <div className="pt-8">
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
