const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config({ path: './.env' });

const courses = [
  {
    title: "ปฐมนิเทศข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    image: "https://example.com/course1.jpg",
    dates: [
      new Date("2026-03-05"), new Date("2026-03-06"), new Date("2026-03-07"),
      new Date("2026-03-19"), new Date("2026-03-20"), new Date("2026-03-21"),
      new Date("2026-03-26"), new Date("2026-03-27"), new Date("2026-03-28"),
    ],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ปฐมนิเทศข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'open',
    capacity: null,
    enrolledCount: 0,
  },
  {
    title: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูฯ ก่อนแต่งตั้งให้มีหรือเลื่อนเป็นวิทยฐานะชำนาญการพิเศษและวิทยฐานะเชี่ยวชาญ",
    image: "https://example.com/course2.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร ก่อนแต่งตั้งให้มีหรือเลื่อนเป็นวิทยฐานะชำนาญการพิเศษและวิทยฐานะเชี่ยวชาญ ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
  },
  {
    title: "ฝึกอบรมหลักสูตรการพัฒนาครูตามสมรรถนะประจำสายงาน",
    image: "https://example.com/course3.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมหลักสูตรการพัฒนาครูตามสมรรถนะประจำสายงาน ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
  },
  {
    title: "โครงการพัฒนาคุณภาพการเรียนการสอนภาษาอังกฤษ",
    image: "https://example.com/course4.jpg",
    dates: [
      new Date("2026-03-19"),
      new Date("2026-03-22"), new Date("2026-03-23"), new Date("2026-03-24"), new Date("2026-03-25"), new Date("2026-03-26"),
    ],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "โครงการพัฒนาคุณภาพการเรียนการสอนภาษาอังกฤษ ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'open',
    capacity: null,
    enrolledCount: 0,
  },
  {
    title: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูฯ ก่อนแต่งตั้งให้ดำรงตำแหน่งรองผู้อำนวยการสถานศึกษา",
    image: "https://example.com/course5.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร ก่อนแต่งตั้งให้ดำรงตำแหน่งรองผู้อำนวยการสถานศึกษา ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
  },
  {
    title: "ฝึกอบรมหลักสูตรการพัฒนาศึกษานิเทศก์ตามสมรรถนะประจำสายงาน",
    image: "https://example.com/course6.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมหลักสูตรการพัฒนาศึกษานิเทศก์ตามสมรรถนะประจำสายงาน ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
  },
  {
    title: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูฯ ตำแหน่งผู้อำนวยการสถานศึกษา สังกัดกรุงเทพมหานคร",
    image: "https://example.com/course7.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร ตำแหน่งผู้อำนวยการสถานศึกษา สังกัดกรุงเทพมหานคร ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
  },
  {
    title: "ฝึกอบรมหลักสูตรนักบริหารการศึกษามหานครระดับสูง (นศส.) รุ่นที่ 10",
    image: "https://example.com/course8.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมหลักสูตรนักบริหารการศึกษามหานครระดับสูง (นศส.) รุ่นที่ 10 ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
  },
  {
    title: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูฯ ตำแหน่งรองผู้อำนวยการสถานศึกษา สังกัดกรุงเทพมหานคร",
    image: "https://example.com/course9.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร ตำแหน่งรองผู้อำนวยการสถานศึกษา สังกัดกรุงเทพมหานคร ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
  },
  {
    title: "ฝึกอบรมบุคลากรทางการลูกเสือ",
    image: "https://example.com/course10.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมบุคลากรทางการลูกเสือ A.T.C. สามัญ และสามัญรุ่นใหญ่ ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
	courseKey: 'scout',
    capacity: null,
    enrolledCount: 0,
  },
  {
    title: "ฝึกอบรมผู้บังคับบัญชายุวกาชาด",
    image: "https://example.com/course11.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมผู้บังคับบัญชายุวกาชาด (ผู้บริหาร) ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
	courseKey: 'redcross',
    capacity: null,
    enrolledCount: 0,
  },
  {
    title: "ฝึกอบรม Restorative Justice กระบวนการยุติธรรมเชิงฟื้นฟูเยียวยา",
    image: "https://example.com/course12.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรม Restorative Justice กระบวนการยุติธรรมเชิงฟื้นฟูเยียวยา ประจำปีงบประมาณ พ.ศ. 2569 *อาจมีการเปลี่ยนแปลง*",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
  },
];

const seed = async () => {
  if (process.env.NODE_ENV === 'production') {
    console.log('❌ ห้ามรัน seed ใน production');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  await Course.deleteMany();
  await Course.insertMany(courses);
  console.log(`✅ Seed สำเร็จ ${courses.length} courses`);
  mongoose.disconnect();
};

seed();