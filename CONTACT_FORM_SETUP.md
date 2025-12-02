# 📧 Connect Your Contact Form

To receive emails at **support@rnglobalcommerce.com** when someone fills out the contact form, follow these simple steps:

## Step 1: Get Your Form ID
1. Go to **[Formspree.io](https://formspree.io/)** and sign up (it's free).
2. Create a **New Form**.
3. Name it "Contact Form" and set the **Send emails to** field to:
   > `support@rnglobalcommerce.com`
4. Formspree will give you a unique URL like: `https://formspree.io/f/xkqnzvlp`

## Step 2: Update the Code
1. Open the file `pages/contact_and_support.html`.
2. Look for **line 190** (approx):
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" class="space-y-6">
   ```
3. Replace `YOUR_FORMSPREE_ID` with the code you got from Formspree (e.g., `xkqnzvlp`).

## Step 3: Verify
1. Go to your website's contact page.
2. Fill out the form and click "Send Message".
3. Check your email (`support@rnglobalcommerce.com`) to confirm you received it.
