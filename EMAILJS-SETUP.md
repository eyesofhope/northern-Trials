# EmailJS Configuration Guide

## Quick 5-Minute Setup

### Step 1: Create EmailJS Account
1. Visit [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (free tier: 300 emails/month)
3. Verify your email

### Step 2: Add Email Service
1. Go to **Email Services** in dashboard
2. Click **Add New Service**
3. Select **Gmail** (recommended)
4. Click **Connect Account** and authorize Gmail
5. Copy the **Service ID** (looks like `service_abc1234`)

### Step 3: Create Email Template
1. Go to **Email Templates** in dashboard
2. Click **Create New Template**
3. Set template name: `Himalayan Escapes Booking`
4. **To Email**: `shafeeqpvt1@gmail.com`
5. **Subject**: `New Booking Inquiry - Himalayan Escapes`
6. **Content** (paste this):

```
New booking inquiry received from website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PACKAGE: {{package}}

CUSTOMER DETAILS:
Name: {{from_name}}
Phone: {{phone}}
Number of Travelers: {{travelers}}
Preferred Dates: {{dates}}

SPECIAL REQUESTS:
{{requests}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Action Required: Call customer within 2 hours
Website: Himalayan Escapes
```

7. Click **Save**
8. Copy the **Template ID** (looks like `template_xyz5678`)

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Find **Public Key** section
3. Copy your public key (looks like `user_abc123xyz`)

### Step 5: Update Website Code

Open `index.html` and make these changes:

**Line ~1050** - Initialize EmailJS:
```javascript
// BEFORE:
emailjs.init("YOUR_PUBLIC_KEY");

// AFTER:
emailjs.init("user_abc123xyz"); // Your actual public key
```

**Line ~1120** - Configure service and template:
```javascript
// BEFORE:
await emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    { ... }
);

// AFTER:
await emailjs.send(
    'service_abc1234',  // Your Service ID
    'template_xyz5678', // Your Template ID
    { ... }
);
```

### Step 6: Test the Form

1. Open your website
2. Click "Book Now"
3. Fill the form with test data
4. Submit
5. Check `shafeeqpvt1@gmail.com` inbox

## Troubleshooting

**Form not sending?**
- Check browser console (F12) for errors
- Verify all 3 IDs are correct (Public Key, Service ID, Template ID)
- Ensure Gmail service is connected in EmailJS dashboard
- Check EmailJS monthly limit (300 emails on free tier)

**Not receiving emails?**
- Check spam folder
- Verify "To Email" in template is `shafeeqpvt1@gmail.com`
- Test email service in EmailJS dashboard

**Rate limit errors?**
- Free tier: 300 emails/month
- Upgrade to paid plan if needed
- Or add fallback to WhatsApp only

## Alternative: Disable EmailJS

If you prefer WhatsApp-only bookings:

1. Remove EmailJS script from `<head>`
2. Remove the "Submit Inquiry" button
3. Keep only "Chat on WhatsApp" button

## Support

EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)

---

**Pro Tip**: Set up email notifications in EmailJS dashboard to get instant alerts on your phone when someone books!
