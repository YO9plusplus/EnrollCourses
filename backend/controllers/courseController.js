const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
	try {
		const courseData = new Course({
			title: req.body.title,
			image: req.body.image,
			dates: req.body.dates,
			location: req.body.location,
			fullDescription: req.body.fullDescription,
		});

		await courseData.save();

		res.status(201).json({
			success : true,
			message: 'Course created successfully',
			course: courseData
		});
	} catch (err) {
		console.error('Create course error: ', err);
		res.status(500).json({
			success: false,
			message: 'Failed to create course',
			error: err.message
		});
	}
};

exports.getAllCourses = async (req, res) => {
	try {
		const courses = await Course.find().sort({ _id: -1 });

		if (!courses) {
			return res.status(404).json({
				success: false,
				message: "Courses not found"
			});
		}

		res.json({
			success: true,
			count: courses.length,
			courses
		});
	} catch(err) {
		res.status(500).json({
			success: false,
			message: 'Failed to get courses',
			error: err.message
		});
	}
};

exports.getCourse = async (req, res) => {
	try {
		const { id } = req.params;
		const course = await Course.findById(id);

		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course not found"
			});
		}

		res.json({
			success: true,
			course
		});
	} catch(err) {
		res.status(500).json({
			success: false,
			message: 'Failed to get a course'
		});
	}
};

exports.updateCourse = async (req, res) => {
	try {
		const { id } = req.params;

		const course = await Course.findByIdAndUpdate(
			id,
			{ ...req.body },
			{ new: true }
		);

		if (!course) {
			return res.status(404).json({
				success: false,
				message: 'Course not found'
			});
		}

		res.json({
			success: true,
			message: 'Course updated successfully',
			course
		});
	} catch(err) {
		res.status(500).json({
			success: false,
			message: 'Failed to update course',
			error: err.message
		});
	}
}

exports.deleteCourse = async (req, res) => {
	try {
		const { id } = req.params;
		const course = await Course.findByIdAndDelete(id);

		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course not found"
			})
		}

		res.status(200).json({
			success: true,
			message: `Delete ${course.title} successfully`
		})
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Failed to delete a course'
		})
	}
};