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
