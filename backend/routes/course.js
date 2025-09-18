const express = require('express');
const router = express.Router();

// Import controllers
const {
  createCourse,
  getCourseDetails,
  getAllCourses,
  getFullCourseDetails,
  editCourse,
  deleteCourse,
  getInstructorCourses,
} = require('../controllers/course');

const { updateCourseProgress } = require('../controllers/courseProgress');

const {
  createCategory,
  showAllCategories,
} = require('../controllers/category');

const { getCategoryPageDetails } = require('../controllers/getCategoryPageDetails');

const {
  createSection,
  updateSection,
  deleteSection,
} = require('../controllers/section');

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require('../controllers/subSection');

const {
  createRating,
  getAverageRating,
  getAllRatingReview,
} = require('../controllers/ratingAndReview');

const { auth, isAdmin, isInstructor, isStudent } = require('../middleware/auth');


// ********************************************************************************************************
//                                      Course Routes
// ********************************************************************************************************

// Courses can only be created by instructors
router.post('/createCourse', auth, isInstructor, createCourse);

// Section routes
router.post('/addSection', auth, isInstructor, createSection);
router.post('/updateSection', auth, isInstructor, updateSection);
router.post('/deleteSection', auth, isInstructor, deleteSection);

// Subsection routes
router.post('/addSubSection', auth, isInstructor, createSubSection);
router.post('/updateSubSection', auth, isInstructor, updateSubSection);
router.post('/deleteSubSection', auth, isInstructor, deleteSubSection);

// Fetch course details
router.get('/getCourseDetails', getCourseDetails); // frontend should use GET
router.get('/getAllCourses', getAllCourses);       // fetch all courses
router.post('/getFullCourseDetails', auth, getFullCourseDetails); // detailed course info
router.get('/getInstructorCourses', auth, isInstructor, getInstructorCourses);

// Edit & Delete courses
router.post('/editCourse', auth, isInstructor, editCourse);
router.delete('/deleteCourse', auth, isInstructor, deleteCourse);

// Update course progress
router.post('/updateCourseProgress', auth, isStudent, updateCourseProgress);


// ********************************************************************************************************
//                                      Category Routes
// ********************************************************************************************************

// Category routes (admin only)
router.post('/createCategory', auth, isAdmin, createCategory);
router.get('/showAllCategories', showAllCategories);           // fetch all categories
router.get('/getCategoryPageDetails', getCategoryPageDetails); // fetch category page details


// ********************************************************************************************************
//                                      Rating & Review Routes
// ********************************************************************************************************
router.post('/createRating', auth, isStudent, createRating);
router.get('/getAverageRating', getAverageRating);
router.get('/getReviews', getAllRatingReview);


module.exports = router;
