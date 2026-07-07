const Course = require('../models/Course');
const { getEffectiveStatus } = require('../utils/courseStatus');

exports.createCourse = async (req, res) => {
    try {
        const rawDates = req.body.dates;
        const dates = rawDates
            ? (Array.isArray(rawDates) ? rawDates : [rawDates])
            : [];

        const courseData = new Course({
            title: req.body.title,
            image: req.file?.path || req.body.image,
            dates,
            location: req.body.location,
            fullDescription: req.body.fullDescription,
			status: req.body.status || 'open',
            capacity: req.body.capacity ? Number(req.body.capacity) : null,
            formType: req.body.formType || null,
            subCourses: req.body.subCourses ? JSON.parse(req.body.subCourses) : [],
			grantsAcademicLevel: req.body.grantsAcademicLevel || null,
			assessmentRounds: req.body.assessmentRounds ? JSON.parse(req.body.assessmentRounds) : [],
			customQuestions: req.body.customQuestions ? JSON.parse(req.body.customQuestions) : [],
        });

        await courseData.save();

        res.status(201).json({ success: true, message: 'Course created successfully', course: courseData });
    } catch (err) {
        console.error('Create course error:', err);
        res.status(500).json({ success: false, message: 'Failed to create course', error: err.message });
    }
};

exports.getAllCourses = async (req, res) => {
	try {		
		const { fields } = req.query;
		const projection = fields === 'list' ? 'title image dates status' : '';
		
		const courses = await Course.find().select(projection).sort({ _id: -1 });

		if (!courses) {
			return res.status(404).json({
				success: false,
				message: "Courses not found"
			});
		}

		const coursesWithStatus = courses.map((course) => {
			const obj = course.toObject();
			obj.status = getEffectiveStatus(course);
			return obj;
		})

		res.json({
			success: true,
			count: coursesWithStatus.length,
			courses: coursesWithStatus
		});
	} catch(err) {
		console.error('getAllCourses error:', err);

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

		const obj = course.toObject();
		obj.status = getEffectiveStatus(course);

		res.json({
			success: true,
			course: obj
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

		const rawDates = req.body.dates;
		const dates = rawDates
			? (Array.isArray(rawDates) ? rawDates : [rawDates]).flat().filter(Boolean)
			: undefined;

		const updateData = {
			title: req.body.title,
			location: req.body.location,
			fullDescription: req.body.fullDescription,
			status: req.body.status,
			formType: req.body.formType || null,
			capacity: req.body.capacity ? Number(req.body.capacity) : null,
			grantsAcademicLevel: req.body.grantsAcademicLevel || null,
		};
		if (dates?.length) updateData.dates = dates;
		if (req.file?.path) {
			updateData.image = req.file.path;
		}

		if (req.body.subCourses) {
			updateData.subCourses = JSON.parse(req.body.subCourses);
		}

		if (req.body.assessmentRounds) {
			updateData.assessmentRounds = JSON.parse(req.body.assessmentRounds);
		}

		if (req.body.customQuestions) {
			updateData.customQuestions = JSON.parse(req.body.customQuestions);
		}

		if ('capacity' in updateData) {
			updateData.capacity = updateData.capacity && !isNaN(Number(updateData.capacity))
				? Number(updateData.capacity)
				: null;
		}

		const course = await Course.findByIdAndUpdate(
			id,
			updateData,
			{ new: true, runValidators: true }
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