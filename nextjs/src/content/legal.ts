// Framer "Legal" CMS collection (page module LxbXcNVo…), extracted verbatim from the Framer
// publish of 13 Oct 2026 (qa/framer/legal/*.html). Copy quirks are Framer's and kept as-is: the
// email reads thana@oglabs.io but links to hello@oglabs.io, and the Singapore number links to an
// Australian tel: placeholder.
export type LegalDoc = {
  title: string;
  /** ISO date and Framer's rendered label. */
  updated: string;
  updatedLabel: string;
  email: { href: string; text: string };
  phone: { href: string; text: string };
  /** Body HTML (plain semantic tags), rendered through RichText. */
  html: string;
};

export const LEGAL: Record<"terms-of-service" | "privacy-policy" | "cookies-policy", LegalDoc> = {
  "terms-of-service": {
    "title": "Terms of Service",
    "updated": "2026-06-05T00:00:00.000Z",
    "updatedLabel": "June 5, 2026",
    "email": {
      "href": "mailto:hello@oglabs.io",
      "text": "thana@oglabs.io"
    },
    "phone": {
      "href": "tel:+61298765432",
      "text": "+65 8410 6368"
    },
    "html": "<p>These Terms of Service (“Terms”) govern your access to and use of the OG Labs website and the digital transformation services we provide (together, the “Services”). By using our website or engaging OG Labs, you agree to these Terms.</p><h3>1. Who We Are</h3><p>OG Labs is a digital transformation partner that helps small and medium businesses across Australia, New Zealand, and Southeast Asia implement and optimise HubSpot, ClickUp, and AI-driven automation.</p><h3>2. Use of Our Website and Services</h3><p>You agree to use our website and Services only for lawful purposes and in accordance with these Terms. You may not:</p><ul><li><p>Violate any applicable laws or regulations</p></li><li><p>Attempt to access, alter, or disrupt our website or systems</p></li><li><p>Interfere with the security or integrity of our website or Services</p></li><li><p>Misrepresent your identity or your affiliation with OG Labs</p></li></ul><h3>3. Engagements and Deliverables</h3><p>The specific scope, fees, timelines, and deliverables for any consulting or implementation work are set out in a separate proposal or statement of work agreed between you and OG Labs. Where those documents conflict with these Terms, the signed proposal or statement of work prevails for that engagement.</p><h3>4. Intellectual Property</h3><p>All content on our website, including text, graphics, branding, and materials, is the property of OG Labs or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or reuse it without prior written consent. Ownership of custom work created during an engagement is governed by the relevant statement of work.</p><h3>5. Third-Party Platforms</h3><p>Our Services involve third-party platforms such as HubSpot, ClickUp, Make, and n8n. We are not responsible for the availability, functionality, pricing, or policies of those platforms. Your use of them is subject to their own terms and conditions.</p><h3>6. Service Availability and Outcomes</h3><p>We aim to deliver reliable, high-quality work, but we do not guarantee specific business results, uninterrupted website availability, or error-free operation of third-party tools. Any performance figures shown on our website are illustrative and not a promise of results.</p><h3>7. Limitation of Liability</h3><p>To the fullest extent permitted by law, OG Labs will not be liable for indirect, incidental, or consequential damages arising from your use of our website or Services, including lost revenue, business interruption, or issues caused by third-party platforms.</p><h3>8. Indemnification</h3><p>You agree to indemnify and hold harmless OG Labs, its team, and partners from any claims, damages, or expenses arising from your misuse of our website or Services or your breach of these Terms.</p><h3>9. Governing Law</h3><p>These Terms are governed by and interpreted in accordance with the laws of Singapore. Any disputes arising from these Terms or your use of our website or Services will be subject to the exclusive jurisdiction of the courts of Singapore.</p><h3>10. Changes to These Terms</h3><p>We may update these Terms from time to time. Changes will be posted on this page with an updated effective date. Continued use of our website or Services after changes are posted means you accept the revised Terms.</p><h3>11. Contact</h3><p>If you have questions about these Terms, please contact us through our website or your OG Labs point of contact.</p>"
  },
  "privacy-policy": {
    "title": "Privacy Policy",
    "updated": "2026-06-05T00:00:00.000Z",
    "updatedLabel": "June 5, 2026",
    "email": {
      "href": "mailto:hello@oglabs.io",
      "text": "thana@oglabs.io"
    },
    "phone": {
      "href": "tel:+61298765432",
      "text": "+65 8410 6368"
    },
    "html": "<p>This Privacy Policy explains how OG Labs (“we,” “us,” or “our”) collects, uses, and protects your information when you visit our website or engage our services.</p><h3>1. Information We Collect</h3><p>a. Information you provide</p><ul><li><p>Name, email, phone number, and company details</p></li><li><p>Information submitted through our contact or booking forms</p></li><li><p>Details shared during discovery, consultation, or project work</p></li></ul><p>b. Usage information</p><ul><li><p>How you interact with our website</p></li><li><p>Device, browser, and IP information</p></li></ul><p>c. Client systems<br>During an engagement, we may be granted access to platforms such as HubSpot, ClickUp, and connected tools. We access and process data in those systems only to deliver the agreed services.</p><h3>2. How We Use Your Information</h3><ul><li><p>To respond to enquiries and schedule consultations</p></li><li><p>To deliver, manage, and improve our services</p></li><li><p>To configure and integrate the platforms covered by your engagement</p></li><li><p>To send relevant updates and service communications</p></li></ul><p>We do not sell your personal data.</p><h3>3. Data From Client Platforms</h3><p>When we work inside your HubSpot, ClickUp, or other systems, that data remains yours. We act on your instructions, use it only to perform the agreed work, and follow the access and confidentiality terms in your statement of work.</p><h3>4. Data Sharing</h3><ul><li><p>With trusted subprocessors and platforms that support our services</p></li><li><p>With integrations you ask us to connect</p></li><li><p>Where required by law</p></li></ul><h3>5. Data Security</h3><p>We apply reasonable technical and organisational measures to protect your data. No system is completely secure, and we cannot guarantee absolute protection.</p><h3>6. Data Retention</h3><p>We keep your information only as long as needed to provide our services or meet legal obligations. You may request deletion of your data, subject to applicable laws and legitimate business needs.</p><h3>7. Your Rights</h3><ul><li><p>Access the personal data we hold about you</p></li><li><p>Request correction or deletion</p></li><li><p>Object to or restrict certain processing</p></li><li><p>Withdraw consent where applicable</p></li></ul><h3>8. Governing Law</h3><p>This Privacy Policy is governed by the laws of Singapore. We aim to handle personal data in line with applicable privacy laws across the regions we serve, including Australia, New Zealand, and Southeast Asia.</p><h3>9. Changes</h3><p>We may update this Privacy Policy from time to time. Changes will be posted here with an updated effective date.</p><h3>10. Contact</h3><p>For any questions about this Privacy Policy or your data, contact us through our website or your OG Labs point of contact.</p>"
  },
  "cookies-policy": {
    "title": "Cookies Policy",
    "updated": "2026-06-05T00:00:00.000Z",
    "updatedLabel": "June 5, 2026",
    "email": {
      "href": "mailto:hello@oglabs.io",
      "text": "thana@oglabs.io"
    },
    "phone": {
      "href": "tel:+61298765432",
      "text": "+65 8410 6368"
    },
    "html": "<p>This Cookies Policy explains how OG Labs (“we,” “us,” or “our”) uses cookies and similar technologies on our website.</p><h3>1. What Are Cookies?</h3><p>Cookies are small text files stored on your device when you visit a website. They help the site work properly, remember your preferences, and improve your experience. Cookies may be session-based or persistent.</p><h3>2. How We Use Cookies</h3><ul><li><p>To keep our website functioning correctly</p></li><li><p>To remember your preferences</p></li><li><p>To understand how visitors use the site</p></li><li><p>To improve performance and security</p></li></ul><p>We do not use cookies to sell personal data.</p><h3>3. Types of Cookies We Use</h3><p>a. Essential cookies<br>Required for the website to operate, including security and navigation.</p><p>b. Functional cookies<br>Remember your preferences and settings for a smoother experience.</p><p>c. Analytics cookies<br>Help us understand how visitors use the site so we can improve it. This data is aggregated where possible.</p><h3>4. Third-Party Cookies</h3><p>We may use trusted third-party services, such as analytics providers, that set cookies on our behalf. These are subject to those providers’ own privacy and cookies policies.</p><h3>5. Managing Cookies</h3><p>You can control or delete cookies through your browser settings. Most browsers let you view, block, or delete cookies and set preferences per site. Disabling essential cookies may affect how the website works.</p><h3>6. Changes</h3><p>We may update this Cookies Policy from time to time. Changes will be posted here with an updated effective date.</p><h3>7. Contact</h3><p>If you have questions about our use of cookies, contact us through our website.</p>"
  }
};
