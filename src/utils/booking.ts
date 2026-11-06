import { ACADEMY_INFO } from '../data/academyData';

export interface AdmissionFormData {
  studentName: string;
  parentName: string;
  courseLevel: string;
  subject: string;
  contactNumber: string;
  preferredDate: string;
  additionalMessage: string;
}

export type AdmissionFormErrors = Partial<Record<keyof AdmissionFormData, string>>;

export interface ValidationResult {
  isValid: boolean;
  errors: AdmissionFormErrors;
  sanitized: AdmissionFormData;
}

/**
 * Validates required fields and phone format without substituting fallback values.
 */
export function validateAdmissionForm(data: AdmissionFormData): ValidationResult {
  const sanitized: AdmissionFormData = {
    studentName: data.studentName.trim(),
    parentName: data.parentName.trim(),
    courseLevel: data.courseLevel.trim(),
    subject: data.subject.trim(),
    contactNumber: data.contactNumber.trim(),
    preferredDate: data.preferredDate.trim(),
    additionalMessage: data.additionalMessage.trim(),
  };

  const errors: AdmissionFormErrors = {};

  if (sanitized.studentName.length < 2) {
    errors.studentName = 'Please enter the student’s full name (at least 2 characters).';
  }

  if (sanitized.parentName.length < 2) {
    errors.parentName = 'Please enter the parent or guardian’s name (at least 2 characters).';
  }

  if (!sanitized.courseLevel) {
    errors.courseLevel = 'Please select the student’s class or programme.';
  }

  if (sanitized.subject.length < 2) {
    errors.subject = 'Please specify the subject or area of study.';
  }

  const digitsOnly = sanitized.contactNumber.replace(/\D/g, '');
  if (digitsOnly.length < 10 || digitsOnly.length > 13) {
    errors.contactNumber = 'Please enter a valid 10-digit mobile number (with or without +91).';
  }

  if (!sanitized.preferredDate) {
    errors.preferredDate = 'Please select a preferred date for the demo class.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  };
}

/**
 * Formats the exact WhatsApp message template requested for ProBio Academy demo bookings.
 */
export function formatDemoBookingMessage(data: AdmissionFormData): string {
  const clean = {
    studentName: data.studentName.trim(),
    parentName: data.parentName.trim(),
    courseLevel: data.courseLevel.trim(),
    subject: data.subject.trim(),
    contactNumber: data.contactNumber.trim(),
    preferredDate: data.preferredDate.trim(),
    additionalMessage: data.additionalMessage.trim() || 'None',
  };

  return [
    'Hello Sir!',
    '',
    'I am interested in booking a demo class for my child at ProBio Academy.',
    '',
    `Student Name: ${clean.studentName}`,
    '',
    `Parent Name: ${clean.parentName}`,
    '',
    `Class/Course: ${clean.courseLevel}`,
    '',
    `Subject: ${clean.subject}`,
    '',
    `Contact Number: ${clean.contactNumber}`,
    '',
    `Preferred Date: ${clean.preferredDate}`,
    '',
    `Additional Message: ${clean.additionalMessage}`,
    '',
    'Please let me know the available timings.',
    '',
    'Thank you!',
  ].join('\n');
}

/**
 * Builds the URL-encoded WhatsApp deep link targeting +91 89818 00375.
 */
export function buildDemoBookingWhatsAppUrl(data: AdmissionFormData): string {
  const message = formatDemoBookingMessage(data);
  return `${ACADEMY_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds the URL-encoded WhatsApp deep link for general academy enquiries.
 */
export function buildGeneralWhatsAppUrl(
  customText = 'Hello Sir! I would like to know more about ProBio Academy and its courses.'
): string {
  return `${ACADEMY_INFO.whatsappBaseUrl}?text=${encodeURIComponent(customText)}`;
}

/**
 * Returns today's date in YYYY-MM-DD local format for date input min attribute.
 */
export function getLocalTodayIsoDate(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
