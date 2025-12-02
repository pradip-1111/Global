# 📧 How to Stop Emails Going to Spam

Since the contact form uses a third-party service (**FormSubmit**), your email provider (Gmail, Outlook, Yahoo) might mistakenly mark the notifications as spam.

## ✅ **Solution 1: Whitelist the Sender (Best Fix)**

1.  **Open your Spam/Junk folder**.
2.  Find an email from **FormSubmit** (or `submissions@formsubmit.co`).
3.  **Mark it as "Not Spam"** (or "Not Junk").
4.  **Add to Contacts**: Add `submissions@formsubmit.co` to your email contacts.
5.  **Create a Filter (Gmail)**:
    *   Go to Settings > Filters and Blocked Addresses.
    *   Create a new filter.
    *   From: `submissions@formsubmit.co`
    *   Click "Create filter".
    *   Check **"Never send it to Spam"**.

## ✅ **Solution 2: Check the "Reply-To" Address**

The form is configured so that when you hit "Reply" to the notification, it replies directly to the customer. Ensure your email client respects the `Reply-To` header.

## ℹ️ **Technical Details**

We have optimized the form with:
*   **Honeypot Field**: To prevent bot spam.
*   **Auto-Response**: Sends a confirmation to the user (improves reputation).
*   **Clean Subject Line**: "New Inquiry - Aryan Global Commerce Website".

If issues persist, consider using a dedicated SMTP service (like SendGrid or AWS SES), but that requires backend development. For a static site, **whitelisting is the standard solution**.
