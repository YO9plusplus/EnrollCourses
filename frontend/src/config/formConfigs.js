// src/config/formConfigs.js

export const formConfigs = {
  10: { // Scout course ID
    type: 'scout',
    fields: {
      // Personal Info
      courseType: { required: true, type: 'radio' },
      title: { required: true, type: 'select' },
      firstName: { required: true, type: 'text' },
      lastName: { required: true, type: 'text' },
      religion: { required: true, type: 'text' },
      birthDate: { required: true, type: 'date' },
      age: { required: true, type: 'number' },
      idCard: { required: true, type: 'text', pattern: '[0-9]{13}' },
      
      // Work Info
      position: { required: true, type: 'text' },
      academicLevel: { required: false, type: 'text' },
      school: { required: true, type: 'text' },
      district: { required: true, type: 'text' },
      officePhone: { required: false, type: 'tel' },
      
      // Contact
      mobilePhone: { required: true, type: 'tel' },
      lineId: { required: true, type: 'text' },
      
      // Training History
      hasBasicTraining: { required: false, type: 'checkbox' },
      trainingType: { required: false, type: 'radio' },
      trainingLocation: { required: false, type: 'text' },
      trainingDate: { required: false, type: 'text' },
      
      // Health
      healthCondition: { required: false, type: 'textarea' },
      foodRestrictions: { required: false, type: 'textarea' },
      
      // Agreement
      agreeToRules: { required: true, type: 'checkbox' }
    },
    courseOptions: [
      { 
        value: 'สำรอง', 
        label: 'ผู้กำกับลูกเสือสำรอง ขั้นความรู้ชั้นสูง (A.T.C.) วันที่ 13-19 กุมภาพันธ์ 2569',
        date: '13-19 กุมภาพันธ์ 2569'
      },
      { 
        value: 'สามัญ', 
        label: 'ผู้กำกับลูกเสือสามัญ ขั้นความรู้ชั้นสูง (A.T.C.) วันที่ 18-24 เมษายน 2569',
        date: '18-24 เมษายน 2569'
      },
      { 
        value: 'สามัญรุ่นใหญ่', 
        label: 'ผู้กำกับลูกเสือสามัญรุ่นใหญ่ ขั้นความรู้ชั้นสูง (A.T.C.) วันที่ 3-9 พฤษภาคม 2569',
        date: '3-9 พฤษภาคม 2569'
      }
    ]
  },
  
  11: { // Red Cross course ID
    type: 'redcross',
    fields: {
      // Personal Info
      title: { required: true, type: 'select' },
      firstName: { required: true, type: 'text' },
      lastName: { required: true, type: 'text' },
      birthDate: { required: true, type: 'date' },
      religion: { required: true, type: 'text' },
      idCard: { required: true, type: 'text', pattern: '[0-9]{13}' },
      
      // Contact
      mobilePhone: { required: true, type: 'tel' },
      lineId: { required: true, type: 'text' },
      
      // Education
      education: { required: true, type: 'text' },
      major: { required: true, type: 'text' },
      
      // Work Info
      position: { required: true, type: 'text' },
      academicLevel: { required: false, type: 'text' },
      school: { required: true, type: 'text' },
      district: { required: true, type: 'text' },
      schoolPhone: { required: false, type: 'tel' },
      
      // Course Selection
      courseType: { required: true, type: 'radio' },
      
      // Previous Training
      hasPreviousTraining: { required: false, type: 'checkbox' },
      previousTrainingCourse: { required: false, type: 'text' },
      previousTrainingNumber: { required: false, type: 'text' },
      previousTrainingLocation: { required: false, type: 'text' },
      previousTrainingDate: { required: false, type: 'text' },
      
      // Health
      foodRestrictions: { required: false, type: 'textarea' },
      
      // Agreement
      agreeToRules: { required: true, type: 'checkbox' }
    },
    courseOptions: [
      { 
        value: 'ผู้บริหารงาน', 
        label: 'หลักสูตรผู้บริหารงานยุวกาชาด',
        date: '9-13 มีนาคม 2569',
        // location: 'ค่ายลูกเสือกรุงธน เขตทุ่งครุ',
        duration: '5 วัน 4 คืน',
        requirement: 'ผ่านการฝึกอบรมหลักสูตรผู้นำยุวกาชาดมาแล้ว (ยกเว้นผู้บริหารสถานศึกษา)'
      },
      { 
        value: 'ผู้นำ', 
        label: 'หลักสูตรผู้นำยุวกาชาด',
        date: '26 เมษายน - 1 พฤษภาคม 2569',
        // location: 'ค่ายลูกเสือกรุงธน เขตทุ่งครุ',
        duration: '6 วัน 5 คืน',
        requirement: 'ผ่านการฝึกอบรมหลักสูตรครูผู้สอนกิจกรรมยุวกาชาด'
      },
      { 
        value: 'ผู้ให้การอบรม', 
        label: 'หลักสูตรผู้ให้การอบรมเจ้าหน้าที่และผู้บังคับบัญชายุวกาชาด',
        date: '1-7 สิงหาคม 2569',
        // location: 'ค่ายลูกเสือกรุงธน เขตทุ่งครุ',
        duration: '7 วัน 6 คืน',
        requirement: 'ผ่านการฝึกอบรมหลักสูตรผู้นำยุวกาชาด หรือหลักสูตรผู้บริหารงานยุวกาชาด'
      }
    ]
  }
};