import React from 'react'
import { Result,Button } from 'antd'
import "./OrderConfirmed.css"
import {  useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import "../../projectStyling/RegisterPage.css"
function OrderConfirmed() {
  const navigate=  useNavigate();
const {orderId} =useParams();
console.log(orderId);
console.log('ths is orderId value from the shipping details component');
    const vieworders=()=>{
            navigate('/vieworders')
    }

    return (
        <>
              <Result
    status="success"
    title="Order confirmed!"
    subTitle={<span className='custom-message'>Your order with ID  {orderId}  has been confirmed and will be delivered to your shipping address soon!</span>}
    extra={[
     
     
      <Button className='custom-message' onClick={()=>vieworders()} type='primary' key="view order"> view Order History</Button>,
    ]}
  />

        </>
    )
}

export default OrderConfirmed
