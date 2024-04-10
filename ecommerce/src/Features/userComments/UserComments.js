
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import axios from "axios"
const initialState={
    Comment:[ ]
}
export const userComments= createSlice(
    {
        name:"userComments",
        initialState,
        reducers:
        {
            addUserComments:( state,action)=>{
                // state.Comment.push(action.payload)

               state.Comment.unshift(action.payload)

            },

            getUserComments:( state,action)=>{
                 state.Comment=action.payload;
            }

            
        } ,

      extraReducers:(builder)=>{
          builder
          .addCase(getUserComments.pending, (state)=>{
            state.status="pending"
          })
          .addCase(getUserComments.fulfilled, (state,action)=>{
           state.Comment=action.payload;
            state.status="idle"
            console.log(state.Comment)
            console.log('this is inside extra reducer ')
          })
          .addCase(getUserComments.rejected, (state)=>{
            state.status="rejected"
            console.log('rejected state');
          })

      }
    }
)

export const getUserComments =createAsyncThunk("getUserComments",async()=>{
//     const collectionRef= collection(firebaseFireStoreDB,"userComments")
//     let userComments=[];
//     let data= await getDocs(collectionRef)
//     userComments=data.docs.map( (doc) => ({
//         ...doc.data(),
//         id:Number(doc.id) 
// }
//   ));
//   console.log(userComments);
//   console.log('above is usercomments i am logging  ');
// here you call the API to get the user comments from backend..
    try {//i'm not sure whether this is a good approach or not.
     const response= await axios.get("http://localhost:4000/usersComment");

     console.log(response);
     console.log('this is response of user comment block');
         const data= response.data.backendData;
            console.log(data);
            console.log("this is the exact data from backend");
        return data;
       
    } catch (error) {
      console.log("this is an error ");
    }
     
//    console.log(productdata);
// return userComments; chat gpt suggests to call api using thunk only



})


export const {addUserComments}=userComments.actions;
export default userComments.reducer;