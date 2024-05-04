import { createSlice } from "@reduxjs/toolkit";

    const isUserLoggedInSlice = createSlice({
        name:"loggedInStatus",
        initialState:{
            status:true,
            userData:null
        },
        reducers:{
            login:(state,action)=>{
                state.status=true;
                state.userData=action.payload.userData
            },
            logout:(state)=>{
                state.status=false
                state.userData=null;
            }
        }
    })

    export default isUserLoggedInSlice.reducer 
    export const {login,logout} = isUserLoggedInSlice.actions