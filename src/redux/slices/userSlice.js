import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState :{
        user : null
    },
    reducers :{
        setUser : (state , action)=>{
            console.log("state" , state)
            console.log("action" , action)
            state.user = action.payload
        },
        removeUser: (state , action)=>{
            const userExists = state.user
            if(userExists){
                state.user = null
            }
        }
    }
})


export const {setUser} = userSlice.actions;
export default userSlice.reducer