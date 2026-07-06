import { AcademicPromotionFields, RedCrossPreviousTrainingFields, ScoutPreviousTrainingFields } from "../components/FormFields";

export const formConfigs = {
  scout: {
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
    extraFields: [
      'hasPreviousTraining',
      'previousTrainingCourse',
      'previousTrainingNumber',
      'previousTrainingLocation',
      'previousTrainingDate',
    ],
    requiredFiles: [],
    optionalFiles: ['trainingEvidence'],
  },

  academicPromotion: {
    extraFields: [
      'yearsOfService',
      'department',
      'positionAppointedDate',
      'academicLevelAppointedDate',
      'currentPositionSchoolDate',
      'careerTrack',
      'developmentCase',
      'developmentCaseCertDate',
      'developmentCaseCertCount',
      'previousTrainingCount',
      'academicWorkCount',
      'expectedAcademicWorkArea',
    ],
    requiredFiles: [],
    optionalFiles: [],
  },
};

export const extraFieldComponents = {
  scout: ScoutPreviousTrainingFields,
  redcross: RedCrossPreviousTrainingFields,
  academicPromotion: AcademicPromotionFields,
};