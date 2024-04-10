import React from 'react'
import { Form,Input,Button,Space,Divider,message } from 'antd'
import '../projectStyling/RegisterPage.css'
// kindly use the existing Registerpage styling page due to time constraint..

import { setUser } from '../Features/signUpSignInFeature/SignUpSignIn'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import {validatePassword} from "./ValidatorForPassword.js"
// the above function contains strong password validation and it's recommendation to use
import { useDispatch } from 'react-redux'
import { userSignInAccount,GoogleUserSignInAccount } from '../Features/signUpSignInFeature/SignUpSignIn'
import axios from 'axios'
import StoreUserDataFromBackend, { storeUser } from '../Features/StoreUserDataFromBackend/StoreUserDataFromBackend'

// import { useParams } from 'react-router-dom';
// succesfully made it both functionality in signin and signup

export const LoginPage= ()=> {
  const  [form] = Form.useForm();

      const dispatch=useDispatch();

  const navigate=useNavigate();


          const signInFunction=async (value)=>{
         try {         
              console.log("before calling");
              // we can also use .then() .catch() instead of try catch block its upto you
             
              const response=await axios.post("http://localhost:4000/signin",value);
              console.log(response);
              console.log('this is response from the backend data');
                console.log(response.data);
                console.log('response.data value');
// i think on 27th jan 2024 store the user information response.data.myData has all user information so store it in redux 
              console.log("sign in manually data above statement")

              dispatch( setUser(response.data.userData) )
                  if(response.data.success){
                    message.success(
                    <span className='custom-message'>"WELCOME BACK {
                         response.data.userData.name } !!.."
                    </span>);
                    navigate("/")
                  }
              // the above one shows error because can't call hook function inside te hcomponnent i think we need to create function 

              // Redirect or perform other actions on successful login
          } catch (error) {
              console.error(error);
              message.error( <span className='custom-message'>Login failed. Please check your email Or password is incorrect</span> );
          }
            
      }
    return (
        <>
  <div className='LoginContainer'>

         <div className="FormContainer">
         <h1 className='header'>Please Log In</h1>
         
         <Form 
        
         form={form}

           onFinish={ (value)=> signInFunction(value) }
          
           onFinishFailed={ ()=> console.log("there is some error...") }
         labelCol={{span:7}}
          wrapperCol={{span:15}}
          >
                    <Form.Item
                     label="Email"
                     name="email"

                    rules={[
                            {
                              required:true,
                               message:"email required"
                            },

                            {
                                pattern: /^.+@.+\..+$/,
                                message:"please enter only valid email"
                                
                              }
                    ]}
                     >
                        <Input allowClear />     
                     </Form.Item>

                     <Form.Item
                     label="Password"
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
                       <Input.Password allowClear />     
                     </Form.Item>

                     <Form.Item
                     
                      wrapperCol={{span:13,offset:6}}
                     >
                       <Button
                          htmlType='submit'
                          className='form-button'
                        size='large' 
                        >
                           Log In
                       </Button>     
                              <Link to="/resetPassword" >
                                <p className='noUnderlineForLink'>Reset Password?</p>
                              </Link> 
                     </Form.Item>
         </Form>

         </div>
 </div>
        </>
    )
}



export const ResetPassword=()=>{
  const navigate = useNavigate();  // Initialize the navigate function
  const onFinishMethod=async(value) => {
    console.log(value);
    console.log('this is on finish method when submitting email in resetpassword component'); 
 
        try {
              const response=await axios.post("http://localhost:4000/resetpassword",value);
              console.log(response);
              console.log('this is the response from resetpassword component');
              console.log(response.data);
              // i think we can better save user data to redux so it's visible to all.
              console.log('this is the response data from resetpassword component');
              // UPTO ABOVE WORKS GOOD SO TRY TOMROOWO ALSO
             
              console.log(response.data.userData);
              console.log('this is respones.data.userData');
              //  const data=  storingData(response.data.userData);
              //  console.log(data);
               console.log('this is data returned from function');
              if( response.data.success)
              {
                // response.data.userData here userData is an object from backend
                  // the below need to change because use redux concept 
                  console.log(response.data.userData.email);
                  console.log('this  is response.data.userData.email value'); 
                navigate(`/newPassword/${response.data.userData.email}`);
                    console.log("i am ready to move forward to next route..");
              }
        } catch (error) {
          message.error(<span className='custom-message'> kindly provide  email id  which is already exist...</span>)
        }
    
  }
const onFailedMethod=() => {
      message.error(<span className='custom-message'>somthing went wrong..</span>)
}

  return(
      <>
          <div className='resetPassword-ParentContainer'>
              <h1 className='header' style={{textAlign:"center"}}>Reset Password </h1>
              <div className='resetPassword-ChildContainer'>
                  <Form
                   onFinish={onFinishMethod}
                 onFinishFailed={onFailedMethod}
                   labelCol={ {span:6}}
                   wrapperCol={{span:13,offset:1}}
                 
                  >

                      <Form.Item 
                         label="Email"
                         name={"email"}
                         rules={[
                            {
                              required:true,
                               message:"email required"
                            },

                            {
                                pattern: /^.+@.+\..+$/,
                                message:"please enter only exist email id to reset your password"
                                
                            }
                    ]}
                  
                      >
                          <Input allowClear placeholder='Enter your email id  to valid you  for passowrd reset' />
                      </Form.Item>

                      <Form.Item wrapperCol={{span:13,offset:11}}>
                         <Button style={{padding:"0px 20px"}} className='form-button' htmlType='submit'>verify</Button>
                      </Form.Item>
                  </Form>
              </div>
          </div>
       
      </>
  )
}


export const NewPassword=()=>{
  const {email}=useParams();
 const navigate= useNavigate();
  console.log(email)
 
 
  const onFinishHandler = async(value)=>{
 console.log(value);
  console.log("this is value from new password for reset field..");
     //  here how to send the password and what is the prodecure.. 
         try {
         
          
          console.log("this is the email value in new password component..");
          console.log(value.newPassword);
          console.log("this is the new password that i am going to put..");
    
         const response= await axios.put(`http://localhost:4000/resetpassword2/${email}`,{newPassword:value.newPassword})
            console.log(response);
            console.log("this is response finally");

            console.log(response.data);
            console.log("this is the response data after all.. ");
            if(response.data.success){
                  // message.success(<span style={{fontweight:"bolder"}}></span>)
                  // message.success({content:"password changed successfully",className:"custom-message"})
                  message.success(
                  <span className='custom-message'>Password changed successfully. Now sign in with the updated password only</span> 
                  );
                  
                  navigate("/loginpage")
                  message.info(<span className='custom-message'>Now signIn with updated password only.</span>)
            }
        } catch (error) {
          
          console.log(error);
          console.log('error caught ');
         }
          // console.log(email);
          
  }

  const onFailedHandler = ()=>{
        message.error( <span className='custom-message'>an error occured while changing new password.</span> )
  }

    const [form]=Form.useForm();
      return(
        <>
          <div className='parent-container'>
               {/* <h1>this is reset passsowrd 2 </h1> */}
          {/* from tomorrow 28th jan 2024 start from here. with 2 columns may be like new password and confirm new password field. */}
                <div className='resetPassword2-ParentContainer'>
                    <h1 className='header' style={{textAlign:"center"}}>Reset Password </h1>
                    <div className=''>
                        <Form
                          form={form}
                        
                         onFinish={onFinishHandler}
                       onFinishFailed={onFailedHandler}
                      labelWrap
                        labelCol={ {span:6}}
                        wrapperCol={{span:12,offset:1}}
                      
                        >
                         
                                <Form.Item 
                                validateTrigger="onBlur"
                                  label="Enter your new password"
                                  name={"newPassword"}
                                  rules={[
                                      {
                                        required:true,
                                         message:"This field is  required"
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
                                    <Input.Password visibilityToggle allowClear placeholder='New Password' />
                                </Form.Item>

                                <Form.Item 
                                  label="Re-enter your new password"
                                  name={"confirmNewPassword"}
                                  rules={[
                                      {
                                        required:true,
                                        //  message:"email required"
                                      },

                                      {
                            validator:(_,value)=>{

                                if(value===form.getFieldValue("newPassword"))
                                {
                                   return Promise.resolve();
                                  
                                }
                                else{
                                 return Promise.reject("Confirm password must be matched with the new Password ")
                                }
                            }
                        }
                              ]}
                            
                                >
                                    <Input.Password allowClear placeholder='Confirm New Password' />
                                </Form.Item>
                            {/* </Space>     */}
                            <Form.Item wrapperCol={{span:13,offset:11}}>
                              <Button style={{padding:"0px 20px",letterSpacing:"0.1rem",color:"white",backgroundColor:"#0779E4"}} className='form-button' htmlType='submit'>Set Password</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
          </div>     
        </>
      )
}