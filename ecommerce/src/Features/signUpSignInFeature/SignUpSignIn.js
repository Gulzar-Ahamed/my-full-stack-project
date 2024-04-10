import {createSlice} from  '@reduxjs/toolkit'

const initialState={
    user:{
        // decide later on whether user is object or array.
            userId: 0,
            name:"",
            email:"",
            shoppingCartList: [],
            userAddress:{City:"",Name:"",Phone:"",State:"",Street:"",Country:"",ZipCode:"" },
            wishList:[],
            isUserActive:false
        }
       
    }

export const signInSignUp = createSlice(
    //  this slice is to tract the user initially we had issue when we refresh page our user 
    // details gone so to overcome that i use this.

    {
        // start from here after asar
        name:"signInSignupName",
        initialState,
        reducers:{
            
            setUser: (state, action) => {
                const { userId, name, email, shoppingCartList, userAddress, wishList } = action.payload;
                    console.log(userId,name,email,shoppingCartList,userAddress);
                    console.log('this is the userid,name etc..from redux inside');
                // Parse JSON only if the values are defined
                const parsedWishList = wishList ? JSON.parse(wishList) : [];
                const parsedShoppingCartList = shoppingCartList ? JSON.parse(shoppingCartList) : [];
                const parsedUserAddress = userAddress ? JSON.parse(userAddress) : {};
            
                return {
                    ...state,
                    user: {
                        ...state.user,
                        userId: userId,
                        
                        name: name,
                        email: email,
                        wishList: parsedWishList,
                        shoppingCartList: parsedShoppingCartList,
                        userAddress: parsedUserAddress,
                        isUserActive: true,
                    },
                };
            },
            
    
            userSignOut:(state,action)=>{

                state.user.email="";
                state.user.name="";
                // state.user.userPhoto=null;
                state.user.isUserActive=false;
                state.user.userId=0;
                state.user.userAddress=null
                state.user.wishList=[];
                state.user.shoppingCartList=[];

            },


            addWishListProduct: (state, action) => {
                if (state.user && state.user.wishList) {
                    state.user.wishList.push(action.payload);
                } else {
                    // If user or wishList is null, initialize them
                    state.user = state.user || {};
                    state.user.wishList = [action.payload];
                }
            },
            


           removeWishListProduct:(state,action)=>{
            // state.user.wishList.filter( (item)=>{
            //     return item.id !== action.payload.id;
            // })
            state.user.wishList=action.payload;
           },

           addCartListProduct:(state,action)=>{
            if (state.user && state.user.shoppingCartList) {
                state.user.shoppingCartList.push(action.payload);
            } else {
                // If user or wishList is null, initialize them
                state.user = state.user || {};
                state.user.shoppingCartList = [action.payload];
            }
           },

           updateCartListProduct:(state,action)=>{
                    state.user.shoppingCartList= action.payload;
           },
       
           updateUserAddress:(state,action)=>{

            const {Street,City,State,ZipCode,Country,Name,Phone} = action.payload;

                state.user.userAddress={
                    Street:Street,
                    City: City,
                    State:State,
                    ZipCode:ZipCode,
                    Country:Country,
                    Name:Name,
                    Phone:Phone
                }

           }

        }

    }    
 )


 export const {setUser,userSignInAccount,userSignOut,addWishListProduct,removeWishListProduct,addCartListProduct,removeCartListProduct,updateCartListProduct,updateUserAddress} =  signInSignUp.actions;
export default signInSignUp.reducer;