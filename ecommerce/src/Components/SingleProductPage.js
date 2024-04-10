// import React, { useEffect } from 'react'
import Announcement from './Announcement';
import NavigationBar from './NavigationBar';

// i forgot to import styling so i made mistake and figured out later..
import "../projectStyling/SingleProductPage.css";
import { Button, Select, Space ,message} from 'antd';
import ColorPalette from './ColorPalette';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { Link,useParams } from 'react-router-dom';
import { useState } from 'react';
import   ImageCarousel  from "../Components/ImageCarousel/ImageCarousel"

import { useDispatch, useSelector } from 'react-redux';
import { addCartListProduct } from '../Features/signUpSignInFeature/SignUpSignIn';
import { addCountProduct,subtractCountProduct } from '../Features/CountProduct/CountProduct';
import axios from 'axios';

const size=[
  {label:"XS",value:"XS"},{label:"S",value:"S"},{label:"M",value:"M"},{label:"L",value:"L"},{label:"XL",value:"XL"},{label:"XXL",value:"XXL"}
]
function SingleProductPage( props ) {
 
  console.log(props);
  console.log('this is the props value in signle product page');
  const {id}= useParams();
  const shoppingCartListExist= useSelector(state => state.signInSignUp.user?.shoppingCartList||[])
// check once whether i may cause an error i've plan to load few data at first of app load later by search i will try to add or fetch data so it should  have a correct in redux that matches the useParams
  // const shoppingCartListExist1= useSelector(state => state.signInSignUp.user?.shoppingCartList||[])
  const ShoppingCategoriesList= useSelector((state)=> state.loadDataServer?.data||[]);// this is to check and compare the product from the products data
 
  const currentUserInfo = useSelector((state)=> state.signInSignUp.user)

  const target =  ShoppingCategoriesList.find((item) => item.id === Number(id));
  
  console.log(target);

  // the target value contains actualPrice,category,color,discount,explaination,id,image,price,title
  console.log('target value in single product page'); 
  
  console.log(ShoppingCategoriesList) // this contains all the product data value when app loaded..
  console.log('the above is  the shoppoingCategoriesList value  in singleproduct page');
console.log("this is shopping category list which taken from redux and used in singleproudct page component ");;
  const productCount= useSelector(state => state.CountProduct)

//  *** total is not working as exprected shows as NAN
  console.log(productCount);
  console.log('this is above product count');

 const dispatch= useDispatch();



  const [Size,setSize]=useState("")

  // const [addToCart,setAddToCart]=useState(false);

  // initially it was inserting all data when state changes but after this code its like at the time of entering to singleproductpage component and all the data are not stored  proberly not as expected..
   const addToCartFunction=async(singleCartProduct)=>{
        console.log(singleCartProduct);
        // above contains  color,id,image,price,productcount,size,title
        console.log('this is single product in addTo cart function');
    try {
        // const auth=getAuth();
        //   // 1 onAuthStateChanged(auth,async(user)=>{
        //          // we need to alter this code one the redux store is consistent
        //          const user=auth.currentUser
        //          if(user)
        //       {
        //        const userDocRef=doc(firebaseFireStoreDB,"users",user.email);       
        //             const isItemInCart = shoppingCartListExist.some((item)=> item.id === singleCartProduct.id);
        //            console.log("if userdata.exists() block");
        //            if (!isItemInCart) {
        //             console.log(isItemInCart); 
        //             console.log(singleCartProduct)               

        //              console.log("singleCartProduct");
        //               const insertingCartList = {...target,total:((singleCartProduct.price)*(singleCartProduct.productCount)),Size:Size}

        //               dispatch( addCartListProduct(insertingCartList) )        
        //             console.log(insertingCartList);
        //             console.log('this is below insertedCartList');
        //               console.log( shoppingCartListExist );
        //                await updateDoc(userDocRef,{shoppingCartList:[...shoppingCartListExist,insertingCartList]}) // this is the correct technique i found by just making array combining both updated and exist data 
        //                console.log(shoppingCartListExist);
        //                console.log('shoppingCartlistexist updated in firease');
        //                //its working i think
        //                  console.log("shopping cart updated");
        //              }
        //         }


        console.log(currentUserInfo);
        console.log(' this is currentUserInfo');
   
         if(currentUserInfo.email!==""&&currentUserInfo.email!==undefined)
         {
           // the above checks whether the user is logged in or not if not then the information won't be available
          //  message.info(<span className='custom-message'>`hi ! {currentUserInfo.email}`</span>)

          message.info(<span className='custom-message'>product added to cart !.</span>)
          //  console.log(product)
   
   //        const reduxResult=  dispatch( addWishListProduct( product ) )
   // console.log(reduxResult);
   // console.log('reduxResult above');
   //            console.log(wishList);
   //             // the above one is giving  [] at first time eventhough i store the product value
   //            console.log('this is wish list value from redux purely');
               // await setStoreWishList((prev)=>[...prev,product]);
             //  console.log(storeWishList);
   
             
             console.log(shoppingCartListExist);
             console.log('shopping cart list value taken before the is Exist condition');
         
       // Check if the product already exists in the wishlist
        // i need to check whether the selected data is already exist in DB or not find a logic for that.
   // i have an idea first check the product's value that we get immediately after click to the handleWishList function
   // and check one condition whether the product value already exist in array of wishList value 
     
       const isExist = shoppingCartListExist.some((item) => item.id === singleCartProduct.id);
   
       console.log(isExist);
       console.log('this is isExist value to test');
   
             if(!isExist){
   
               console.log('this is the statement when the singleCart product value is not found in isExist shoppingcartlist array in redux');
              //  here total  not working find out  now working..

              function formatDate(date) {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(1, '0');
                const year = date.getFullYear();
              
                return `${day}/${month}/${year}`;
              }
              const today = new Date();
              const creationDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
              console.log(creationDate);
              console.log('creation date is here');
              const deliveryDate = new Date(today);
              deliveryDate.setDate(today.getDate() + 5);
              // here the slight confusion
              const formattedDeliveryDate = formatDate(deliveryDate);
              console.log(formattedDeliveryDate);
              console.log('this delivery date is here');
                      const updatedSingleCartProduct = {...target,total:((target.price)*(productCount)),actualTotal:((target.actualPrice)*(productCount)),Size:Size,orderedAt:creationDate,deliveryDate:formattedDeliveryDate}
               console.log(updatedSingleCartProduct);
//  here total is not working find out..
               console.log('this is updatedsinglecart product  added with total and size');
               const reduxResult=  dispatch(  addCartListProduct( updatedSingleCartProduct ) )
               console.log(reduxResult);
               console.log('reduxResult above');
                  console.log(shoppingCartListExist);
                         // the above one is giving  [] at first time eventhough i store the product value
                   console.log('this is shoppingCart list Exist value from redux purely');
   
                   const shoppingCartListData=  [...shoppingCartListExist,reduxResult.payload]
              
              
                   console.log("this is store shoppingCartListData");
                const response= await axios.put("http://localhost:4000/addshoppingcartlist",{shoppingCartList:shoppingCartListData,userId:currentUserInfo.userId} )
                  console.log(response);
                  console.log('response value');
                  console.log(response.data);
                  console.log('response.data');
                console.log('this is shopping cart list  value taken from backend response');
             }
    
         }
         else{
           message.info(<span className='custom-message'>please log in if you have an account</span>)
   
         }
    }
     catch (error) {
      console.log(error  +   " there is error in singleProductPage component");
    }
           
   }

    return (
         <>   
   <div className='Container'>
            <NavigationBar />
            <Announcement />

      <div className='SingleProductContainer'>
            
          <div className='SingleProductImage' >
               
              <ImageCarousel  images={target.image}   />
          </div>
              

          <div className='SingleProductContent'>{/* 2nd half of the page */}
              <h2 >{target.title}</h2>
              <p> {target.explaination}</p>

               <p style={{fontSize: "1.4rem",fontWeight: "700",textDecoration:"lineThrough"}}>
                    &#x20b9;<span>{target.actualPrice}{" "}</span>
                    <span className='strikeOutText'>&#x20b9;{target.price}</span> 
                    <span style={{color:'#65B741',fontWeight:"bolder",fontFamily:"initial"}}>{" "}{target.discount}% off</span>
                 </p>
              <div className='FilterContainer'>

                 <Space direction='vertical' size={7}>
                    <p style={{fontWeight:"bold",color:"grey"}}>Inclusive of All Taxes </p>
                      <div className='FilterByColor'>
                          <span>color :</span>
                          <ColorPalette color={target.color} />
                      </div>

                      <div className='FilterBySize'>
                          <Space size={7}>
                                <span style={{fontWeight:"700",fontSize:"1.2rem"}}> Size:</span>
                          
                                <Select
                                
                                    defaultValue={"Size"}
                                    options={

                                      size.map((item)=>{
                                        return(
                                          {
                                            ...item,
                                            label:<span style={{fontWeight:"bold"}}>{item.value}</span>
                                          }
                                        )
                                      })
                                    } 

                                    onChange={ (value)=>setSize(value) }

                                />
                        </Space>     
                      </div>
               </Space>    
             </div> 
    
             <div className='FilterContainer2'>
                <Space size={15}>
                    <div className='Counter'>
                      <Space>
                          <div>
                          <Button 
                          onClick={ ()=> dispatch( addCountProduct() ) }
                          > <PlusOutlined/> </Button>
                          </div>

                          <div>
                          <p style={{fontWeight:"bold"}} >{
                           
                            productCount
                            }
                            </p>
                          </div>
                          
                          <div>
                          <Button 
                          onClick={()=>  dispatch( subtractCountProduct() ) }
                          > <MinusOutlined /> </Button>
                          </div>
                    </Space>     
                    </div>
    {/* start from here 2/11/2023 */}
                    <div>
                        <Link to="/shoppingcart" state={{color:target.color,title:target.title,id:target.id,price:target.price,actualPrice:target.actualPrice,image:target.image,size:Size,productCount:productCount}}>         
                        
                            <Button 
                            onClick={
                              ()=>
                              addToCartFunction(
                                    {
                                    color:target.color,title:target.title,id:target.id,price:target.price,actualPrice:target.actualPrice,image:target.image,size:Size,productCount:productCount
                                    }
                                        )
                                } 
                            type='primary'>Add To Cart</Button>
                        </Link> 
                     
                    </div>
                </Space >
             
             </div>
          </div>
           
           
        </div>
   </div>     
        </>
 
    )
}

export default SingleProductPage;
