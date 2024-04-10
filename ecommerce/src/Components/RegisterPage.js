import React, { useRef, useState } from 'react'
import "../projectStyling/RegisterPage.css"
import {Alert, Button, Divider, Form, Input, Space,message} from "antd"
import { Link, useNavigate } from 'react-router-dom';
import googleIcon from "../icons/googleIcon.png"

import { useReducerFunction } from './ReducerForForm';
import { signInWithPopup,createUserWithEmailAndPassword} from "firebase/auth"
import { useReducer } from 'react';
import {validatePassword} from "./ValidatorForPassword"
import axios from 'axios';
import { userSignUpAccount,GoogleUserSignUpAccount,GoogleUserSignInAccount, setUser } from '../Features/signUpSignInFeature/SignUpSignIn';
import { useDispatch } from 'react-redux';
function RegisterPage() {
  const  [form] = Form.useForm();
  const navigate=useNavigate();

  const dispatch=useDispatch();
  const formDataObject={
    name:"",  
    email:"",
    password:"",
    confirmPassword:""
  }
  // const [user,setUser]=useState(null)
   const [currentState,dispatcher] =useReducer(useReducerFunction,formDataObject);

   const [signUpStatus,setSignUpStatus]=useState();

//  is user has account or not if not create new data here otherwise show warning message
  //  const checkUserExists = async (email) => {
  //   // const db = getFirestore();
  //   // console.log(email);
  //   // const userRef = await doc(db, "users", email);
  //   // const userDoc = await getDoc(userRef);
   
  //   // return userDoc.exists();

      
  // };
  
  // const addUserToFirestore = async (userData) => {
  //   const db = getFirestore();
  //   const userRef =  doc(db, "users", userData.email);
  //   // i think on above i can give any 3rd parameter  like as primary key.
  //   // console.log(userRef); //this userRef contains the reafernce or address ex: if we know address we can easyily do anything like add,delete,modify
  //   setSignUpInfo("success")
  //   await setDoc(userRef, userData);
  // };

// const googleAuthentication=async()=>{

//       // this below is very very important for us because i have been googling it for 2days the error is based on the serializableData 
//       // meaning this google authentication provide large amount of data so the error was coming i just extracted only reuqired data for me 
//       // and navigate it to home route along with extracted data...
//   try {
//    const resultFromGoogleAuthentication= await signInWithPopup(authenticationObject,googleProvider)
 
//   //  here the problem comes newly 26th october
//    console.log(resultFromGoogleAuthentication.user) // this is returning email as null that's why error comes
//   //  till here works good i fount 
//    console.log("i'm above the result from google authentication user");
//   //  console.log(authenticationObject);
//    const userData=resultFromGoogleAuthentication.user;
    
// // 13/10/2023 work with this code and error is coming that it shows user already exists but now only i created 
//       //  i don't know why the userData's email as null problem solved..
//       console.log(userData?.email);
//       const  userExists=await checkUserExists(userData.email)

//         if (userExists) {     
//           setSignUpInfo("error")
//           return;
//         }

//         else{
//           console.log(userData);

//           const serializableUserData={
//           //  uid:resultFromGoogleAuthentication.user.uid,
//            name:userData.displayName,
//            email:userData.email,
//            userPhoto:userData.photoURL,
//            userAddress:{
            
//            },
//            shoppingCartList:[],
//            wishList:[]
//           }
     
//           console.log(serializableUserData);
//           await  dispatch( GoogleUserSignUpAccount(serializableUserData) )

//          await addUserToFirestore(serializableUserData)

//           // updateUser(serializableUserData)
       

//      navigate("/");
//         }
//   }
//    catch (error) {
//     console.log(error +"this is an error");
//   }
// // now .then parameter contains success result data..  
//               //  console.log(authenticationObject?.currentUser?.email); 
//  }
   const  signupManually=async(value)=>{
      try {
        // i think we may have to do store the user information in redux to access and display the user information.
               console.log(value);
              //  this returns Confirmpassword, email, name,password field.
               console.log('this is the value when register form is submitted');

              //  checkUserExists(value.email);
              //  check by mail if the user already exists or not just for safety reasons
             const response= await axios.post("http://localhost:4000/register",value)
                console.log(response);
                console.log("this is response result from backend in register");
                console.log(response.data);
                console.log("this is response result data after extraction");
                setSignUpStatus(true);
// below it was myData small typo error

console.log(response.data.userData);
console.log('response.data.userData');

console.log(response.data.userData[0]);
console.log('response.data.userData[0]');
                dispatch( setUser(response.data.userData[0]) )
                // here myData is an object

                // this  type of data contains boolean values
              navigate("/");
              
      } 
      catch (error){

           console.log(error);
           console.log("there is an error in try catch block");
           setSignUpStatus(false);
 
      }  
 }
    return (
    <>
      <div className='RegisterContainer'>
      {/* below one form contianer has image included */}
              <div className="FormContainer">
                     {/* i wnat fullname,email,password,confirm password that's it */}
                  <h2  className='header' >
                    Create An Account
                 </h2>
                      {/* <h2>User Already exist..</h2> */}
                  
                    {/* Conditional rendering of alert based on signUpInfo */}
                      {signUpStatus === true ? (
                        <Alert
                          style={{ fontWeight: "900", color: "black", marginBottom: "10px", height: "25px", letterSpacing: "0.1rem" }}
                          banner
                          closable
                          type="success"
                          message="Account Created successfully!..."
                        />
                      ) : signUpStatus === false ? (
                        <Alert
                          style={{ fontWeight: "900", color: "black", marginBottom: "10px", height: "35px", letterSpacing: "0.1rem" }}
                          closable
                          banner
                          type="error"
                          message="User Already Exist...please check your credentials"
                        />
                      ) : null /* Don't display any alert initially */}
                              
                  <Form
                  onFinish={
                          (value)=> signupManually(value)
                    }
                  onFinishFailed={()=>console.log("something went wrong...")}
                   form={form}
                    labelCol={{span:7}} wrapperCol={{span:15} }>
                    
                      <Form.Item
                     
                     label="FullName:"
                     name="name"

                     rules={[
                              {
                                required:true,
                              
                              },

                              {
                                pattern:/^[a-zA-Z]+( [a-zA-Z]+)?$/,

                                message:"please enter only Alphabets"
                              },
                     ]}
                     >
                        <Input allowClear onChange={ (event)=>dispatcher( { type:"name",payload:event.target.value } )  } />     
                     </Form.Item>

                     <Form.Item
                     label="E-Mail:"
                     name="email"
                     rules={
                            [
                                    {
                                      required:true,
                                      message:"Email is required"
                                    },

                                    {
                                      pattern: /^.+@.+\..+$/,
                                      message:"please enter only valid email"
                                      
                                    }

                          ]
                      }
                     >
                        <Input allowClear onChange={ (event)=>dispatcher( { type:"email",payload:event.target.value } )  } />     
                     </Form.Item>

                     <Form.Item
                     label="Password:"
                     name="password"

                     rules={[
                        {
                          required:true,
                          message:"password is required"
                        },

                        {
                           pattern:/^.{8,12}$/,
                            message: "Password should be 8 to 12 characters only",
                        },

                        {
                            validator: validatePassword,
                        }

                          ]}
                     >
                       <Input.Password allowClear onChange={ (event)=>dispatcher( { type:"password",payload:event.target.value } )  } />     

                     </Form.Item>

                     {/* the below is we won't use and store in backend so it's just for checking in client side only  */}
                     <Form.Item
                      validateTrigger="onBlur"
                      // apply this to all area let's see
                     label="Confirm Password:"
                     name="ConfirmPassword"
                     rules={[
                      {
                        required:true,
                        message:"this field is required"
                      },

                        {
                            validator:(_,value)=>{

                                if(value===form.getFieldValue("password"))
                                {
                                   return Promise.resolve();
                                  
                                }
                                else{
                                 return Promise.reject("Confirm password must be matched with original Password ")
                                }
                            }
                        }
                        
                     ]}
                    
                     >
                       <Input.Password allowClear onChange={ (event)=>dispatcher( { type:"confirmPassword",payload:event.target.value } )  } />     
                     </Form.Item>

                     <Form.Item wrapperCol={{span:11,offset:6}}
                     >
                       <Button 
                       htmlType='submit'
                      
                        style={
                               {fontSize: "1rem",
                                fontWeight: "900",
                                fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                                backgroundColor:"black",
                                color:"white",
                                border:"white 3px solid",
                                padding:"0px 12px",
                                letterSpacing:"0.1rem"
                               }
                             }
                        >
                            Create Account!
                      </Button>

                     </Form.Item>

                     <Link 
                          to="/loginpage"
                          className='noUnderlineForLink'
                      >
                         Already have an Account ?
                     </Link>
                  </Form>   
              </div>
      </div>    
    </>
    )
}

export default RegisterPage;
