// api/send-email.js
// Vercel serverless function — receives the contact form submission and
// sends it to your inbox via Resend.

import { Resend } from 'resend';

// Must be on a domain you've verified in Resend. Until you verify your own
// domain, Resend's sandbox "onboarding@resend.dev" works for testing.
const FROM_EMAIL = 'Portfolio Contact <onboarding@resend.dev>';

// Where you want to receive messages.
const TO_EMAIL = 'faisnuramrulloh@gmail.com';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Fail fast with a clear JSON error if the key is missing,
  // instead of letting Resend throw an uncaught error.
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is missing from environment variables');
    return res.status(500).json({ error: 'Server is not configured correctly. Missing API key.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Basic email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px;">
          <h2 style="margin-bottom: 4px;">New message from your portfolio</h2>
          <p style="color: #666; margin-top: 0;">Sent via the Contact form</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; width: 90px;">Name</td>
              <td style="padding: 8px 0;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Email</td>
              <td style="padding: 8px 0;">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Subject</td>
              <td style="padding: 8px 0;">${escapeHtml(subject)}</td>
            </tr>
          </table>
          <div style="padding: 16px; background: #f8fafc; border-radius: 8px; white-space: pre-wrap;">
            ${escapeHtml(message)}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({ error: 'Failed to send email.', details: error.message || error });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error sending email:', err);
    return res.status(500).json({ error: 'Something went wrong.', details: err.message });
  }
}