export const MEDICAL_CRITERIA = {
  conditions: [
    // Cardiovascular
    { label: 'Hypertension', value: 'htn', category: 'Cardiovascular' },
    { label: 'Coronary Artery Disease', value: 'cad', category: 'Cardiovascular' },
    { label: 'Heart Failure', value: 'chf', category: 'Cardiovascular' },
    { label: 'Atrial Fibrillation', value: 'afib', category: 'Cardiovascular' },
    { label: 'Myocardial Infarction', value: 'mi', category: 'Cardiovascular' },
    { label: 'Peripheral Arterial Disease', value: 'pad', category: 'Cardiovascular' },
    { label: 'Stroke', value: 'stroke', category: 'Cardiovascular' },
    { label: 'Deep Vein Thrombosis', value: 'dvt', category: 'Cardiovascular' },
    { label: 'Pulmonary Embolism', value: 'pe', category: 'Cardiovascular' },
    { label: 'Aortic Aneurysm', value: 'aortic_aneurysm', category: 'Cardiovascular' },

    // Respiratory
    { label: 'COPD', value: 'copd', category: 'Respiratory' },
    { label: 'Asthma', value: 'asthma', category: 'Respiratory' },
    { label: 'Pulmonary Fibrosis', value: 'pulm_fibrosis', category: 'Respiratory' },
    { label: 'Sleep Apnea', value: 'sleep_apnea', category: 'Respiratory' },
    { label: 'Pneumonia', value: 'pneumonia', category: 'Respiratory' },
    { label: 'Bronchiectasis', value: 'bronchiectasis', category: 'Respiratory' },
    { label: 'Pleural Effusion', value: 'pleural_effusion', category: 'Respiratory' },
    { label: 'Pulmonary Hypertension', value: 'pulm_htn', category: 'Respiratory' },
    { label: 'Tuberculosis', value: 'tb', category: 'Respiratory' },
    { label: 'Lung Cancer', value: 'lung_cancer', category: 'Respiratory' },
  ],
  demographics: [
    { label: 'Age', value: 'age', category: 'Basic', units: ['years', 'months'] },
    { label: 'Sex', value: 'sex', category: 'Basic', options: ['Male', 'Female', 'Other'] },
    { label: 'Gender Identity', value: 'gender', category: 'Basic', options: ['Male', 'Female', 'Non-binary', 'Other'] },
    { label: 'Race', value: 'race', category: 'Basic', options: ['White', 'Black', 'Asian', 'Native American', 'Pacific Islander', 'Other'] },
    { label: 'Ethnicity', value: 'ethnicity', category: 'Basic', options: ['Hispanic', 'Non-Hispanic'] },
    { label: 'Primary Language', value: 'language', category: 'Basic', options: ['English', 'Spanish', 'Other'] },
    { label: 'Marital Status', value: 'marital', category: 'Social', options: ['Single', 'Married', 'Divorced', 'Widowed'] },
    { label: 'Education Level', value: 'education', category: 'Social', options: ['Less than High School', 'High School', 'College', 'Graduate'] },
    { label: 'Employment Status', value: 'employment', category: 'Social', options: ['Employed', 'Unemployed', 'Retired', 'Student'] },
    { label: 'Insurance Type', value: 'insurance', category: 'Social', options: ['Private', 'Medicare', 'Medicaid', 'None'] },
  ],
  labs: [
    // Hematology
    { label: 'Hemoglobin', value: 'hgb', category: 'Hematology', units: ['g/dL', 'g/L'] },
    { label: 'Hematocrit', value: 'hct', category: 'Hematology', units: ['%'] },
    { label: 'White Blood Cells', value: 'wbc', category: 'Hematology', units: ['K/µL', '×10⁹/L'] },
    { label: 'Platelets', value: 'plt', category: 'Hematology', units: ['K/µL', '×10⁹/L'] },
  ],
  vitals: [
    // Basic Vitals
    { label: 'Heart Rate', value: 'hr', category: 'Basic', units: ['bpm'] },
    { label: 'Systolic Blood Pressure', value: 'sbp', category: 'Basic', units: ['mmHg'] },
    { label: 'Diastolic Blood Pressure', value: 'dbp', category: 'Basic', units: ['mmHg'] },
    { label: 'Respiratory Rate', value: 'rr', category: 'Basic', units: ['breaths/min'] },
    { label: 'Temperature', value: 'temp', category: 'Basic', units: ['°C', '°F'] },
    { label: 'Oxygen Saturation', value: 'o2sat', category: 'Basic', units: ['%'] },
  ],
  scores: [
    // Performance Status
    { label: 'ECOG Performance Status', value: 'ecog', category: 'Performance', units: ['0-5'] },
    { label: 'Karnofsky Performance Status', value: 'kps', category: 'Performance', units: ['0-100'] },
    { label: 'Glasgow Coma Scale', value: 'gcs', category: 'Severity', units: ['3-15'] },
    { label: 'MELD Score', value: 'meld', category: 'Severity', units: ['points'] },
    { label: 'NYHA Class', value: 'nyha', category: 'Severity', units: ['I-IV'] },
  ],
};

export const CATEGORIES = {
  conditions: 'Medical Conditions',
  demographics: 'Demographics',
  labs: 'Laboratory Tests',
  vitals: 'Vital Signs',
  scores: 'Clinical Scores',
} as const;

export const OPERATORS = [
  { label: 'Equal to', value: '=' },
  { label: 'Not equal to', value: '!=' },
  { label: 'Greater than', value: '>' },
  { label: 'Less than', value: '<' },
  { label: 'Greater than or equal to', value: '>=' },
  { label: 'Less than or equal to', value: '<=' },
  { label: 'Is', value: 'is' },
  { label: 'Is not', value: 'is_not' },
  { label: 'Present', value: 'present' },
  { label: 'Not present', value: 'not_present' },
] as const;