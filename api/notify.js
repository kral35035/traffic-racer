import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { method, account, amount, username } = req.body;

  if (!method || !account || !amount) {
    return res.status(400).json({ error: 'Eksik bilgi' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Traffic Racer" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: '💰 Yeni Çekim Talebi!',
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; border-radius: 10px;">
          <h2 style="color: #4CAF50;">💰 Yeni Para Çekim Talebi</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Kullanıcı:</td><td style="padding: 8px;">${username || 'Anonim'}</td></tr>
            <tr style="background: #fff;"><td style="padding: 8px; font-weight: bold;">Yöntem:</td><td style="padding: 8px;">${method === 'iban' ? '🏦 IBAN' : '💳 Payeer'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Hesap:</td><td style="padding: 8px;">${account}</td></tr>
            <tr style="background: #fff;"><td style="padding: 8px; font-weight: bold;">Tutar:</td><td style="padding: 8px; color: #4CAF50; font-size: 18px;"><b>${amount} TL</b></td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Tarih:</td><td style="padding: 8px;">${new Date().
