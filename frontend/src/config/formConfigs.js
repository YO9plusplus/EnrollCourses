import { RedCrossPreviousTrainingFields, ScoutPreviousTrainingFields } from "../components/FormFields";

export const formConfigs = {
  scout: {
    courseOptions: [
      {
        value: 'สำรอง',
        label: 'ผู้กำกับลูกเสือสำรอง ขั้นความรู้ชั้นสูง (A.T.C.) วันที่ 13-19 กุมภาพันธ์ 2569',
      },
      {
        value: 'สามัญ',
        label: 'ผู้กำกับลูกเสือสามัญ ขั้นความรู้ชั้นสูง (A.T.C.) วันที่ 18-24 เมษายน 2569',
      },
      {
        value: 'สามัญรุ่นใหญ่',
        label: 'ผู้กำกับลูกเสือสามัญรุ่นใหญ่ ขั้นความรู้ชั้นสูง (A.T.C.) วันที่ 3-9 พฤษภาคม 2569',
      },
    ],
    extraFields: [
      'hasBasicTraining',
      'trainingType',
      'trainingLocation',
      'trainingDate',
    ],
    requiredFiles: [
      'supervisorConsent',
      'medicalCertificate',
    ],
    optionalFiles: [
      'trainingEvidence',
    ],
  },

  redcross: {
    courseOptions: [
      {
        value: 'ผู้บริหารงาน',
        label: 'หลักสูตรผู้บริหารงานยุวกาชาด วันที่ 9-13 มีนาคม 2569',
        duration: '5 วัน 4 คืน',
        requirement: 'ผ่านการฝึกอบรมหลักสูตรผู้นำยุวกาชาดมาแล้ว (ยกเว้นผู้บริหารสถานศึกษา)'
      },
      {
        value: 'ผู้นำ',
        label: 'หลักสูตรผู้นำยุวกาชาด วันที่ 26 เมษายน - 1 พฤษภาคม 2569',
        duration: '6 วัน 5 คืน',
        requirement: 'ผ่านการฝึกอบรมหลักสูตรครูผู้สอนกิจกรรมยุวกาชาด'
      },
      {
        value: 'ผู้ให้การอบรม',
        label: 'หลักสูตรผู้ให้การอบรมเจ้าหน้าที่และผู้บังคับบัญชายุวกาชาด วันที่ 1-7 สิงหาคม 2569',
        duration: '7 วัน 6 คืน',
        requirement: 'ผ่านการฝึกอบรมหลักสูตรผู้นำยุวกาชาด หรือหลักสูตรผู้บริหารงานยุวกาชาด'
      },
    ],
    extraFields: [
      'hasPreviousTraining',
      'previousTrainingCourse',
      'previousTrainingNumber',
      'previousTrainingLocation',
      'previousTrainingDate',
    ],
    requiredFiles: [],
    optionalFiles: [],
  },
};

export const extraFieldComponents = {
  scout: ScoutPreviousTrainingFields,
  redcross: RedCrossPreviousTrainingFields,
};