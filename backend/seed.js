// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Import your models
const User = require('./models/user');
const Profile = require('./models/profile');
const Category = require('./models/category');
const Course = require('./models/course');
const Section = require('./models/section');
const SubSection = require('./models/subSection');
const CourseProgress = require('./models/courseProgress');

const MONGO_URI = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/edutech';

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(' Connected to MongoDB');

    // Clear existing collections
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Category.deleteMany({});
    await Course.deleteMany({});
    await Section.deleteMany({});
    await SubSection.deleteMany({});
    await CourseProgress.deleteMany({});

    // 1. Create Profiles & Users

    const usersData = [
      { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: '123456', accountType: 'Student' },
      { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: '123456', accountType: 'Instructor' },
      { firstName: 'Bob', lastName: 'Brown', email: 'bob@example.com', password: '123456', accountType: 'Instructor' },
    ];

    const users = [];
    for (const u of usersData) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      const profile = await Profile.create({
        bio: `${u.firstName} ${u.lastName} bio`,
        dateOfBirth: null,
        gender: null,
        contactNumber: null,
      });

      const user = await User.create({
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        password: hashedPassword,
        accountType: u.accountType,
        approved: u.accountType === 'Instructor' ? false : true,
        additionalDetails: profile._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${u.firstName}${u.lastName}`,
      });

      users.push(user);
    }

    // 2. Create Categories

    const categoriesData = [
      { name: 'Web Development', description: 'Learn full stack web development' },
      { name: 'Data Science', description: 'Learn data analysis and AI/ML' },
      { name: 'Mobile Development', description: 'Learn to build mobile apps' },
    ];

    const categories = [];
    for (const c of categoriesData) {
      const category = await Category.create(c);
      categories.push(category);
    }

    // 3. Create Courses with Sections & SubSections

    const coursesData = [
      { title: 'React for Beginners', description: 'Learn React.js from scratch', instructor: users[1]._id, category: categories[0]._id },
      { title: 'Node.js Mastery', description: 'Backend with Node.js', instructor: users[1]._id, category: categories[0]._id },
      { title: 'Python for Data Science', description: 'Learn Python & ML', instructor: users[2]._id, category: categories[1]._id },
      { title: 'Android Development', description: 'Learn Android Studio', instructor: users[2]._id, category: categories[2]._id },
      { title: 'Full Stack MERN', description: 'MERN Stack Development', instructor: users[1]._id, category: categories[0]._id },
    ];

    for (const c of coursesData) {
      const course = await Course.create({
        courseName: c.title,
        courseDescription: c.description,
        instructor: c.instructor,
        category: c.category,
        price: 0,
        whatYouWillLearn: ['Understand basics', 'Learn by example', 'Build projects'],
        tag: ['Beginner', 'Example'],
        status: 'Draft',
        studentsEnrolled: [],
        instructions: [],
      });

      const sectionIds = [];
      for (let i = 1; i <= 2; i++) {
        const section = await Section.create({
          title: `Section ${i} of ${course.courseName}`,
          courseId: course._id,
        });
        sectionIds.push(section._id);

        for (let j = 1; j <= 2; j++) {
          await SubSection.create({
            title: `SubSection ${j} of ${section.title}`,
            sectionId: section._id,
            type: 'video',
            videoUrl: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
            duration: 600, // seconds
          });
        }
      }

      // Link sections to course
      course.courseContent = sectionIds;
      await course.save();
    }

    console.log(' Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error(' Error seeding database:', error);
    process.exit(1);
  }
};

seed();
