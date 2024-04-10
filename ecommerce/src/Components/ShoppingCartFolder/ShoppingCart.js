import React, { useEffect, useState } from 'react';
import Announcement from '../Announcement';
import NavigationBar from '../NavigationBar';
import "./ShoppingCart.css";
import { Button, Drawer, Space, Tooltip,Spin, Result, message } from 'antd';

import {  useNavigate } from 'react-router-dom';
import ColorPalette from '../ColorPalette';
import { DeleteFilled, ShoppingCartOutlined } from "@ant-design/icons";
import WishList from './wishList';
import { useDispatch,useSelector } from 'react-redux'; 
import { updateCartListProduct} from '../../Features/signUpSignInFeature/SignUpSignIn';
import axios from 'axios';
function ShoppingCart() {

  // const [updatedStateValue, dispatcherFunction] = useReducer(useReducerCounter, 0);
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
   
  const    dispatch =useDispatch();
  const currentUserInfo = useSelector((state)=> state.signInSignUp.user)

  const shoppingCartList=  useSelector((state)=> state.signInSignUp.user?.shoppingCartList||[]);
  console.log(shoppingCartList);// here my data works perfectly..
  console.log("this is shoppingcart list in shopping cart component");

 
//  *** total is not working as exprected shows as NAN
  function navigateFunction() {
    navigate("/");
  }

    //  one changes i did
      const total = shoppingCartList.reduce((acc, product) => {
        return acc + (product.total);
      }, 0);

      // i want to send this actual total to my razorpay as amount value i don't know how to do it..
      const actualTotal=shoppingCartList.reduce((acc, product) =>{

        return acc+ (product.actualTotal)
      },0);

  const removeProduct = async (productId) => {

       try{

        const updatedCartList =   shoppingCartList.filter(
          (item)=>{
             return item.id !== productId
        }
        )

      //  dispatch(  removeCartListProduct(productId) );
      const reduxResult=dispatch( updateCartListProduct(updatedCartList))
        
       console.log(reduxResult.payload);
       console.log('this is the reduxResult.payload contains updated value  in remove shopping cart list  product function');
  //     const auth = getAuth();
  //      if(!auth.currentUser){
  //       console.error("User is not signed in.");
  //       return;
  //      }
  //     const currentUser = auth.currentUser;
  //     console.log(currentUser);
  //     console.log("above user in removeCartListProduct");
  //         console.log(currentUser.email); // returns undefined reason is simple auth returns logged in user information so that is the reason for
  //           const docRef = doc(firebaseFireStoreDB, "users", currentUser.email);// this is correct and overwrites written other technique
  //           console.log(`below the docref`);
  //           console.log(docRef);
  // // const shoppingCartList=  useSelector((state)=> state.signInSignUp.user?.shoppingCartList||[]);
  //           await updateDoc(docRef, {  shoppingCartList: updatedCartList} );

  const response= await axios.put("http://localhost:4000/removeshoppingcartlist",{shoppingCartList:updatedCartList,userId:currentUserInfo.userId} )
  console.log(response);
  console.log('response value');
  console.log(response.data);
  console.log('response.data');
// the above has error  like cant push the value of null
console.log('this is response value i got from backend  ');
      }catch(error){
          console.log(error +' there is an error in the cart product  removal method ');
         
          message.error(<span className='custom-message'>{`An error occured in wishList try catch block of shoppingcart component`}</span>)

        }
  };

  function checkOutFunction(){
        navigate(`/shippingDetails`)
  }

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

return (
  <>
    <NavigationBar />
    <Announcement />
    <div className='ShoppingCartContainer'>
      <h2 style={{ textAlign: "center", margin: "25px 0px" }}>YOUR BAG</h2>

    

   {
      shoppingCartList.length === 0 || undefined ? (
        <Result
          extra={<Button type='primary' onClick={navigateFunction}>Go Home page</Button>}
          icon={<ShoppingCartOutlined />}
          title="No shopping item is available"
        />
      ) : (
        <div className='TopChild'>
          <div>
            <Button
              onClick={navigateFunction}
              size='default'
              style={{
                fontSize: "1.0rem",
                fontWeight: "900",
                fontFamily: "monospace",
                backgroundColor: "white",
                color: 'black',
                border: "black 2px solid",
                textAlign: "center",
              }}
            >
              Continue shopping.
            </Button>
          </div>
          <div>
            <Space size={20}>
              <span style={{ textDecoration: "underline", fontSize: "800", fontWeight: "700" }}>
                shopping bag ({(shoppingCartList.length !== undefined) ? shoppingCartList.length : 0})
              </span>
            </Space>
          </div>
          <div>
            <Button
              size='default'
              style={{
                fontSize: "1rem",
                fontWeight: "900",
                fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                backgroundColor: "black",
                color: "white",
                border: "white 3px solid"
              }}
              onClick={showDrawer}
            >
              Checkout Now.
            </Button>
          </div>
        </div>
      )}

      {console.log(shoppingCartList )}

      {shoppingCartList.length > 0 && shoppingCartList.map((product) => (
        <div className='BottomChild' key={product.id}>
          <div className='ProductDetailsContainer'>
            <div className='Product'>
              <div className='ProductImage'>
                <img src={product.image} alt={product.title} />
              </div>
              <div className='ProductInformation'>
                <p><span>Product :</span>{product.title}</p>
                <p><span>productID :</span> {product.id}</p>

                <div className="ColorPaletteContainer">
                    <span >Chose Color:</span>
                    
                    <div className='ColorPalette'>
                      <ColorPalette style={{color:"blue"}} color={[product.color]} />
                    </div>

                </div>

                
                
                <p><span>size:</span> {product.Size}</p>
              </div>
            </div>
            <div className='Price'>
              <Space size={14} direction="vertical">
                <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>Overall price:</p>
               
                  <p style={{ fontSize: "1.3rem", fontWeight: "900" }}>{product.actualTotal}Rs.</p>

                <Tooltip title="Remove" placement='bottom'>
                  <Button size='large' onClick={() => removeProduct(product.id)} icon={<DeleteFilled style={{ color: "red" }} />} />
                </Tooltip>
              </Space>
            </div>
          </div>
        </div>
      ))}

      <Drawer
        // title="Order Summary"
        placement="right"
        closable={true}
        onClose={onCloseDrawer}
        open={drawerVisible}
        width={300}
      >
        <div className='SummaryContainer'>
          <h2 style={{ letterSpacing: "0.2rem", color: "black" }}>ORDER SUMMARY</h2>
          <div className="SummaryContainerItems">
            <div className='IndividualItem'>
              <span>Total:</span>
              <span>&#x20b9;{total}</span>
            </div>
            <div className='IndividualItem'>
              <span>Estimated Shipping:</span>
              <span>&#x20b9;40</span>
            </div>
            <div className='IndividualItem'>
              <span>Shipping Discount:</span>
              <span>&#x20b9;-40</span>
            </div>
            <div className='IndividualItem'>
              <span style={{ fontSize: "1.3rem", fontWeight: "800" }}>Final Total</span>
              <span style={{ fontSize: "1.3rem", fontWeight: "800" }}>&#x20b9;{actualTotal}</span>
            </div>

            <div className='IndividualItem'>
              <span style={{ fontSize: "1.3rem", fontWeight: "800" }}>You Saved !..</span>
              <span style={{ fontSize: "1.1rem", fontWeight: "800" }}>&#x20b9;{total - actualTotal}</span>
            </div>
          </div>
          <Button
            onClick={checkOutFunction}
            style={{
              fontSize: "1rem",
              fontWeight: "900",
              fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
              backgroundColor: "teal",
              color: "white",
              border: "white 3px solid",
              width: "100%"
            }}
          >
            Confirm Order.
          </Button>
        </div>
        
      </Drawer>
    
    </div>
  </>
);

}

export default ShoppingCart;
