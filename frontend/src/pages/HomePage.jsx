import Navbar from '../components/Navbar'
import CourseCard from '../components/CourseCard'
import logo_scout from '../assets/logoลูกเสือ.jpg'
import logo_yuwa from '../assets/logoยุว.jpg'

const HomePage = () => {
  const courses = [
    // {
    //   id: 1,
    //   title: "ปฐมนิเทศข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานคร",
    //   description: "เรียนรู้พื้นฐานการเขียนโปรแกรมด้วย Python",
    //   image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    // },
    // {
    //   id: 2,
    //   title: "ฝึกอบรมหลักสูตรรการพัฒนา ขรก.ครูฯ ก่อนแต่งตั้งให้มีหรือเลื่อนเป็นวิทยฐานะชำนาญการพิเศษและวิทยฐานะเชี่ยวชาญ",
    //   description: "สร้างเว็บไซต์ด้วย HTML, CSS และ JavaScript",
    //   image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    // },
    // {
    //   id: 3,
    //   title: "ฝึกอบรมหลักสูตรการพัฒนาครูตามสมรรถนะประจำสายงาน",
    //   description: "วิเคราะห์ข้อมูลด้วย Python และ Machine Learning",
    //   image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    // },
    // {
    //   id: 4,
    //   title: "โครงการพัฒนาคุณภาพการเรียนการสอนภาษาอังกฤษ",
    //   description: "การตลาดออนไลน์และ Social Media",
    //   image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    // },
    // {
    //   id: 5,
    //   title: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานครก่อนแต่งตั้งให้ดำรงตำแหน่งรองผู้อำนวยการสถานศึกษา",
    //   description: "ออกแบบกราฟิกด้วย Adobe Photoshop และ Illustrator",
    //   image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    // },
    // {
    //   id: 6,
    //   title: "ฝึกอบรมหลักสูตรการพัฒนาศึกษานิเทศก์ตามสมรรถนะประจำสายงาน",
    //   description: "สร้างแอพมือถือด้วย React Native",
    //   image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    // },
    // {
    //   id: 7,
    //   title: "ฝึกอบรมหลักสูตรการพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานครตำแหน่งผู้อำนวยการสถานศึกษา สังกัดกรุงเทพมหานคร",
    //   description: "จัดการฐานข้อมูลด้วย MySQL และ MongoDB",
    //   image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    // },
    // {
    //   id: 8,
    //   title: "ฝึกอบรมหลักสูตรนักบริหารการศึกษามหานครระดับสงู(นศส.) รุ่นที่ 10",
    //   description: "ออกแบบประสบการณ์ผู้ใช้และส่วนติดต่อ",
    //   image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    // },
    // {
    //   id: 9,
    //   title: "ฝึกอบรมหลักสูตการพัฒนาข้าราชการครูและบุคลากรทางการศึกษากรุงเทพมหานครตำแหน่งรองผู้อำนวยการสถานศึกษา สังกัดกรุงเทพมหานคร",
    //   description: "เรียนรู้ AWS และ Cloud Services",
    //   image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    // },
    {
      id: 10,
      title: "ฝึกอบรมบุคลากรทางการลูกเสือ",
      description: "หลักสูตรการฝึกอบรมผู้กำกับลูกเสือขั้นสูง (A.T.C.)",
      image: logo_scout,
    },
    {
      id: 11,
      title: "ฝึกอบรมผู้บังคับบัญชายุวกาชาด",
      description: "หลักสูตรการฝึกอบรมผู้บังคับบัญชายุวกาชาด พัฒนาทักษะการจัดกิจกรรมและการดูแลเยาวชน",
      image: logo_yuwa,
    },
    // {
    //   id: 12,
    //   title: "พิธีปฏิญาณตนและสวนสนามยุวกาชาดกรุงเทพมหานคร",
    //   description: "เทคโนโลยี Blockchain และ Cryptocurrency",
    //   image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    // },
    // {
    //   id: 13,
    //   title: "พิธีทบทวนคำปฏิญาณและสวนสนามลูกเสือกรุงเทพมหานคร",
    //   description: "ตัดต่อวิดีโอด้วย Premiere Pro",
    //   image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    // },
    // {
    //   id: 14,
    //   title: "ฝึกอบรม Restorative Justice กระบวนการยุติธรรมเชิงฟื้นฟูเยียวยา *อาจมีการเปลี่ยนแปลง*",
    //   description: "วิเคราะห์ธุรกิจด้วย Excel และ Power BI",
    //   image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    // }
  ];

  return (
    // CHANGED: bg-white → bg-[#2d6e5e] (green background)
    <div className="min-h-screen bg-[#2d6e5e] w-full">
      {/* Navbar */}
      <Navbar />

      {/* Content area */}
      <div className="w-full">
        {/* Course Section */}
        <div className="py-12 px-8">
          {/* Section Title */}
          {/* CHANGED: text-green-800 → text-white (white text on green background) */}
          <h2 className="text-4xl font-bold text-white text-center mb-10">
            หลักสูตรอบรม
          </h2>

          {/* Course Grid - 4 columns on desktop */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                image={course.image}
                id={course.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage