import { createSlice } from "@reduxjs/toolkit";

const initialState=1;

   export const CountingProduct= createSlice(
       
      {
            name:"CountProduct",

            initialState,

             reducers:{

                addCountProduct:(state,action)=>{

                    return state + 1;

                },

                subtractCountProduct:(state,action)=>{

                        if(state > 1){
                            return state -1;
                        }
                   
                        return state;
                }
            
            }

      
        }
    )


    export const  {addCountProduct, subtractCountProduct}=  CountingProduct.actions
    export  default CountingProduct.reducer