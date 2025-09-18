const Category = require('../models/category');
const Course = require('../models/course');

// Helper to get random integer
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// GET /api/v1/course/getCategoryPageDetails?categoryId=...
exports.getCategoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.query;
    if (!categoryId) {
      return res.status(404).json({ success: false, message: 'categoryId is required' });
    }

    // Find selected category and populate its courses
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: 'courses',
        match: { status: 'Published' },
        populate: { path: 'ratingAndReviews' },
      });

    if (!selectedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Find a different random category
    const otherCategories = await Category.find({ _id: { $ne: categoryId } });
    let differentCategory = null;
    if (otherCategories.length > 0) {
      const randomCat = otherCategories[getRandomInt(otherCategories.length)];
      differentCategory = await Category.findById(randomCat._id)
        .populate({ path: 'courses', match: { status: 'Published' } });
    }

    // Find most selling courses (by studentsEnrolled count)
    const allCourses = await Course.find({ status: 'Published' });
    const mostSellingCourses = allCourses
      .sort((a, b) => (b.studentsEnrolled.length || 0) - (a.studentsEnrolled.length || 0))
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        selectedCategory: {
          name: selectedCategory.name,
          description: selectedCategory.description,
          courses: selectedCategory.courses || [],
        },
        differentCategory: differentCategory
          ? {
              name: differentCategory.name,
              courses: differentCategory.courses || [],
            }
          : null,
        mostSellingCourses,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};
