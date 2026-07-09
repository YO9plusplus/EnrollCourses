const STATIC_FIELDS = [
    { key: 'title', label: 'คำนำหน้า', group: 'ข้อมูลส่วนตัว', get: (reg) => reg.user?.title },
    { key: 'firstName', label: 'ชื่อ', group: 'ข้อมูลส่วนตัว', get: (reg) => reg.user?.firstName },
    { key: 'lastName', label: 'นามสกุล', group: 'ข้อมูลส่วนตัว', get: (reg) => reg.user?.lastName },
    { key: 'email', label: 'อีเมล', group: 'ข้อมูลส่วนตัว', get: (reg) => reg.user?.email },
    { key: 'mobilePhone', label: 'เบอร์โทร', group: 'ข้อมูลส่วนตัว', get: (reg) => reg.user?.mobilePhone },
    { key: 'lineId', label: 'LINE ID', group: 'ข้อมูลส่วนตัว', get: (reg) => reg.user?.lineId },
    { key: 'birthDate', label: 'วันเกิด', group: 'ข้อมูลส่วนตัว', get: (reg) => reg.user?.birthDate ? new Date(reg.user.birthDate).toLocaleDateString('th-TH') : '' },
    { key: 'religion', label: 'ศาสนา', group: 'ข้อมูลส่วนตัว', get: (reg) => reg.user?.religion },
    { key: 'education', label: 'วุฒิการศึกษา', group: 'ข้อมูลส่วนตัว', get: (reg) => reg.user?.education },
    { key: 'major', label: 'วิชาเอก', group: 'ข้อมูลส่วนตัว', get: (reg) => reg.user?.major },

    { key: 'school', label: 'โรงเรียน', group: 'ข้อมูลการทำงาน', get: (reg) => reg.user?.school },
    { key: 'district', label: 'เขต', group: 'ข้อมูลการทำงาน', get: (reg) => reg.user?.district },
    { key: 'position', label: 'ตำแหน่ง', group: 'ข้อมูลการทำงาน', get: (reg) => reg.user?.position },
    { key: 'academicLevel', label: 'วิทยฐานะ', group: 'ข้อมูลการทำงาน', get: (reg) => reg.user?.academicLevel },

    { key: 'healthCondition', label: 'โรคประจำตัว', group: 'สุขภาพ', get: (reg) => reg.user?.healthCondition },
    { key: 'foodRestrictions', label: 'อาหารที่แพ้/ไม่ทาน', group: 'สุขภาพ', get: (reg) => reg.user?.foodRestrictions },

    { key: 'date', label: 'วันที่สมัคร', group: 'หลักสูตร', get: (reg) => new Date(reg.createdAt).toLocaleDateString('th-TH') },
    { key: 'courseType', label: 'หลักสูตรที่สมัคร', group: 'หลักสูตร', get: (reg) => reg.courseType },
    { key: 'status', label: 'สถานะ', group: 'หลักสูตร', get: (reg) => reg.status },

    { key: 'hasBasicTraining', label: 'เคยผ่านการฝึกอบรม B.T.C.', group: 'ลูกเสือ', formType: 'scout', get: (reg) => reg.hasBasicTraining ? 'เคย' : 'ไม่เคย' },
    { key: 'trainingType', label: 'ประเภท', group: 'ลูกเสือ', formType: 'scout', get: (reg) => reg.trainingType },
    { key: 'trainingLocation', label: 'สถานที่ฝึกอบรม', group: 'ลูกเสือ', formType: 'scout', get: (reg) => reg.trainingLocation },
    { key: 'trainingDate', label: 'ระหว่างวันที่', group: 'ลูกเสือ', formType: 'scout', get: (reg) => reg.trainingDate },

    { key: 'hasPreviousTraining', label: 'เคยผ่านการฝึกอบรมมาก่อน', group: 'ยุวกาชาด', formType: 'redcross', get: (reg) => reg.hasPreviousTraining ? 'เคย' : 'ไม่เคย' },
    { key: 'previousTrainingCourse', label: 'หลักสูตรที่ผ่านมา', group: 'ยุวกาชาด', formType: 'redcross', get: (reg) => reg.previousTrainingCourse },
    { key: 'previousTrainingNumber', label: 'เลขที่รุ่น', group: 'ยุวกาชาด', formType: 'redcross', get: (reg) => reg.previousTrainingNumber },
    { key: 'previousTrainingLocation', label: 'สถานที่ฝึกอบรม', group: 'ยุวกาชาด', formType: 'redcross', get: (reg) => reg.previousTrainingLocation },
    { key: 'previousTrainingDate', label: 'ระหว่างวันที่', group: 'ยุวกาชาด', formType: 'redcross', get: (reg) => reg.previousTrainingDate },

    { key: 'yearsOfService', label: 'อายุราชการ', group: 'เลื่อนวิทยฐานะ', formType: 'academicPromotion', get: (reg) => reg.yearsOfService },
    { key: 'department', label: 'สังกัด', group: 'เลื่อนวิทยฐานะ', formType: 'academicPromotion', get: (reg) => reg.department },
    { key: 'positionAppointedDate', label: 'วันที่แต่งตั้งตำแหน่งปัจจุบัน', group: 'เลื่อนวิทยฐานะ', formType: 'academicPromotion', get: (reg) => reg.positionAppointedDate },
    { key: 'academicLevelAppointedDate', label: 'วันที่แต่งตั้งวิทยฐานะปัจจุบัน', group: 'เลื่อนวิทยฐานะ', formType: 'academicPromotion', get: (reg) => reg.academicLevelAppointedDate },
    { key: 'currentPositionSchoolDate', label: 'วันที่รับราชการในตำแหน่ง/สถานศึกษาปัจจุบัน', group: 'เลื่อนวิทยฐานะ', formType: 'academicPromotion', get: (reg) => reg.currentPositionSchoolDate },
    { key: 'careerTrack', label: 'สายงานที่ขอเข้ารับการพัฒนา', group: 'เลื่อนวิทยฐานะ', formType: 'academicPromotion', get: (reg) => reg.careerTrack },
    { key: 'developmentCase', label: 'กรณีที่ขอเข้ารับการพัฒนา', group: 'เลื่อนวิทยฐานะ', formType: 'academicPromotion', get: (reg) => reg.developmentCase },
    { key: 'developmentCaseCertDate', label: 'วันที่ได้วุฒิบัตร', group: 'เลื่อนวิทยฐานะ', formType: 'academicPromotion', get: (reg) => reg.developmentCaseCertDate },
    { key: 'developmentCaseCertCount', label: 'จำนวนครั้ง (วุฒิบัตร)', group: 'เลื่อนวิทยฐานะ', formType: 'academicPromotion', get: (reg) => reg.developmentCaseCertCount },
    { key: 'previousTrainingCount', label: 'เคยเข้ารับการฝึกอบรมโครงการฯ (ครั้ง)', group: 'เลื่อนวิทยฐานะ', formType: 'academicPromotion', get: (reg) => reg.previousTrainingCount },
    { key: 'academicWorkCount', label: 'เคยส่งผลงานทางวิชาการ (ครั้ง)', group: 'เลื่อนวิทยฐานะ', formType: 'academicPromotion', get: (reg) => reg.academicWorkCount },
    { key: 'expectedAcademicWorkArea', label: 'คาดว่าจะส่งผลงานด้านที่ 3', group: 'เลื่อนวิทยฐานะ', formType: 'academicPromotion', get: (reg) => reg.expectedAcademicWorkArea },
    { key: 'assessmentRound', label: 'รอบที่ยื่นขอประเมิน (วก.1)', group: 'เลื่อนวิทยฐานะ', formType: 'academicPromotion', get: (reg) => reg.assessmentRound },
];

module.exports = { STATIC_FIELDS };