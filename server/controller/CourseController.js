const Course = require("../models/Course");
const Lecturer = require("../models/Lecturer");
const Kategory = require("../models/Kategory");
const getAllCourses = async (req, res) => {
  const courses = await Course.find()
    .populate("lecturer", { name: 1 })
    .populate("kategory", { type: 1 })
    .lean();
  res.json(courses);
};


const getActiveCourses = async (req, res) => {
  const courses = await Course.find({date:{$lte:new Date()}})
    .populate("lecturer", { name: 1 })
    .populate("kategory", { type: 1 })
    .lean();
  res.json(courses);
};
const getCoursesByKategory = async (req, res) => {
  const courses = await Course.find()
    .populate("lecturer", { name: 1 })
    .populate("kategory", { type: 1 })
    .lean();
  res.json(courses);
};

const createNewCourse = async (req, res) => {
  const {
    title,
    lecturer,
    date,
    startHour,
    cost,
    kategory,
    sex,
    familyStatus,
    lastDateToRegist,
  } = req.body;
  if (
    !title ||
    !lecturer ||
    !cost ||
    !kategory ||
    !sex ||
    !familyStatus ||
    !lastDateToRegist
  ) {
    return res.status(400).json({ message: "לא הוכנסו כל שדות החובה" });
  }
  // Lecturerקיים
  const checkLecturer = await Lecturer.findOne({ _id: lecturer }).lean();
  if (!checkLecturer) {
    return res.status(400).json({ message: "undefined lecturer" });
  }
  ////kategory!!!!!!!!!!!!!!!!!!
  const checkKategory = await Kategory.findOne({ _id: kategory }).lean();
  if (!checkKategory) {
    return res.status(400).json({ message: "undefined kategory" });
  }

  const course = await Course.create({
    title,
    lecturer,
    date,
    startHour,
    cost,
    kategory,
    sex,
    familyStatus,
    lastDateToRegist,
  });
  if (course) {
    return res.status(202).json(course);
  }
  return res.status(400).json({ message: "invalid course" });
};
const getCourseById = async (req, res) => {
  const { _id } = req.params;
  const course = await Course.findById(_id).exec();
  if (!course) {
    return res.status(400).json({ message: "no such course" });
  }
  res.json(course);
};

const updateCourse = async (req, res) => {
  const {
    _id,
    title,
    lecturer,
    date,
    startHour,
    cost,
    kategory,
    sex,
    familyStatus,
    lastDateToRegist
  } = req.body;
  //התקבלו שדות החובה
  if (
    !_id ||
    !title ||
    !lecturer ||
    !cost ||
    !kategory ||
    !sex ||
    !familyStatus
  ) {
    return res.status(400).json({ message: "יש למלא את כל שדות החובה" });
  }

  // Lecturerקיים
  const checkLecturer = await Lecturer.findOne({ _id: lecturer }).lean();
  if (!checkLecturer) {
    return res.status(400).json({ message: "undefined lecturer" });
  }
  ////kategory!!!!!!!!!!!!!!!!!!
  const checkKategory = await Kategory.findOne({ _id: kategory }).lean();
  if (!checkKategory) {
    return res.status(400).json({ message: "undefined kategory" });
  }

  const course = await Course.findById({ _id }).exec();
  if (!course) {
    return res.status(400).json({ message: "course not found" });
  }
  course.title = title;
  course.lecturer = lecturer;
  course.date = date;
  course.startHour = startHour;
  course.cost = cost;
  course.kategory = kategory;
  course.sex = sex;
  course.familyStatus = familyStatus;
  course.lastDateToRegist = lastDateToRegist;
  const updateCourse = await course.save();
  res.json({ message: "courses detailds changed" });
};
const deleteCourse = async (req, res) => {
  const { _id } = req.body;

  const course = await Course.findById({ _id }).exec();
  if (!course) {
    return res.status(400).json({ message: "no such course" });
  }
  const courseRes = await course.deleteOne();
  res.json({ message: "course delited" });
};

module.exports = {
  getAllCourses,
  createNewCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  getActiveCourses
};
