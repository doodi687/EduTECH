const Category = require('../models/category')

// get Random Integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

// ================ create Category ================
exports.createCategory = async (req, res) => {
    try {
        // extract data
        const { name, description } = req.body;

        // validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const categoryDetails = await Category.create({
            name: name, description: description
        });

        res.status(200).json({
            success: true,
            message: 'Category created successfully'
        });
    }
    catch (error) {
        console.log('Error while creating Category');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while creating Category',
            error: error.message
        })
    }
}


// ================ get All Category ================
exports.showAllCategories = async (req, res) => {
    try {
        // get all category from DB
        const allCategories = await Category.find({}, { name: true, description: true });

        // return response
        res.status(200).json({
            success: true,
            data: allCategories,
            message: 'All allCategories fetched successfully'
        })
    }
    catch (error) {
        console.log('Error while fetching all allCategories');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while fetching all allCategories'
        })
    }
}


exports.getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.query;

        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })
            .exec();

        if (!selectedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // Ensure courses array exists
        if (!selectedCategory.courses) selectedCategory.courses = [];

        const categoriesExceptSelected = await Category.find({ _id: { $ne: categoryId } });

        let differentCategory = null;
        if (categoriesExceptSelected.length > 0) {
            const randomCategory = categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)];
            differentCategory = await Category.findById(randomCategory._id)
                .populate({ path: "courses", match: { status: "Published" } })
                .exec();
        }

        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: { path: "instructor" },
            });

        const allCourses = allCategories.flatMap(c => c.courses);
        const mostSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0, 10);

        res.status(200).json({
            success: true,
            data: { selectedCategory, differentCategory, mostSellingCourses },
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};
