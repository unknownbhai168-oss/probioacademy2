import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateAdmissionForm,
  formatDemoBookingMessage,
  buildDemoBookingWhatsAppUrl,
  buildGeneralWhatsAppUrl,
  getLocalTodayIsoDate,
  type AdmissionFormData,
} from './booking';
import { ACADEMY_INFO, COURSES, QUALIFICATIONS, FAQ_ITEMS } from '../data/academyData';

test('validateAdmissionForm rejects empty required fields without fallback values', () => {
  const emptyForm: AdmissionFormData = {
    studentName: '   ',
    parentName: '',
    courseLevel: '',
    subject: ' ',
    contactNumber: '123',
    preferredDate: '',
    additionalMessage: '',
  };

  const result = validateAdmissionForm(emptyForm);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.studentName);
  assert.ok(result.errors.parentName);
  assert.ok(result.errors.courseLevel);
  assert.ok(result.errors.subject);
  assert.ok(result.errors.contactNumber);
  assert.ok(result.errors.preferredDate);
  assert.equal(result.errors.additionalMessage, undefined);
});

test('validateAdmissionForm accepts valid inputs and trims whitespace', () => {
  const validForm: AdmissionFormData = {
    studentName: '  Aarav Sen  ',
    parentName: '  Subhashis Sen ',
    courseLevel: 'Class 11',
    subject: '  Physics & Mathematics ',
    contactNumber: '+91 98300 11223',
    preferredDate: '2026-11-15',
    additionalMessage: '  Looking for evening batch timings. ',
  };

  const result = validateAdmissionForm(validForm);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
  assert.equal(result.sanitized.studentName, 'Aarav Sen');
  assert.equal(result.sanitized.parentName, 'Subhashis Sen');
  assert.equal(result.sanitized.subject, 'Physics & Mathematics');
  assert.equal(result.sanitized.additionalMessage, 'Looking for evening batch timings.');
});

test('formatDemoBookingMessage produces exact requested WhatsApp template', () => {
  const input: AdmissionFormData = {
    studentName: 'Riya Chatterjee',
    parentName: 'Ananya Chatterjee',
    courseLevel: 'Class 10',
    subject: 'Mathematics',
    contactNumber: '9876543210',
    preferredDate: '2026-11-20',
    additionalMessage: 'Prefer weekend demo if possible.',
  };

  const expected = `Hello Sir!

I am interested in booking a demo class for my child at ProBio Academy.

Student Name: Riya Chatterjee

Parent Name: Ananya Chatterjee

Class/Course: Class 10

Subject: Mathematics

Contact Number: 9876543210

Preferred Date: 2026-11-20

Additional Message: Prefer weekend demo if possible.

Please let me know the available timings.

Thank you!`;

  assert.equal(formatDemoBookingMessage(input), expected);
});

test('buildDemoBookingWhatsAppUrl encodes message to official ProBio Academy WhatsApp number', () => {
  const input: AdmissionFormData = {
    studentName: 'Riya Chatterjee',
    parentName: 'Ananya Chatterjee',
    courseLevel: 'Class 10',
    subject: 'Mathematics',
    contactNumber: '9876543210',
    preferredDate: '2026-11-20',
    additionalMessage: '',
  };

  const url = buildDemoBookingWhatsAppUrl(input);
  assert.ok(url.startsWith('https://wa.me/918981800375?text='));
  const decoded = decodeURIComponent(url.replace('https://wa.me/918981800375?text=', ''));
  assert.ok(decoded.includes('Student Name: Riya Chatterjee'));
  assert.ok(decoded.includes('Parent Name: Ananya Chatterjee'));
  assert.ok(decoded.includes('Class/Course: Class 10'));
  assert.ok(decoded.includes('Additional Message: None'));
});

test('buildGeneralWhatsAppUrl encodes exact default enquiry prompt', () => {
  const url = buildGeneralWhatsAppUrl();
  assert.equal(
    url,
    'https://wa.me/918981800375?text=Hello%20Sir!%20I%20would%20like%20to%20know%20more%20about%20ProBio%20Academy%20and%20its%20courses.'
  );
});

test('getLocalTodayIsoDate formats YYYY-MM-DD deterministically', () => {
  const sampleDate = new Date(2026, 10, 5); // Nov 5, 2026
  assert.equal(getLocalTodayIsoDate(sampleDate), '2026-11-05');
});

test('verified academy data integrity checks', () => {
  assert.equal(ACADEMY_INFO.name, 'PROBIO ACADEMY');
  assert.equal(ACADEMY_INFO.teacherName, 'Shubhajit Sir');
  assert.equal(ACADEMY_INFO.phoneDisplay, '+91 89818 00375');
  assert.equal(ACADEMY_INFO.whatsappNumber, '918981800375');
  assert.equal(COURSES.length, 6);
  assert.equal(QUALIFICATIONS.length, 3);
  assert.deepEqual(
    QUALIFICATIONS.map((q) => q.title),
    ['Bachelor of Pharmacy (B.Pharm.)', 'Bachelor of Laws (LL.B.)', 'English Honours']
  );
  assert.equal(FAQ_ITEMS.length, 8);
});
