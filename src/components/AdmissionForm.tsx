import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, ExternalLink, MessageCircle, Send, Sparkles } from 'lucide-react';
import { ACADEMY_INFO, COURSES } from '../data/academyData';
import {
  buildDemoBookingWhatsAppUrl,
  formatDemoBookingMessage,
  getLocalTodayIsoDate,
  validateAdmissionForm,
  type AdmissionFormData,
  type AdmissionFormErrors,
} from '../utils/booking';

interface AdmissionFormProps {
  selectedCourseTitle?: string;
}

export const AdmissionForm: React.FC<AdmissionFormProps> = ({
  selectedCourseTitle = '',
}) => {
  const todayIso = getLocalTodayIsoDate();

  const [formData, setFormData] = useState<AdmissionFormData>({
    studentName: '',
    parentName: '',
    courseLevel: selectedCourseTitle,
    subject: '',
    contactNumber: '',
    preferredDate: '',
    additionalMessage: '',
  });

  const [errors, setErrors] = useState<AdmissionFormErrors>({});
  const [preparedSubmission, setPreparedSubmission] = useState<{
    whatsappUrl: string;
    messageText: string;
  } | null>(null);

  useEffect(() => {
    if (selectedCourseTitle) {
      setFormData((prev) => ({
        ...prev,
        courseLevel: selectedCourseTitle,
      }));
      setErrors((prev) => {
        if (!prev.courseLevel) return prev;
        const next = { ...prev };
        delete next.courseLevel;
        return next;
      });
    }
  }, [selectedCourseTitle]);

  const handleFieldChange = (
    field: keyof AdmissionFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateAdmissionForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setPreparedSubmission(null);
      return;
    }

    setErrors({});
    const messageText = formatDemoBookingMessage(validation.sanitized);
    const whatsappUrl = buildDemoBookingWhatsAppUrl(validation.sanitized);

    setPreparedSubmission({
      whatsappUrl,
      messageText,
    });

    // Open WhatsApp in a new tab with the pre-filled booking details
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const inputBaseClass =
    'mt-1.5 w-full rounded-xl border bg-[#FBF9FF] px-4 py-3 text-sm text-[#180F2E] placeholder:text-violet-400/60 transition-colors focus:bg-white focus:outline-none focus:ring-2';

  const getFieldClass = (field: keyof AdmissionFormData) =>
    errors[field]
      ? `${inputBaseClass} border-red-500 focus:border-red-500 focus:ring-red-500/20`
      : `${inputBaseClass} border-purple-500/20 focus:border-purple-600 focus:ring-purple-600/20`;

  return (
    <section
      id="admission"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28 text-[#180F2E]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left Column: Booking Guidance & WhatsApp Flow */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-800">
              <Sparkles className="h-3 w-3 text-purple-600" />
              <span>Admissions &amp; Demo Enquiry</span>
            </div>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#180F2E] text-balance leading-tight">
              Begin Your NEET Journey with a Free Demo Session.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#180F2E]/85">
              Connect with Shubhajit Sir to discuss your NEET score target, current syllabus
              standing, and join our focused Class 11, Class 12, or Dropper batches.
            </p>

            {/* How WhatsApp Demo Booking Works */}
            <div className="mt-8 rounded-3xl border border-purple-500/30 bg-[#0B071E] p-6 sm:p-7 text-white shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/20 text-[#25D366]">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Direct WhatsApp Demo Request
                  </h3>
                  <p className="text-xs text-amber-300">
                    Connects directly with {ACADEMY_INFO.teacherName}
                  </p>
                </div>
              </div>

              <ol className="mt-5 space-y-3 text-sm text-violet-200/90">
                <li className="flex items-start gap-3">
                  <span className="font-serif font-bold text-amber-400 tabular-nums">
                    01.
                  </span>
                  <span>
                    Fill in student name, parent name, target batch (Class 11, 12, Droppers),
                    and preferred date below.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-serif font-bold text-amber-400 tabular-nums">
                    02.
                  </span>
                  <span>
                    Click <strong>BOOK A FREE DEMO CLASS</strong> to automatically format your
                    enquiry message.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-serif font-bold text-amber-400 tabular-nums">
                    03.
                  </span>
                  <span>
                    WhatsApp opens with your details ready to send to{' '}
                    <span className="font-semibold text-white">
                      {ACADEMY_INFO.phoneDisplay}
                    </span>{' '}
                    to finalize batch timings.
                  </span>
                </li>
              </ol>
            </div>
          </motion.div>

          {/* Right Column: Validated Admission & Demo Class Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Free Demo Class Booking Form"
              className="rounded-3xl border border-purple-500/20 bg-[#FBF9FF] p-6 sm:p-8 lg:p-10 shadow-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 1. Student Name */}
                <div>
                  <label
                    htmlFor="studentName"
                    className="block text-xs sm:text-sm font-semibold text-[#180F2E]"
                  >
                    Student Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="studentName"
                    name="studentName"
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => handleFieldChange('studentName', e.target.value)}
                    placeholder="Enter student's full name"
                    aria-invalid={Boolean(errors.studentName)}
                    aria-describedby={errors.studentName ? 'studentName-error' : undefined}
                    className={getFieldClass('studentName')}
                  />
                  {errors.studentName && (
                    <p
                      id="studentName-error"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.studentName}</span>
                    </p>
                  )}
                </div>

                {/* 2. Parent / Guardian Name */}
                <div>
                  <label
                    htmlFor="parentName"
                    className="block text-xs sm:text-sm font-semibold text-[#180F2E]"
                  >
                    Parent / Guardian Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="parentName"
                    name="parentName"
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => handleFieldChange('parentName', e.target.value)}
                    placeholder="Enter parent or guardian name"
                    aria-invalid={Boolean(errors.parentName)}
                    aria-describedby={errors.parentName ? 'parentName-error' : undefined}
                    className={getFieldClass('parentName')}
                  />
                  {errors.parentName && (
                    <p
                      id="parentName-error"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.parentName}</span>
                    </p>
                  )}
                </div>

                {/* 3. Student's Target Class / Course */}
                <div>
                  <label
                    htmlFor="courseLevel"
                    className="block text-xs sm:text-sm font-semibold text-[#180F2E]"
                  >
                    Target Class / NEET Batch <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="courseLevel"
                    name="courseLevel"
                    required
                    value={formData.courseLevel}
                    onChange={(e) => handleFieldChange('courseLevel', e.target.value)}
                    aria-invalid={Boolean(errors.courseLevel)}
                    aria-describedby={errors.courseLevel ? 'courseLevel-error' : undefined}
                    className={getFieldClass('courseLevel')}
                  >
                    <option value="">Select Target Batch</option>
                    {COURSES.map((course) => (
                      <option key={course.id} value={course.title}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                  {errors.courseLevel && (
                    <p
                      id="courseLevel-error"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.courseLevel}</span>
                    </p>
                  )}
                </div>

                {/* 4. Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs sm:text-sm font-semibold text-[#180F2E]"
                  >
                    Subject / Focus Area <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => handleFieldChange('subject', e.target.value)}
                    placeholder="e.g. NEET UG Biology, NCERT Line-by-Line"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    className={getFieldClass('subject')}
                  />
                  {errors.subject && (
                    <p
                      id="subject-error"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* 5. Contact Number */}
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-xs sm:text-sm font-semibold text-[#180F2E]"
                  >
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    required
                    value={formData.contactNumber}
                    onChange={(e) => handleFieldChange('contactNumber', e.target.value)}
                    placeholder="e.g. +91 98300 00000"
                    aria-invalid={Boolean(errors.contactNumber)}
                    aria-describedby={
                      errors.contactNumber ? 'contactNumber-error' : undefined
                    }
                    className={getFieldClass('contactNumber')}
                  />
                  {errors.contactNumber && (
                    <p
                      id="contactNumber-error"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.contactNumber}</span>
                    </p>
                  )}
                </div>

                {/* 6. Preferred Demo Date */}
                <div>
                  <label
                    htmlFor="preferredDate"
                    className="block text-xs sm:text-sm font-semibold text-[#180F2E]"
                  >
                    Preferred Demo Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    min={todayIso}
                    required
                    value={formData.preferredDate}
                    onChange={(e) => handleFieldChange('preferredDate', e.target.value)}
                    aria-invalid={Boolean(errors.preferredDate)}
                    aria-describedby={
                      errors.preferredDate ? 'preferredDate-error' : undefined
                    }
                    className={getFieldClass('preferredDate')}
                  />
                  {errors.preferredDate && (
                    <p
                      id="preferredDate-error"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.preferredDate}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* 7. Additional Message */}
              <div className="mt-5">
                <label
                  htmlFor="additionalMessage"
                  className="block text-xs sm:text-sm font-semibold text-[#180F2E]"
                >
                  Target Score / Questions for Shubhajit Sir
                </label>
                <textarea
                  id="additionalMessage"
                  name="additionalMessage"
                  rows={3}
                  value={formData.additionalMessage}
                  onChange={(e) => handleFieldChange('additionalMessage', e.target.value)}
                  placeholder="Share your current score, weak topics, or questions about dropper / Class 11-12 timings"
                  className={getFieldClass('additionalMessage')}
                />
              </div>

              {/* Prominent Submit Button */}
              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-4 text-sm sm:text-base font-bold tracking-wide text-white shadow-lg shadow-purple-900/30 transition-all duration-150 hover:from-violet-500 hover:to-fuchsia-500 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800"
                >
                  <Send className="h-4 w-4 shrink-0" />
                  <span>BOOK A FREE DEMO CLASS</span>
                </button>
              </div>

              {/* Instruction & Prepared WhatsApp Message Preview */}
              {preparedSubmission && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-6 rounded-2xl border border-emerald-600/30 bg-emerald-50/80 p-5 text-[#180F2E]"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#180F2E]">
                        WhatsApp Ready With Your Demo Class Details
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#180F2E]/90">
                        WhatsApp is opening with your booking enquiry ready to send to{' '}
                        <strong>{ACADEMY_INFO.teacherName}</strong> ({ACADEMY_INFO.phoneDisplay}
                        ). Send the message to confirm demo batch timings directly.
                      </p>

                      <div className="mt-4 rounded-xl border border-purple-500/15 bg-white p-3.5">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-purple-700">
                          Prepared Message Preview
                        </p>
                        <pre className="mt-2 whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#180F2E]">
                          {preparedSubmission.messageText}
                        </pre>
                      </div>

                      <div className="mt-4">
                        <a
                          href={preparedSubmission.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-xs sm:text-sm font-bold text-black shadow-sm transition-colors hover:bg-[#20bd5a]"
                        >
                          <span>Open WhatsApp to Send Enquiry</span>
                          <ExternalLink className="h-4 w-4 shrink-0" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
