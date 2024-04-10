import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userWhenVerifiedByEmail:{
            
    }
}
export const StoreUserDataFromBackend =createSlice(
{

    name:"storeUserDataFromBackend",
    initialState,

    reducers:{

         storeUser:(state,action)=>{
            
            return{
                ...state,
                userWhenVerifiedByEmail:{...action.payload},
             
                
            }
            
        }
    }

    
}
)

export  const {storeUser}=StoreUserDataFromBackend.actions;
export default StoreUserDataFromBackend.reducer;
// the above is going to store in index of redux store