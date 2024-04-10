import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = { 
    data: [],
    status:'idle',
    // dataCount: 0,
 };

 function isValidJSON(str) {
    try {
        // console.log("ckecking for valid json or not function");
      JSON.parse(str);
    //   console.log(str);
    //   console.log("this is a valid json string to convert");
      return true;
    } catch (error) {
      return false;
    }
  }
const LoadDataFromServer = createSlice(
    //    i think we can improve this better but for now it's ok 
        {
            name:"DataFromServer",
            // to asscess the splice data use the key of which you pass the reducer function
            initialState,
            reducers:{
               
                storeBySearchValue:(state,action)=>{
                    const convertedData = action.payload.map( item=>({
                        ...item,
                        actualPrice: parseInt(item.price*((100-item.discount)/100)), 
                        image: isValidJSON(item.image) ? JSON.parse(item.image) : item.image,
                        color: isValidJSON(item.color) ? JSON.parse(item.color) : item.color
                   }));

                    state.data=convertedData;
                    // console.log(convertedData.length);
                    //   console.log("i am above in redux toolkit of data and it's length ");
                    // state.dataCount=convertedData.length;
                    // state.data.push(action.payload)
                }
            },
            extraReducers:(builder)=>{
     
                builder
                .addCase(getProductsData.pending,(state)=>{
                          state.status="pending"
                })
                .addCase(getProductsData.fulfilled, (state,action)=>{
                    console.log('data fetched successfully after conversion');        
                    state.data=action.payload;
                    // state.dataCount=action.payload.length;
 
                            state.status="idle"
                })
                .addCase(getProductsData.rejected,(state)=>{
                            state.status="rejected"
                            console.log("this is in rejected state");
                })
            }

            
        }
)
export const getProductsData = createAsyncThunk("getProductsData", async()=>{
   
    // here you need to start calling api method TO GET DATA
    //    return productdata;   problem resolved this wasn't worked out because i haven't use dispatch function to call this function which is a procedure
    try {
        console.log("im inside the get products data  ");
        const response= await axios.get("http://localhost:4000")
                    // console.log(response);
                    // console.log("this is response from server color and image in JSON format"); 
                    console.log(response.data);
                    console.log('this is response data from server');
                    

         const convertedData = response.data.map( item=>({
                            ...item,
                            actualPrice: parseInt(item.price*((100-item.discount)/100)), 
                            image: isValidJSON(item.image) ? JSON.parse(item.image) : item.image,
                            color: isValidJSON(item.color) ? JSON.parse(item.color) : item.color,
                            // wishList:isValidJSON(item.wishList) ? JSON.parse(item.wishList) : item.wishList
                        }));
                    // const productsData={...response.data}
console.log(convertedData);
console.log('this is the final data after cleaning to correct format');
                   return await convertedData;
    } catch (error) {
        console.log('this is the error message from getproducts data');
        console.log(error);
    }         
    
   

})


export const {loadFromServer,storeBySearchValue} = LoadDataFromServer.actions;
export default LoadDataFromServer.reducer;