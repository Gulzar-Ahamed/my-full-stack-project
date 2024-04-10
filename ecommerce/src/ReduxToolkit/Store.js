import { configureStore } from "@reduxjs/toolkit"

// import { wishListSlice } from "../Features/wishListFeature/WishList" i dont know why i created this 
import { CartListSlice } from "../Features/cartListFeature/CartList"
import LoadDataFromServer from "../Features/dataFromServer/LoadDataServer"
import signInSignUp from "../Features/signUpSignInFeature/SignUpSignIn"
// import { combineReducers } from "@reduxjs/toolkit"
import {StoreUserDataFromBackend}  from "../Features/StoreUserDataFromBackend/StoreUserDataFromBackend"
import userComments from "../Features/userComments/UserComments"
     import  CountingProduct from "../Features/CountProduct/CountProduct"

export const store = configureStore(

  {
    reducer: {
      
        // wishList: wishListSlice,
        cartList:CartListSlice,
        loadDataServer: LoadDataFromServer,
        // these reducer keys names are used with useselector to use state.
        signInSignUp: signInSignUp,
        StoreUserDataFromBackend:StoreUserDataFromBackend,
        userComments:userComments,
        CountProduct: CountingProduct,
    }

  }
)


