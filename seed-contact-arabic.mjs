// Seed Contact page content (English + Arabic)
// Run with: node seed-contact-arabic.mjs

const API_BASE = 'http://localhost:3001/api';

const items = [
  // ── Hero Section ──
  { section: 'hero', key: 'badge', value: 'Contact', valueAr: '\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627', sortOrder: 1 },
  { section: 'hero', key: 'title', value: "We'd Love to Hear From You", valueAr: '\u064A\u0633\u0639\u062F\u0646\u0627 \u0633\u0645\u0627\u0639 \u0631\u0623\u064A\u0643', sortOrder: 2 },
  { section: 'hero', key: 'description', value: 'PAFT is a trusted supplier of high-quality plastic pallets, offering durable, eco-friendly, and cost-effective solutions for your storage and logistics needs. We provide a wide range of plastic pallet options designed to meet the demands of various industries, ensuring safe handling, easy transportation, and optimal warehouse efficiency.', valueAr: 'PAFT \u0647\u064A \u0645\u0648\u0631\u062F \u0645\u0648\u062B\u0648\u0642 \u0644\u0644\u0628\u0627\u0644\u062A\u0627\u062A \u0627\u0644\u0628\u0644\u0627\u0633\u062A\u064A\u0643\u064A\u0629 \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062C\u0648\u062F\u0629\u060C \u0646\u0642\u062F\u0645 \u062D\u0644\u0648\u0644\u0627\u064B \u0645\u062A\u064A\u0646\u0629 \u0648\u0635\u062F\u064A\u0642\u0629 \u0644\u0644\u0628\u064A\u0626\u0629 \u0648\u0641\u0639\u0627\u0644\u0629 \u0645\u0646 \u062D\u064A\u062B \u0627\u0644\u062A\u0643\u0644\u0641\u0629 \u0644\u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0648\u0627\u0644\u0644\u0648\u062C\u0633\u062A\u064A\u0627\u062A. \u0646\u0648\u0641\u0631 \u0645\u062C\u0645\u0648\u0639\u0629 \u0648\u0627\u0633\u0639\u0629 \u0645\u0646 \u0627\u0644\u0628\u0627\u0644\u062A\u0627\u062A \u0627\u0644\u0628\u0644\u0627\u0633\u062A\u064A\u0643\u064A\u0629 \u0627\u0644\u0645\u0635\u0645\u0645\u0629 \u0644\u062A\u0644\u0628\u064A\u0629 \u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0635\u0646\u0627\u0639\u0627\u062A \u0627\u0644\u0645\u062E\u062A\u0644\u0641\u0629\u060C \u0645\u0645\u0627 \u064A\u0636\u0645\u0646 \u0627\u0644\u0645\u0646\u0627\u0648\u0644\u0629 \u0627\u0644\u0622\u0645\u0646\u0629 \u0648\u0627\u0644\u0646\u0642\u0644 \u0627\u0644\u0633\u0647\u0644 \u0648\u0643\u0641\u0627\u0621\u0629 \u0627\u0644\u0645\u0633\u062A\u0648\u062F\u0639\u0627\u062A \u0627\u0644\u0645\u062B\u0644\u0649.', sortOrder: 3 },

  // ── Contact Cards ──
  { section: 'contact-cards', key: 'card-1-title', value: 'Visit Us', valueAr: '\u0632\u0648\u0631\u0648\u0646\u0627', sortOrder: 1 },
  { section: 'contact-cards', key: 'card-1-line-1', value: 'T 29, IDG, Industrial Square Area E2,', valueAr: 'T 29\u060C IDG\u060C \u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0635\u0646\u0627\u0639\u064A\u0629 \u0627\u0644\u0645\u0631\u0628\u0639\u0629 E2\u060C', sortOrder: 2 },
  { section: 'contact-cards', key: 'card-1-line-2', value: 'October 6th Industrial Area Zone 4.', valueAr: '\u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0635\u0646\u0627\u0639\u064A\u0629 \u0627\u0644\u0633\u0627\u062F\u0633 \u0645\u0646 \u0623\u0643\u062A\u0648\u0628\u0631 \u0627\u0644\u0645\u0646\u0637\u0642\u0629 4.', sortOrder: 3 },
  { section: 'contact-cards', key: 'card-1-line-3', value: 'Giza, Egypt.', valueAr: '\u0627\u0644\u062C\u064A\u0632\u0629\u060C \u0645\u0635\u0631.', sortOrder: 4 },
  { section: 'contact-cards', key: 'card-2-title', value: 'Call Us', valueAr: '\u0627\u062A\u0635\u0644 \u0628\u0646\u0627', sortOrder: 5 },
  { section: 'contact-cards', key: 'card-2-line-1', value: '+201022239770', valueAr: '+201022239770', sortOrder: 6 },
  { section: 'contact-cards', key: 'card-2-line-2', value: 'Sales Unit Manager', valueAr: '\u0645\u062F\u064A\u0631 \u0648\u062D\u062F\u0629 \u0627\u0644\u0645\u0628\u064A\u0639\u0627\u062A', sortOrder: 7 },
  { section: 'contact-cards', key: 'card-3-title', value: 'Email Us', valueAr: '\u0631\u0627\u0633\u0644\u0646\u0627', sortOrder: 8 },
  { section: 'contact-cards', key: 'card-3-line-1', value: 'info@paft.net', valueAr: 'info@paft.net', sortOrder: 9 },

  // ── Social Networks ──
  { section: 'social', key: 'title', value: 'Social Networks', valueAr: '\u0634\u0628\u0643\u0627\u062A \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A', sortOrder: 1 },
  { section: 'social', key: 'facebook-label', value: 'Follow PAFT on Facebook', valueAr: '\u062A\u0627\u0628\u0639 PAFT \u0639\u0644\u0649 \u0641\u064A\u0633\u0628\u0648\u0643', sortOrder: 2 },
  { section: 'social', key: 'linkedin-label', value: 'Follow PAFT on LinkedIn', valueAr: '\u062A\u0627\u0628\u0639 PAFT \u0639\u0644\u0649 \u0644\u064A\u0646\u0643\u062F\u0625\u0646', sortOrder: 3 },
  { section: 'social', key: 'facebook-url', value: 'https://web.facebook.com/paft.pallets/?locale=ar_AR&_rdc=1&_rdr#', valueAr: 'https://web.facebook.com/paft.pallets/?locale=ar_AR&_rdc=1&_rdr#', sortOrder: 4 },
  { section: 'social', key: 'linkedin-url', value: 'https://www.linkedin.com/company/packaging-&-food-technology-paft/posts/?feedView=all', valueAr: 'https://www.linkedin.com/company/packaging-&-food-technology-paft/posts/?feedView=all', sortOrder: 5 },

  // ── Form Section ──
  { section: 'form', key: 'title', value: 'Send Us a', valueAr: '\u0623\u0631\u0633\u0644 \u0644\u0646\u0627', sortOrder: 1 },
  { section: 'form', key: 'title-highlight', value: 'Message', valueAr: '\u0631\u0633\u0627\u0644\u0629', sortOrder: 2 },
  { section: 'form', key: 'subtitle', value: 'Fill in the details below and our team will get back to you promptly.', valueAr: '\u0627\u0645\u0644\u0623 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0623\u062F\u0646\u0627\u0647 \u0648\u0633\u064A\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0641\u0631\u064A\u0642\u0646\u0627 \u0641\u064A \u0623\u0642\u0631\u0628 \u0648\u0642\u062A.', sortOrder: 3 },
  { section: 'form', key: 'first-name', value: 'First Name', valueAr: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644', sortOrder: 4 },
  { section: 'form', key: 'last-name', value: 'Last Name', valueAr: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u062E\u064A\u0631', sortOrder: 5 },
  { section: 'form', key: 'email', value: 'Email', valueAr: '\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A', sortOrder: 6 },
  { section: 'form', key: 'message-label', value: 'Comment or Message', valueAr: '\u062A\u0639\u0644\u064A\u0642 \u0623\u0648 \u0631\u0633\u0627\u0644\u0629', sortOrder: 7 },
  { section: 'form', key: 'placeholder-first', value: 'John', valueAr: '\u0623\u062D\u0645\u062F', sortOrder: 8 },
  { section: 'form', key: 'placeholder-last', value: 'Doe', valueAr: '\u0645\u062D\u0645\u062F', sortOrder: 9 },
  { section: 'form', key: 'placeholder-email', value: 'john@company.com', valueAr: 'ahmed@company.com', sortOrder: 10 },
  { section: 'form', key: 'placeholder-message', value: 'Tell us about your requirements or ask us anything...', valueAr: '\u0623\u062E\u0628\u0631\u0646\u0627 \u0639\u0646 \u0645\u062A\u0637\u0644\u0628\u0627\u062A\u0643 \u0623\u0648 \u0627\u0633\u0623\u0644\u0646\u0627 \u0623\u064A \u0634\u064A\u0621...', sortOrder: 11 },
  { section: 'form', key: 'submit', value: 'Submit', valueAr: '\u0625\u0631\u0633\u0627\u0644', sortOrder: 12 },
  { section: 'form', key: 'sending', value: 'Sending\u2026', valueAr: '\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0631\u0633\u0627\u0644...', sortOrder: 13 },
  { section: 'form', key: 'success-title', value: 'Message Sent!', valueAr: '\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0633\u0627\u0644\u0629!', sortOrder: 14 },
  { section: 'form', key: 'success-description', value: "Thank you for reaching out. We'll get back to you shortly.", valueAr: '\u0634\u0643\u0631\u0627\u064B \u0644\u062A\u0648\u0627\u0635\u0644\u0643. \u0633\u0646\u0639\u0648\u062F \u0625\u0644\u064A\u0643 \u0641\u064A \u0623\u0642\u0631\u0628 \u0648\u0642\u062A.', sortOrder: 15 },
  { section: 'form', key: 'success-button', value: 'Send Another Message', valueAr: '\u0625\u0631\u0633\u0627\u0644 \u0631\u0633\u0627\u0644\u0629 \u0623\u062E\u0631\u0649', sortOrder: 16 },

  // ── Quick Response ──
  { section: 'quick-response', key: 'title', value: 'Quick Response Guarantee', valueAr: '\u0636\u0645\u0627\u0646 \u0627\u0644\u0631\u062F \u0627\u0644\u0633\u0631\u064A\u0639', sortOrder: 1 },
  { section: 'quick-response', key: 'description', value: 'We respond to all inquiries within 24 hours during business days.', valueAr: '\u0646\u0631\u062F \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0627\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631\u0627\u062A \u062E\u0644\u0627\u0644 24 \u0633\u0627\u0639\u0629 \u0641\u064A \u0623\u064A\u0627\u0645 \u0627\u0644\u0639\u0645\u0644.', sortOrder: 2 },
  { section: 'quick-response', key: 'item-1', value: 'Free quotes and consultations', valueAr: '\u0639\u0631\u0648\u0636 \u0623\u0633\u0639\u0627\u0631 \u0648\u0627\u0633\u062A\u0634\u0627\u0631\u0627\u062A \u0645\u062C\u0627\u0646\u064A\u0629', sortOrder: 3 },
  { section: 'quick-response', key: 'item-2', value: 'Custom solutions available', valueAr: '\u062D\u0644\u0648\u0644 \u0645\u062E\u0635\u0635\u0629 \u0645\u062A\u0627\u062D\u0629', sortOrder: 4 },
  { section: 'quick-response', key: 'item-3', value: 'Bulk order discounts', valueAr: '\u062E\u0635\u0648\u0645\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0643\u0628\u064A\u0631\u0629', sortOrder: 5 },
  { section: 'quick-response', key: 'item-4', value: 'Fast delivery nationwide', valueAr: '\u062A\u0648\u0635\u064A\u0644 \u0633\u0631\u064A\u0639 \u0644\u062C\u0645\u064A\u0639 \u0623\u0646\u062D\u0627\u0621 \u0627\u0644\u0628\u0644\u0627\u062F', sortOrder: 6 },

  // ── Business Hours ──
  { section: 'business-hours', key: 'title', value: 'Business Hours', valueAr: '\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644', sortOrder: 1 },
  { section: 'business-hours', key: 'weekdays', value: 'Sunday \u2013 Thursday', valueAr: '\u0627\u0644\u0623\u062D\u062F \u2013 \u0627\u0644\u062E\u0645\u064A\u0633', sortOrder: 2 },
  { section: 'business-hours', key: 'weekday-time', value: '9:00 AM \u2013 6:00 PM', valueAr: '9:00 \u0635\u0628\u0627\u062D\u0627\u064B \u2013 6:00 \u0645\u0633\u0627\u0621\u064B', sortOrder: 3 },
  { section: 'business-hours', key: 'weekend', value: 'Friday \u2013 Saturday', valueAr: '\u0627\u0644\u062C\u0645\u0639\u0629 \u2013 \u0627\u0644\u0633\u0628\u062A', sortOrder: 4 },
  { section: 'business-hours', key: 'weekend-status', value: 'Closed', valueAr: '\u0645\u063A\u0644\u0642', sortOrder: 5 },

  // ── Validation Messages ──
  { section: 'validation', key: 'first-name', value: 'First name is required', valueAr: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 \u0645\u0637\u0644\u0648\u0628', sortOrder: 1 },
  { section: 'validation', key: 'last-name', value: 'Last name is required', valueAr: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u062E\u064A\u0631 \u0645\u0637\u0644\u0648\u0628', sortOrder: 2 },
  { section: 'validation', key: 'email-required', value: 'Email is required', valueAr: '\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0645\u0637\u0644\u0648\u0628', sortOrder: 3 },
  { section: 'validation', key: 'email-invalid', value: 'Enter a valid email address', valueAr: '\u0623\u062F\u062E\u0644 \u0639\u0646\u0648\u0627\u0646 \u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0635\u062D\u064A\u062D', sortOrder: 4 },
  { section: 'validation', key: 'message', value: 'Message is required', valueAr: '\u0627\u0644\u0631\u0633\u0627\u0644\u0629 \u0645\u0637\u0644\u0648\u0628\u0629', sortOrder: 5 },
];

async function main() {
  console.log(`Seeding ${items.length} Contact page content items...`);

  // 1. Login
  const loginRes = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@paft.com', password: 'admin123' }),
  });
  const { access_token } = await loginRes.json();
  if (!access_token) { console.error('Login failed'); return; }
  console.log('Logged in successfully.');

  // 2. Create each content item
  let created = 0;
  let errors = 0;
  for (const item of items) {
    try {
      const res = await fetch(`${API_BASE}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({ page: 'contact', ...item }),
      });
      if (res.ok) {
        created++;
      } else {
        const err = await res.text();
        console.warn(`Failed [${item.section}/${item.key}]: ${res.status} ${err}`);
        errors++;
      }
    } catch (e) {
      console.error(`Error [${item.section}/${item.key}]:`, e.message);
      errors++;
    }
  }

  console.log(`\nDone! Created: ${created}, Errors: ${errors}`);
}

main().catch(console.error);
