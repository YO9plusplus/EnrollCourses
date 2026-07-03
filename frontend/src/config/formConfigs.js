import { RedCrossPreviousTrainingFields, ScoutPreviousTrainingFields } from "../components/FormFields";

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
};

export const extraFieldComponents = {
  scout: ScoutPreviousTrainingFields,
  redcross: RedCrossPreviousTrainingFields,
};