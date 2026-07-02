const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config({ path: './.env' });

const courses = [
  {
    title: "ปฐมนิเทศข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    image: "https://res.cloudinary.com/dgtlvqpb3/image/upload/v1774165048/%E0%B8%9B%E0%B8%90%E0%B8%A1%E0%B8%99%E0%B8%B4%E0%B9%80%E0%B8%97%E0%B8%A8_n4yrsv.jpg",
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
    formType: null,
  },
  {
    title: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูฯ ก่อนแต่งตั้งให้มีหรือเลื่อนเป็นวิทยฐานะชำนาญการพิเศษและวิทยฐานะเชี่ยวชาญ",
    image: "https://res.cloudinary.com/dgtlvqpb3/image/upload/v1774165048/%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%90%E0%B8%B2%E0%B8%99%E0%B8%B0%E0%B8%8A%E0%B8%B3%E0%B8%99%E0%B8%B2%E0%B8%8D%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9E%E0%B8%B4%E0%B9%80%E0%B8%A8%E0%B8%A9_jkcnnm.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร ก่อนแต่งตั้งให้มีหรือเลื่อนเป็นวิทยฐานะชำนาญการพิเศษและวิทยฐานะเชี่ยวชาญ ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
    formType: null,
  },
  {
    title: "ฝึกอบรมหลักสูตรการพัฒนาครูตามสมรรถนะประจำสายงาน",
    image: "https://res.cloudinary.com/dgtlvqpb3/image/upload/v1774165047/%E0%B8%AD%E0%B8%B7%E0%B9%88%E0%B8%99%E0%B9%86_yauwzb.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมหลักสูตรการพัฒนาครูตามสมรรถนะประจำสายงาน ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
    formType: null,
  },
  {
    title: "โครงการพัฒนาคุณภาพการเรียนการสอนภาษาอังกฤษ",
    image: "https://res.cloudinary.com/dgtlvqpb3/image/upload/v1774165047/%E0%B8%AD%E0%B8%B7%E0%B9%88%E0%B8%99%E0%B9%86_yauwzb.jpg",
    dates: [
      new Date("2026-03-19"),
      new Date("2026-03-22"), new Date("2026-03-23"), new Date("2026-03-24"),
      new Date("2026-03-25"), new Date("2026-03-26"),
    ],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "โครงการพัฒนาคุณภาพการเรียนการสอนภาษาอังกฤษ ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'open',
    capacity: null,
    enrolledCount: 0,
    formType: null,
  },
  {
    title: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูฯ ก่อนแต่งตั้งให้ดำรงตำแหน่งรองผู้อำนวยการสถานศึกษา",
    image: "https://res.cloudinary.com/dgtlvqpb3/image/upload/v1774165048/%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%A9_e8sdsa.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร ก่อนแต่งตั้งให้ดำรงตำแหน่งรองผู้อำนวยการสถานศึกษา ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
    formType: null,
  },
  {
    title: "ฝึกอบรมหลักสูตรการพัฒนาศึกษานิเทศก์ตามสมรรถนะประจำสายงาน",
    image: "https://res.cloudinary.com/dgtlvqpb3/image/upload/v1774165047/%E0%B8%AD%E0%B8%B7%E0%B9%88%E0%B8%99%E0%B9%86_yauwzb.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมหลักสูตรการพัฒนาศึกษานิเทศก์ตามสมรรถนะประจำสายงาน ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
    formType: null,
  },
  {
    title: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูฯ ตำแหน่งผู้อำนวยการสถานศึกษา สังกัดกรุงเทพมหานคร",
    image: "https://res.cloudinary.com/dgtlvqpb3/image/upload/v1774165048/%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%A9_e8sdsa.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร ตำแหน่งผู้อำนวยการสถานศึกษา สังกัดกรุงเทพมหานคร ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
    formType: null,
  },
  {
    title: "ฝึกอบรมหลักสูตรนักบริหารการศึกษามหานครระดับสูง (นศส.) รุ่นที่ 10",
    image: "https://res.cloudinary.com/dgtlvqpb3/image/upload/v1774165047/%E0%B8%AD%E0%B8%B7%E0%B9%88%E0%B8%99%E0%B9%86_yauwzb.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมหลักสูตรนักบริหารการศึกษามหานครระดับสูง (นศส.) รุ่นที่ 10 ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
    formType: null,
  },
  {
    title: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูฯ ตำแหน่งรองผู้อำนวยการสถานศึกษา สังกัดกรุงเทพมหานคร",
    image: "https://res.cloudinary.com/dgtlvqpb3/image/upload/v1774165048/%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%A9_e8sdsa.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร ตำแหน่งรองผู้อำนวยการสถานศึกษา สังกัดกรุงเทพมหานคร ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
    formType: null,
  },
  {
    title: "ฝึกอบรมบุคลากรทางการลูกเสือ",
    image: "https://res.cloudinary.com/dgtlvqpb3/image/upload/v1774165100/logo%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD_znfedk.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมบุคลากรทางการลูกเสือ A.T.C. สามัญ และสามัญรุ่นใหญ่ ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'open',
    capacity: null,
    enrolledCount: 0,
    formType: 'scout',
  },
  {
    title: "ฝึกอบรมผู้บังคับบัญชายุวกาชาด",
    image: "https://res.cloudinary.com/dgtlvqpb3/image/upload/v1774165100/logo%E0%B8%A2%E0%B8%B8%E0%B8%A7_oxu0ds.jpg",
    dates: [
      new Date("2026-03-09"),
    ],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรมผู้บังคับบัญชายุวกาชาด (ผู้บริหาร) ประจำปีงบประมาณ พ.ศ. 2569",
    status: 'open',
    capacity: null,
    enrolledCount: 0,
    formType: 'redcross',
  },
  {
    title: "ฝึกอบรม Restorative Justice กระบวนการยุติธรรมเชิงฟื้นฟูเยียวยา",
    image: "https://res.cloudinary.com/dgtlvqpb3/image/upload/v1774165047/%E0%B8%AD%E0%B8%B7%E0%B9%88%E0%B8%99%E0%B9%86_yauwzb.jpg",
    dates: [],
    location: "สถาบันพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    fullDescription: "ฝึกอบรม Restorative Justice กระบวนการยุติธรรมเชิงฟื้นฟูเยียวยา ประจำปีงบประมาณ พ.ศ. 2569 *อาจมีการเปลี่ยนแปลง*",
    status: 'closed',
    capacity: null,
    enrolledCount: 0,
    formType: null,
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