import React from 'react'
import  "../../projectStyling/Products.css";
import { Button, Card, Space, Tooltip,Badge, message  } from 'antd';
import {ShoppingCartOutlined ,HeartOutlined, HeartFilled} from "@ant-design/icons";
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { addWishListProduct } from '../../Features/signUpSignInFeature/SignUpSignIn';

import { useDispatch,useSelector } from 'react-redux';

import "../../projectStyling/RegisterPage.css"
import axios from 'axios';
function Product(propsdata) {

  const product =propsdata.data;


// const isWish = useSelector((state) => state.signInSignUp.user.wishlist?.includes(product.id)); //this is to check at the time of loading of wishproduct or not
  const [isWish,setIsWish]= useState(false);
  const [hovered, setHovered] = useState(false);
  const dispatch= useDispatch();
  const currentUserInfo = useSelector((state)=> state.signInSignUp.user)

 
   
    const wishList=useSelector(state=> state.signInSignUp.user?.wishList||[])

  const handleWishList=async(product)=>{
    
    try {

      setIsWish(!isWish)
      console.log(currentUserInfo);
      console.log(' this is currentUserInfo');
 
       if(currentUserInfo.email!==""&&currentUserInfo.email!==undefined)
       {
         // the above checks whether the user is logged in or not if not then the information won't be available
        //  message.info(<span className='custom-message'>`hi ! {currentUserInfo.email}`</span>)
         message.info(<span className='custom-message'>`Product added to the WishList `</span>)

        console.log(product)
 
 //        const reduxResult=  dispatch( addWishListProduct( product ) )
 // console.log(reduxResult);
 // console.log('reduxResult above');
 //            console.log(wishList);
 //             // the above one is giving  [] at first time eventhough i store the product value
 //            console.log('this is wish list value from redux purely');
             // await setStoreWishList((prev)=>[...prev,product]);
           //  console.log(storeWishList);
 
           
           console.log(wishList);
           console.log('wish list value taken before the is Exist condition');
       
     // Check if the product already exists in the wishlist
      // i need to check whether the selected data is already exist in DB or not find a logic for that.
 // i have an idea first check the product's value that we get immediately after click to the handleWishList function
 // and check one condition whether the product value already exist in array of wishList value 
   
     const isExist = wishList.some((item) => item.id === product.id);
 
     console.log(isExist);
     console.log('this is isExist value to test');
 
           if(!isExist){
 
             console.log('this is the statement when the product value is not found in wxist wishlist array in redux');
             const reduxResult=  dispatch( addWishListProduct( product ) )
             console.log(reduxResult);
             console.log('reduxResult above');
                console.log(wishList);
                       // the above one is giving  [] at first time eventhough i store the product value
                 console.log('this is wish list value from redux purely');
 
                 const wishListData=  [...wishList,reduxResult.payload]
            
            
                 console.log("this is store wish list");
              const response= await axios.put("http://localhost:4000/addwishlist",{wishList:wishListData,userId:currentUserInfo.userId} )
                console.log(response);
                console.log('response value');
                console.log(response.data);
                console.log('response.data');
            // the above has error  like cant push the value of null
              console.log('this is product value when wishList is enabled');
           }
  
       }
       else{
         message.info(<span className='custom-message'>please log in if you have an account</span>)
 
       }
    }
     catch (error) {
      
      console.log(error);
      console.log('this is an error message in product component');
      message.info(<span className='custom-message'>an error in try catch block .. </span>)

    }
     
            }

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };


    return (
     <>
   <Badge.Ribbon
       style={{fontWeight:"bolder",letterSpacing:"1px"}}
       text= <span><span style={{fontSize:"1.3rem"}}>{product.discount}</span> % off</span>
      color="purple"
      // color="#F28585"
   >
         {/* the above riboon is just for exprient will implenent actual format later  */}
            <Card
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={hovered ? 'hovered-card' : ''}
            hoverable
              
            cover={ 
                
                <img
                className='CardImage'
                // src={ product.image[product.image.length-1] }
                
                // this is the special effect that shows another images when hover. 
                src={hovered ? product.image : product.image[product.image.length - 1]}

                // the above logic is to dymanicaaly take the last inserted image url into account as per our admin image putting.
                alt={product.title}
                // key={}
                />
              
                }
            >
        
            <div className="CardButton">
          <Space size={18} >
              <Tooltip title="shop now"color={"#526D82"} placement='bottom'>
                  
                  
                  <Link to={
                        {
                        pathname:`/singleproductpage/${product.id}`,
                        }
                    }
                  >
                    <Button shape='circle'  icon={ < ShoppingCartOutlined /> } />
                  </Link> 

              </Tooltip>  

              <Tooltip title="wishlist" placement='bottom'>
                  <Button shape='circle' onClick={ ()=>handleWishList(product) } icon={  isWish? <HeartFilled style={{color:'pink'}} /> :<HeartOutlined/> } />
              </Tooltip>

              
          </Space>     
            </div>
          </Card>
    </Badge.Ribbon>
      </>
            
       
        
    )
}

export default Product;
