import {configureStore} from "@reduxjs/toolkit";
import {api} from "../api/Index.jsx";
// import {reducer as allReducer} from "../slice/usersSlice.jsx";

const store = configureStore({
  reducer: {
    // users: allReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(api.middleware)
})

export default store