import {api} from "./Index.jsx";

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: "/"
      }),
      providesTags: ["USER"]
    }),
    deleteUser: build.mutation({
      query: ({id}) => ({
        url: `/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["USER"]
    }),
    changeActive: build.mutation({
      query: (user) => ({
        url: `/${user.id}`,
        method: "PUT",
        body: {...user}
      }),
      invalidatesTags: ["USER"]
    }),
    addNewUser: build.mutation({
      query: (user) => ({
        url: "/",
        method: "POST",
        body: user
      }),
      invalidatesTags: ["USER"]
    })
  })
})

export const {useGetAllUsersQuery, useDeleteUserMutation, useChangeActiveMutation, useAddNewUserMutation} = usersApi