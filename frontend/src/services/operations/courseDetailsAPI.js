import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";
import { courseEndpoints } from "../apis";
//import { updateCompletedLectures } from "../../slices/viewCourseSlice";

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints;

// ======================= Helper =======================
const handleApiCall = async (apiFunc) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    result = await apiFunc();
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || error.message);
    result = { success: false, error: error.message };
  } finally {
    toast.dismiss(toastId);
  }
  return result;
};

// ======================= API FUNCTIONS =======================

// Get All Courses
export const getAllCourses = async () => {
  return handleApiCall(async () => {
    const response = await apiConnector("GET", GET_ALL_COURSE_API);
    if (!response?.data?.success) throw new Error("Could Not Fetch Courses");
    return response.data.data;
  });
};

// Fetch Course Details
export const fetchCourseDetails = async (courseId) => {
  return handleApiCall(async () => {
    const response = await apiConnector("POST", COURSE_DETAILS_API, { courseId });
    if (!response.data.success) throw new Error(response.data.message);
    return response.data.data || response.data;
  });
};

// Fetch Course Categories
export const fetchCourseCategories = async () => {
  return handleApiCall(async () => {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);
    if (!response?.data?.success) throw new Error("Could Not Fetch Categories");
    return response.data.data;
  });
};

// Add Course Details
export const addCourseDetails = async (data, token) => {
  return handleApiCall(async () => {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) throw new Error("Could Not Add Course Details");
    toast.success("Course Details Added Successfully");
    return response.data.data;
  });
};

// Edit Course Details
export const editCourseDetails = async (data, token) => {
  return handleApiCall(async () => {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) throw new Error("Could Not Update Course Details");
    toast.success("Course Details Updated Successfully");
    return response.data.data;
  });
};

// Create Section
export const createSection = async (data, token) => {
  return handleApiCall(async () => {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) throw new Error("Could Not Create Section");
    toast.success("Course Section Created");
    return response.data.updatedCourseDetails;
  });
};

// Create SubSection
export const createSubSection = async (data, token) => {
  return handleApiCall(async () => {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) throw new Error("Could Not Add Lecture");
    toast.success("Lecture Added");
    return response.data.data;
  });
};

// Update Section
export const updateSection = async (data, token) => {
  return handleApiCall(async () => {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) throw new Error("Could Not Update Section");
    toast.success("Course Section Updated");
    return response.data.data;
  });
};

// Update SubSection
export const updateSubSection = async (data, token) => {
  return handleApiCall(async () => {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) throw new Error("Could Not Update Lecture");
    toast.success("Lecture Updated");
    return response.data.data;
  });
};

// Delete Section
export const deleteSection = async (data, token) => {
  return handleApiCall(async () => {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) throw new Error("Could Not Delete Section");
    toast.success("Course Section Deleted");
    return response.data.data;
  });
};

// Delete SubSection
export const deleteSubSection = async (data, token) => {
  return handleApiCall(async () => {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) throw new Error("Could Not Delete Lecture");
    toast.success("Lecture Deleted");
    return response.data.data;
  });
};

// Fetch Instructor Courses
export const fetchInstructorCourses = async (token) => {
  return handleApiCall(async () => {
    const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) throw new Error("Could Not Fetch Instructor Courses");
    return response.data.data;
  });
};

// Delete Course
export const deleteCourse = async (data, token) => {
  return handleApiCall(async () => {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) throw new Error("Could Not Delete Course");
    toast.success("Course Deleted");
    return true;
  });
};

// Get Full Details of Course
export const getFullDetailsOfCourse = async (courseId, token) => {
  return handleApiCall(async () => {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      { courseId },
      { Authorization: `Bearer ${token}` }
    );
    if (!response?.data?.success) throw new Error(response.data.message || "Could Not Fetch Details");
    return response.data.data;
  });
};

// Mark Lecture as Complete
export const markLectureAsComplete = async (data, token) => {
  return handleApiCall(async () => {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) throw new Error(response.data.message || "Could Not Complete Lecture");
    toast.success("Lecture Completed");
    return true;
  });
};

// Create Course Rating
export const createRating = async (data, token) => {
  return handleApiCall(async () => {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) throw new Error("Could Not Create Rating");
    toast.success("Rating Created");
    return true;
  });
};
