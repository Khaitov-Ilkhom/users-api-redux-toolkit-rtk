import {fetchBaseQuery, retry, createApi} from "@reduxjs/toolkit/query/react";

const baseQuery = async (args, api, extraOptions) => {
  const {dispatch} = api;
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    }
  })

  const response = await rawBaseQuery(args, api, extraOptions);


  // if(response.error){
  //     const {status} = response.error;
  //     if(status === 401 || status === 403){
  //         dispatch()
  //     }
  // }

  return response
}

const fetchBaseQueryWithRetry = retry(baseQuery, {maxRetries: 0});

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQueryWithRetry,
  tagTypes: ["TODO"],
  endpoints: () => ({})
})