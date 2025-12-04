# Web3Forms Setup Guide

## Step 1: Get Your Access Key

1. Go to: **https://web3forms.com/**
2. Click "Get Started Free"  
3. Enter your email: `support@rnglobalcommerce.com`
4. Check your email for the **Access Key**

## Step 2: Update the Form (Line 374)

Find this line in `contact_and_support.html`:

```html
<form id="contact-form" action="https://formsubmit.co/support@rnglobalcommerce.com" method="POST"
```

**Replace with:**

```html
<form id="contact-form" action="https://api.web3forms.com/submit" method="POST"
```

## Step 3: Replace Hidden Fields (Lines 376-381)

**Remove these lines:**
```html
<input type="hidden" name="_subject" value="New Inquiry - Aryan Global Commerce Website">
<input type="hidden" name="_captcha" value="false">
<input type="hidden" name="_template" value="table">
<input type="hidden" name="_autoresponse"
  value="Thank you for contacting Aryan Global Commerce. We have received your message and will get back to you shortly.">
```

**Replace with:**
```html
<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
<input type="hidden" name="subject" value="New Inquiry - Aryan Global Commerce Website">
<input type="hidden" name="from_name" value="Aryan Global Commerce Contact Form">
```

## Step 4: Update JavaScript (Line 537)

**Find:**
```javascript
const response = await fetch('https://formsubmit.co/ajax/support@rnglobalcommerce.com', {
```

**Replace with:**
```javascript
const response = await fetch('https://api.web3forms.com/submit', {
```

## That's It!

Once you add your access key, the form will work perfectly with Web3Forms! 🎉

### Why Web3Forms?
✅ More reliable than FormSubmit  
✅ Better spam protection  
✅ No confirmation email needed  
✅ Works with AJAX  
✅ Free forever
