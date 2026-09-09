import nodemailer from 'nodemailer';

const PRIMARY_ADMIN_EMAIL = 'inoxentdani09@gmail.com';

// Lazy initialized transporter
let transporter = null;

function getTransporter() {
  if (!transporter && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    } catch (e) {
      console.warn('Mailer transporter init deferred:', e);
    }
  }
  return transporter;
}

export async function sendEmailNotification({
  type = 'inquiry',
  name = 'Client',
  email = '',
  phone = '',
  subject = 'New Portfolio Contact Submission',
  message = '',
  courseName = '',
  amount = '',
  trxId = '',
  paymentMethod = ''
}) {
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
  const recipient = process.env.ADMIN_NOTIFY_EMAIL || PRIMARY_ADMIN_EMAIL;

  let emailSubject = '';
  let emailHtml = '';
  let emailText = '';

  if (type === 'enrollment') {
    emailSubject = `🎓 New Course Enrollment: ${name} (${courseName || 'Masterclass'})`;
    emailText = `
New Course Enrollment Application Received!
------------------------------------------
Student Name: ${name}
Student Email: ${email}
Student Phone: ${phone || 'N/A'}
Course: ${courseName}
Amount Paid: ${amount || 'N/A'}
Payment Method: ${paymentMethod || 'JazzCash/EasyPaisa'}
Transaction ID / TID: ${trxId}
Time: ${timestamp}

Please login to Admin Dashboard to review and verify access.
    `.trim();

    emailHtml = `
      <div style="font-family: Arial, sans-serif; background:#0f172a; color:#f8fafc; padding:24px; border-radius:12px; max-width:600px; margin:0 auto; border:1px solid #334155;">
        <div style="text-align:center; margin-bottom:20px;">
          <h2 style="color:#f97316; margin:0;">Daniyal Dev Academy</h2>
          <p style="color:#94a3b8; font-size:13px; margin:4px 0 0;">New Course Enrollment Application</p>
        </div>
        <div style="background:#1e293b; padding:18px; border-radius:8px; border-left:4px solid #f97316; margin-bottom:20px;">
          <p style="margin:4px 0;"><strong>Student Name:</strong> ${name}</p>
          <p style="margin:4px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#38bdf8;">${email}</a></p>
          <p style="margin:4px 0;"><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p style="margin:4px 0;"><strong>Course Applied:</strong> <span style="color:#f97316; font-weight:bold;">${courseName}</span></p>
          <p style="margin:4px 0;"><strong>Amount Paid:</strong> ${amount}</p>
          <p style="margin:4px 0;"><strong>Payment Method:</strong> ${paymentMethod}</p>
          <p style="margin:4px 0;"><strong>Transaction ID (TID):</strong> <code style="background:#0f172a; padding:3px 6px; border-radius:4px; color:#10b981; font-weight:bold;">${trxId}</code></p>
          <p style="margin:4px 0; color:#94a3b8; font-size:12px;">Submitted on: ${timestamp}</p>
        </div>
        <div style="text-align:center;">
          <a href="https://ais-dev-stf4evku6l4jdag5fff6ix-585895170294.asia-southeast1.run.app/Admin/Enrollments" style="background:#f97316; color:#ffffff; padding:10px 20px; text-decoration:none; border-radius:6px; font-weight:bold; display:inline-block;">Open Admin Panel to Approve</a>
        </div>
      </div>
    `;
  } else {
    emailSubject = `📩 New Client Message from ${name}: ${subject}`;
    emailText = `
New Client Inquiry Received!
----------------------------
Sender Name: ${name}
Sender Email: ${email}
Sender Phone: ${phone || 'N/A'}
Subject: ${subject}
Date: ${timestamp}

Message Body:
${message}
    `.trim();

    emailHtml = `
      <div style="font-family: Arial, sans-serif; background:#0f172a; color:#f8fafc; padding:24px; border-radius:12px; max-width:600px; margin:0 auto; border:1px solid #334155;">
        <div style="text-align:center; margin-bottom:20px;">
          <h2 style="color:#f97316; margin:0;">Daniyal Portfolio Website</h2>
          <p style="color:#94a3b8; font-size:13px; margin:4px 0 0;">New Client Contact Message</p>
        </div>
        <div style="background:#1e293b; padding:18px; border-radius:8px; border-left:4px solid #38bdf8; margin-bottom:20px;">
          <p style="margin:4px 0;"><strong>Sender Name:</strong> ${name}</p>
          <p style="margin:4px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#38bdf8;">${email}</a></p>
          <p style="margin:4px 0;"><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p style="margin:4px 0;"><strong>Subject:</strong> ${subject}</p>
          <p style="margin:4px 0; color:#94a3b8; font-size:12px;">Received on: ${timestamp}</p>
          <hr style="border:none; border-top:1px solid #334155; margin:14px 0;" />
          <p style="margin:0; font-size:14px; line-height:1.6; color:#e2e8f0; white-space:pre-wrap;">${message}</p>
        </div>
        <div style="text-align:center;">
          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="background:#f97316; color:#ffffff; padding:10px 20px; text-decoration:none; border-radius:6px; font-weight:bold; display:inline-block; margin-right:10px;">Direct Reply to Client</a>
          <a href="https://ais-dev-stf4evku6l4jdag5fff6ix-585895170294.asia-southeast1.run.app/Admin/Message" style="background:#334155; color:#ffffff; padding:10px 20px; text-decoration:none; border-radius:6px; font-weight:bold; display:inline-block;">View in Admin Panel</a>
        </div>
      </div>
    `;
  }

  // Always log to server console for monitoring
  console.log(`[EMAIL NOTIFICATION] Dispatched to ${recipient} | Subject: "${emailSubject}"`);

  // Send via nodemailer if transport is configured
  const mailTransporter = getTransporter();
  if (mailTransporter) {
    try {
      await mailTransporter.sendMail({
        from: `"Daniyal Portfolio & Academy" <${process.env.SMTP_FROM || PRIMARY_ADMIN_EMAIL}>`,
        to: recipient,
        replyTo: email,
        subject: emailSubject,
        text: emailText,
        html: emailHtml
      });
      console.log(`[EMAIL NOTIFICATION] Email delivered successfully to ${recipient}`);
      return { success: true, delivered: true };
    } catch (err) {
      console.warn('[EMAIL NOTIFICATION] SMTP delivery error (falling back to logging):', err.message);
      return { success: true, delivered: false, error: err.message };
    }
  }

  return { success: true, delivered: false, note: 'Logged to console & database' };
}
