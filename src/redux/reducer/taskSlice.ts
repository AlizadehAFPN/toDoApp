import {createSlice} from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
    
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    }, 
    editTask: (state, action) => {
      let temp = state.map(item =>
        item.id == action.payload.id
          ? {
            ...item,
              name :  action.payload.name,
              editedtime: action.payload.editedtime,
            }
          : item,
      )
      return temp
    },
  },
});
// Action creators are generated for each case reducer function
export const {addTask , deleteTask , editTask} = taskSlice.actions;

export default taskSlice.reducer;
