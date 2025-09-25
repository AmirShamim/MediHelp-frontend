// Mock data used for development/demo so UI doesn't look empty.
// Replace or remove when backend integration is complete.

export const samplePrescriptionSummary = {
  drugName: 'Amoxicillin 500mg',
  dosage: '500 mg',
  frequency: 'Three times daily (every 8 hours)',
  duration: '5 days',
  instructions: 'Take after food with a full glass of water. Do not skip doses even if you feel better. Complete the full course.',
  warnings: 'May cause mild stomach upset. Contact a doctor if you develop rash, persistent diarrhea, or breathing difficulty.'
};

export const sampleHealthReportSummary = {
  summary: 'General blood panel indicates mild vitamin D deficiency and slightly elevated LDL cholesterol. Other parameters are within normal range.',
  abnormalities: '- Vitamin D: 18 ng/mL (Low\n- LDL Cholesterol: 142 mg/dL (Borderline High)',
  recommendations: 'Increase safe sun exposure (15–20 mins/day), start Vitamin D3 supplements (1000–2000 IU daily after consulting doctor). Reduce saturated fats, increase fiber, recheck lipid profile in 3 months.'
};

export const sampleRecentItems = [
  {
    id: 'demo-1',
    fileName: 'rx_photo_01.jpg',
    docType: 'prescription',
    language: 'en',
    summary: samplePrescriptionSummary,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  },
  {
    id: 'demo-2',
    fileName: 'lab_report.pdf',
    docType: 'healthReport',
    language: 'en',
    summary: sampleHealthReportSummary,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
  }
];

export const getDemoSummaryByType = (type) => {
  return type === 'healthReport' ? sampleHealthReportSummary : samplePrescriptionSummary;
};

// New random generators
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generateRandomPrescriptionSummary = () => {
  const drugNames = ['Paracetamol 650mg', 'Ibuprofen 400mg', 'Metformin 500mg', 'Atorvastatin 20mg', 'Omeprazole 20mg'];
  const frequencies = ['Once daily', 'Twice daily', 'Three times daily', 'Every 6 hours', 'At bedtime'];
  const durations = ['3 days', '5 days', '7 days', '10 days', '2 weeks'];
  const instructions = [
    'Take with a glass of water after meals.',
    'Do not take on an empty stomach.',
    'Avoid alcohol while on this medication.',
    'Take at the same time each day for best results.',
    'Swallow whole, do not crush or chew.'
  ];
  const warnings = [
    'Stop use if rash or swelling develops.',
    'May cause mild dizziness.',
    'Monitor blood sugar if diabetic.',
    'Contact doctor if pain persists beyond 5 days.',
    null
  ];
  return {
    drugName: rand(drugNames),
    dosage: rand(['1 tablet', '2 tablets', '5 mL', '10 mL', '1 capsule']),
    frequency: rand(frequencies),
    duration: rand(durations),
    instructions: rand(instructions),
    warnings: rand(warnings) || undefined
  };
};

export const generateRandomHealthReportSummary = () => {
  const issues = [
    { abn: 'Mild anemia (Hemoglobin slightly low)', rec: 'Increase iron-rich foods, consider supplementation.' },
    { abn: 'Elevated fasting glucose (Prediabetic range)', rec: 'Reduce refined carbs, add daily 30 min brisk walk.' },
    { abn: 'Low Vitamin B12', rec: 'Add B12 supplementation or fortified foods, recheck in 2 months.' },
    { abn: 'Borderline thyroid function (TSH mildly elevated)', rec: 'Monitor in 6–8 weeks; watch for fatigue or weight changes.' },
    { abn: 'Slightly elevated liver enzymes', rec: 'Avoid alcohol, reduce fatty foods, re-evaluate in 3 months.' }
  ];
  const pick = rand(issues);
  return {
    summary: `Routine panel shows ${pick.abn.toLowerCase()} with other values within acceptable limits.`,
    abnormalities: `- ${pick.abn}`,
    recommendations: pick.rec
  };
};
