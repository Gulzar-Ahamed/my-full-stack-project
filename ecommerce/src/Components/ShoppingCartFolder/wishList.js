import  { useEffect, useState } from 'react';
import "../../projectStyling/RegisterPage.css"
import './wishList.css'; // Make sure to import your CSS file for styling
import NavigationBar from '../NavigationBar';
import Announcement from '../Announcement';
import ColorPalette from '../ColorPalette';
import { Button, message, Result, Space,Spin } from 'antd';
import { DeleteOutlined, HeartOutlined } from '@ant-design/icons';
import {  useNavigate } from 'react-router-dom';
import { updateDoc,getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { removeWishListProduct } from '../../Features/signUpSignInFeature/SignUpSignIn';
import axios from 'axios';

function WishList() {
 
  //  there is a issue with this wishlist is it accespts the replicate proudcts also nad also not updating 
  // firebase and sTATE  redux ALSO

  const [loading,setLoading]= useState(true)

 const dispatch= useDispatch();

 const currentUserInfo = useSelector((state)=> state.signInSignUp.user)
  console.log(currentUserInfo);

 console.log("above is wishlist user current infomation");
 const wishList = useSelector(state => state.signInSignUp.user?.wishList || [] ); // this is a good technique to avoid error
//   i resolved the problem i didn't use the correct useselector name hence it returns undefined

//  const userEmail= useSelector(state => state.signInSignUp.user?.userEmail || [] );
// start from here after lunch..
console.log(wishList);
  const navigate=useNavigate();
  useEffect(() => {
 

      setLoading(false);
      console.log(wishList)
      // console.log(data.wishList);
    // });
  }, []);

  const goToProductFunction=(ProductId)=>{
    navigate(`/singleproductpage/${ProductId}`)
  }

  const removeProduct = async (productId) => {
    try {
      // Filter the wishList to remove the product with the given ID
      const updatedWishList = wishList.filter((item) => item.id !== productId);
     const reduxResult= dispatch( removeWishListProduct(updatedWishList) )

     console.log(reduxResult.payload);
     console.log('this is the reduxResult.payload contains updated value  in remove product function');
          
     const response= await axios.put("http://localhost:4000/removewishlist",{wishList:updatedWishList,userId:currentUserInfo.userId} )
     console.log(response);
     console.log('response value');
     console.log(response.data);
     console.log('response.data');
 // the above has error  like cant push the value of null
   console.log('this is product value when wishList is enabled');
     
    } catch (error) {
      // console.error("Error updating Firestore document:", error);
          message.error(<span className='custom-message'>{`An error occured in wishList try catch block`}</span>)
    }
  };
  return (
    <>
      <NavigationBar />
      <Announcement />
      <div className='wishlist-container'>


       {loading ? (<Spin size='large' />) :wishList.length===0 ? ( <Result title="No WishList product is available" icon={ <HeartOutlined /> } /> ):(
 
        <h2>Your WishList</h2>
         )
      }
       
      {/* if you want to add any content of the backend data you can  */}
        {wishList.map((item,index) => (
          <div key={index} className='item-container'>
            <div className='image-container'>
              <img src={item.image} alt='item' />
            </div>

            <div className='information-container'>
              <p className='item-title'>
              <span>Title:</span>{item.title}
              </p>

              <p className='item-id'>
              <span>Id:</span>{item.id}
              </p>

              <p className='item-description'>
             <span>Explanation: </span> {item.explaination}
              </p>

              <div className='color-palette'>
                <span>Chose Color :</span>
                <ColorPalette color={[item.color]} />
                {console.log(item.color)}
              </div>
            </div>

            <div className='price-container'>
              <Space direction='vertical' size={20}>
              <p className='item-price'><span>Final Price:</span>{item.actualPrice}</p>
              {/* there is a problem in accessing price  */}
              {console.log(item.price)}

                
              <Button onClick={ ()=>goToProductFunction(item.id) } type='primary' >Go to Product</Button>
              
              <Button onClick={()=>removeProduct(item.id)} size='large' style={{color:"red"}} icon={<DeleteOutlined />}></Button>
              </Space>
              

            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default WishList;
