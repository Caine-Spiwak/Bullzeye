import { apiSlice } from "./apiSlice";
const TODOS_URL = '/api/todos'

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
		getTodos: builder.query({
			query: (data) => ({
				url: `${TODOS_URL}`,
        body: data
			}),
			providesTags: ['Todos']
		}),
		createTodo: builder.mutation({
			query: (data) => ({
				url: `${TODOS_URL}`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Tasks']
		}),
		deleteTodo: builder.mutation({
			query: (data) => ({
				url: `${TODOS_URL}`,
				method: 'DELETE',
				body: data
			}),
			invalidatesTags: ['Todos', 'Tasks']
		}),
		updateTodo: builder.mutation({
			query: (data) => ({
				url: `${TODOS_URL}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['Todos','Tasks']
		})
	})
})

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation
} = tasksApiSlice