// src/services/operations/pageAndComponentData.js
import apiConnector from "../apiConnector"; // <-- default import
import { toast } from "react-hot-toast";

// ================ get Catalog Page Data ================
export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector(
      "GET",
      "http://localhost:5000/api/v1/course/getCategoryPageDetails",
      null,                    // no body for GET
      null,                    // no custom headers
      { categoryId }            // query params
    );

    // Check if API response is successful
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch category page data");
    }

    result = response.data.data; // store the actual data
  } catch (error) {
    console.error("CATALOG PAGE DATA API ERROR:", error);
    toast.error(error.response?.data?.message || error.message);
    result = null;
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};
