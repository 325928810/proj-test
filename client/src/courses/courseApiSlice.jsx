import apiSlice from "../App/apiSlice";

const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCourses: build.query({
      query: () => ({
        url: "/api/courses",
      }),
      providesTags:["courses"]
    }),
    getActiveCourses: build.query({
      query: () => ({
        url: "/api/courses/getActivecourses",
      }),
      invalidatesTags:["courses"]
    }),
    addCourse: build.mutation({
      query: (course) => ({
        url: "/api/courses",
        method: "POST",
        body: course,
      }),
      invalidatesTags:["courses"]
    }),
    updateCourse: build.mutation({
      query: (course) => ({
        url: "/api/courses",
        method: "PUT",
        body: course,
      }),
      invalidatesTags:["courses"]
    }),

    deleteCourse: build.mutation({
      query: (_id) => ({
        url: "/api/courses",
        method: "DELETE",
        body: _id,
      }),
      invalidatesTags:["courses"]
    }),

  }),
});
export const { useAddCourseMutation, useGetCoursesQuery,useUpdateCourseMutation,useDeleteCourseMutation,useGetActiveCoursesQuery } = courseApiSlice;
