import React from 'react';
import "./shippingDetails.css";
import "../../projectStyling/RegisterPage.css"
import { Button, Divider, Form, Input, message,Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAddress } from '../../Features/signUpSignInFeature/SignUpSignIn';
import axios from 'axios';
 import { useNavigate } from 'react-router-dom';
// Import any other necessary dependencies

function ShippingDetails() {
  const dispatch = useDispatch();
  const currentUserInfo = useSelector((state) => state.signInSignUp.user);

       const navigate=useNavigate();

  const initialValues = {
    Name: currentUserInfo?.userAddress?.Name || "",
    Street: currentUserInfo?.userAddress?.Street || "",
    City: currentUserInfo?.userAddress?.City || "",
    State: currentUserInfo?.userAddress?.State || "",
    ZipCode: currentUserInfo?.userAddress?.ZipCode || "",
    Country: currentUserInfo?.userAddress?.Country || "",
    Phone: currentUserInfo?.userAddress?.Phone || "",
  };

  const handlePaymentFailure = async (response) => {
    console.log(response);
    console.log('This is the response object in payment failed instance');
    console.log(response.error.description);
    message.error(<span className='custom-message'>{response.error.description}</span>)
    console.log('This is the response.error.description in on event');
    
    try {
      console.log('Payment failed:', response);
      // Perform actions on failed payment, e.g., show error message, handle retries, etc.
    } catch (error) {
      console.error('Error handling failed payment:', error);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const initPayment = async (userInfo, order) => {
    console.log('I am in initPayment function');

    try {
      // the below is to ensure that adding the this script dynamically because in index.html i need to add but it's not working. 
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      console.log(res); // this will contain either true or false.
      console.log('This is the response from the Razorpay server that I am calling explicitly');

      if (!res) {
        alert("Razorpay failed to load!!");
        return;
      }

      console.log(order.id);
      console.log('This is the order.id value');

// i did one blunder mistake is that i only created .env file only to backend language but not for frontend so the key id waas like undefined now 
// i found out in 22nd feb 2024
      const options = {
        key: process.env.REACT_APP_RAZOR_PAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: userInfo.name,
        description: 'Note: This is just a Test Payment, Do not be afraid of it.',
        order_id: order.id,
        callback_url: "http://localhost:4000/verify",
        // the above  is callback_url property its main responsible is to call the /verfity endpont internally take 3 values like order_id,payment_id,signiture that will check whether 
        // this is a valid transaction or not if successful means the below handler function will get response from the backend 
        handler: async (response) => {
          try {
            console.log('I am here in handler function..');
            console.log(response);
            // the above response contains the 3 values like order_id,payment_id,signiture
            console.log('This is the response after the order is created in handler function property..once /verfify endpont response');
            
            // below try to add the payemnt success to user from your end. and send order_id value also
              const orderId=response.razorpay_order_id;

            navigate(`/orderConfirmed/${orderId}`)
           
          } catch (error) {
            console.log(error);
            console.log('I am in initPayment handler of error...');
            message.error(<span className='custom-message'>{error.code}{error.description}</span>)
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: userInfo.phone,
        },
        theme: {
          color: '#487ed5',
        },
      };

      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.on("payment.failed", async (response) => {
        handlePaymentFailure(response);
      });

      razorpayInstance.on("payment.successful", async (response) => {
        console.log(response);
        console.log('This is the response in payment.success on event..');
      });

      razorpayInstance.open();
    } catch (error) {
      console.log(error);
      console.log('Failed to create order. This is an error');
    }
  }

  const handlePayment = async (currentUserInfo) => {
    try {
      const finalTotal = await currentUserInfo.shoppingCartList.reduce((acc, item) => acc + item.actualTotal, 0);
      console.log('Final total:', finalTotal);
      console.log('This is the actual total that I am going to send in create-order route');

      const response = await axios.post("http://localhost:4000/create-order", { orderAmount: finalTotal });
      console.log(response.data);
      // now working properly  response.data will return information about the order like amount,order_id,
      console.log('This is the create-order response data in handlePayment function...');


      // calling userDefined method and will take some values like user information and reponse data when created the order.
      await initPayment(
            
              {
                name: currentUserInfo.name,
                email: currentUserInfo.email,
                phone: currentUserInfo.userAddress.Phone,
              },
              response.data.order // this is the main thing we need to give to the next step..
         );

    } catch (error) {
      console.log(error);
      message.error('There was an error in handlePayment function');
    }
  }

  const onFinishFunction = async (value) => {
    console.log('Value inside the shipping details:', value);
    console.log('User information taken from Redux:', currentUserInfo);

    const finalTotal = await currentUserInfo.shoppingCartList.reduce((acc, item) => acc + item.actualTotal, 0);
    console.log('Final total value:', finalTotal);

    if (currentUserInfo.email !== undefined && currentUserInfo.email !== "") {
      try {
        const reduxResult = dispatch(updateUserAddress(value));
        console.log('Redux result in shipping details:', reduxResult.payload);

        const response = await axios.post('http://localhost:4000/storeshippingaddress', {
          userId: currentUserInfo.userId,
          userAddress: reduxResult.payload,
        });

        console.log('Response from backend when storeshippingaddress API called:', response);

        handlePayment(currentUserInfo);
      } catch (error) {
        console.log(error);
        message.error(<span className='custom-message'>{'Error while getting user address'}</span>);
      }

    } else {
      message.error(<span className='custom-message'>{'Please sign in to proceed further'}</span>);
      console.log('Email is empty or undefined. Navigation prevented.');
    }
  }

  const onFinishFailedFunction = (error) => {
    console.log('Error in shipping details:', error);
    message.error(<span className='custom-message'>{'Please fill all the fields'}</span>);
  }

  return (
    <>
      {/* <Divider></Divider> */}
     
      <div className='ShippingDetails'>
        <Alert
        className='custom-message'
        style={{marginBottom:"10px"}}
        message={ <span style={{color:"red"}} className='custom-message'>Note: No actual money transactions are made, just for testing purposes only.</span> }
        description={
                      <ul>
                          <li>If payment is done by card, use card number: 4111 1111 1111 1111 (OR) 5267 3181 8797 5449</li>
                          <li>For CVV, use a random number</li>
                          <li>For expiry date, use any future date</li>
                          <li>If any payment needs  an OTP number, use  random number</li>
                          <li>Always click the success button for a successful transaction</li>
                        
                    </ul>
        }
        type="info"
        showIcon
      />
        <div className='ShippingHeading'>
          <h3 style={{ color: "black" }}><b>SHIPPING ADDRESS</b></h3>
        </div>

        <div className='ShippingBody'>
          <Form
            initialValues={initialValues}
            onFinishFailed={onFinishFailedFunction}
            onFinish={onFinishFunction}
            labelCol={{ span: 2 }}
            wrapperCol={{ offset: 0 }}
          >
            <Form.Item label="Name" name="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Street" name="Street" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="City" name="City" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="State" name="State" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Zip code" name="ZipCode" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Country" name="Country" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Phone" name="Phone" rules={[{ required: true }, { max: 10, message: "Enter up to 10 numbers" }]}>
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6 }}>
              <Button style={{ fontWeight: "800", fontFamily: "sans-serif" }} htmlType="submit" type="primary">
                Submit & Pay
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default ShippingDetails;
