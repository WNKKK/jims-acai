
# Jim's Açaí Rewards - Admin Setup Guide

## GitHub Pages deployment

This repository can be published as a static site on GitHub Pages.

### Publish steps
1. Push this repo to GitHub.
2. Open the repository on GitHub.
3. Go to Settings -> Pages.
4. Under Source, choose GitHub Actions.
5. The workflow in [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) will build and deploy the site.

### Site URLs
- Customer portal: `https://<your-username>.github.io/<repo-name>/jims-acai-customer.html`
- Admin portal: `https://<your-username>.github.io/<repo-name>/admin.html`
- Landing page: `https://<your-username>.github.io/<repo-name>/`

### Notes
- The site uses static HTML files, so no build step is required for Pages.
- Firebase connections will work as long as the browser can load the script and your Firebase project is configured correctly.

## Overview
This system allows you to manage a customer loyalty rewards program with a customer app and admin dashboard.

## Files
- **jims-acai-customer.html** - Customer loyalty card app
- **admin.html** - Admin dashboard for managing store and customers

## Getting Started

### 1. Firebase Setup (Important!)
The system uses Firebase to store data. You need to set up a Firebase project:

1. Go to https://firebase.google.com
2. Create a new project called "jims-acai-rewards"
3. Create a Firestore database (select "Start in test mode")
4. Copy your Firebase config credentials
5. Replace the `firebaseConfig` in BOTH files with your actual credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};
```

### 2. Firebase Collections to Create
In your Firestore dashboard, create these collections:

**customers** - Customer loyalty data
- id: string (unique card ID)
- firstName: string
- lastName: string
- name: string
- email: string
- phone: string (optional)
- adminCode: string (links customer to store)
- stamps: number
- visits: number
- rewards: number
- joined: string
- joinedTimestamp: timestamp
- history: array

**admins** - Admin accounts
- username: string
- code: string (admin password)
- storeName: string
- email: string
- storeCode: string
- createdAt: timestamp

### 3. Using the Customer App
**URL**: Open `jims-acai-customer.html` in a browser

**Features**:
- Onboarding walkthrough
- Customer registration (email required, phone optional)
- **Admin Code field** - Enter your store's admin code to link the customer to your store
- Digital loyalty card with barcode
- Real-time stamp tracking (0-9)
- Reward celebration screen at 9 stamps
- Profile view with statistics
- Add to home screen as app

**Registration Process**:
1. Customer opens the app
2. Enters: First name, Last name, Email, Phone (optional), **Admin Code (optional)**
3. If they enter your admin code, they'll be linked to your store
4. Card is created with unique barcode
5. Data is saved to Firebase

### 4. Using the Admin Dashboard
**URL**: Open `admin.html` in a browser

**Demo Credentials** (for testing):
- Username: `admin`
- Code: `1234`

**Admin Features**:

#### Dashboard
- View total customers, stamps issued, rewards redeemed, visits
- See recent activity

#### Customers Tab
- Search customers by name or email
- View customer details: name, email, stamps, visits, rewards, join date
- Edit customer data (add/remove stamps, adjust visits/rewards)
- Delete customers
- One-click stamp management

#### Rewards Tab
- Create and manage reward promotions
- Set stamp requirements
- Assign reward values
- View active rewards

#### Reports Tab
- Generate reports by type (customer summary, stamp issuance, etc.)
- Select date range
- **Export CSV** - Download customer data as spreadsheet

#### Settings Tab
- Customize store name
- Set default stamps per purchase
- Set stamps needed for free reward (default: 9)
- View your unique store code for customers to enter

### 5. Workflow

**For Store Owner**:
1. Open `admin.html`
2. Create admin account (click "New Admin Account")
3. Fill in: Store name, Username, Admin code, Email
4. Share your **store code** with customers (or have them enter your admin code)
5. Manage customers from the dashboard

**For Customer**:
1. Open `jims-acai-customer.html`
2. Go through onboarding
3. Register with your details
4. Enter store admin code (or store code) to link to store
5. Show barcode at counter when making purchases
6. Watch stamps accumulate on your card
7. Celebrate when you reach 9 stamps!

**For Counter Staff**:
1. Open `admin.html` when customer redeems a reward
2. Find customer in Customers tab
3. Click "Edit" and manually adjust stamps to 0 (marking reward as redeemed)
4. Or admin can manage this later

### 6. Key Linking System

**How customers link to admins**:
- When registering, customers can enter an **Admin Code** (or your **Store Code** from settings)
- This saves the admin code with their profile
- Admin dashboard can filter customers by admin code
- This creates the store-customer relationship

### 7. Customize the System

**Change the app name/branding**:
- Search for "Jim's Açaí" and replace with your store name
- Update emoji if desired
- Modify colors in the CSS `:root` variables

**Change the stamp count**:
- Default is 9 stamps = 1 free reward
- Edit in settings or change value in registration form

**Offline Support**:
- Both apps use localStorage as fallback
- Data syncs to Firebase when online
- Works even if Firebase connection fails temporarily

### 8. Security Notes

⚠️ **Important**: 
- The current setup uses test mode for simplicity
- For production, set up proper Firebase security rules
- Admin codes should be treated like passwords
- Don't share demo credentials publicly

### 9. Troubleshooting

**"Firebase not found" error**:
- Make sure you updated the firebaseConfig with your real credentials

**"No customers showing" in admin**:
- Check that customers are registering and Firebase is receiving data
- Open browser console (F12) to see Firebase logs

**Customer data not syncing**:
- Check internet connection
- Verify Firebase project is set to "test mode" or configure security rules
- Check browser console for errors

**Admin login not working**:
- Use demo credentials: admin / 1234
- Or create new admin account with "New Admin Account" button
- Verify data was saved to Firebase

### 10. Future Enhancements

Potential features to add:
- Email notifications for rewards
- QR code generation for faster scanning
- Multi-location support
- Staff management
- Coupon/promotion codes
- Integration with POS systems
- Mobile app for staff
- Real-time push notifications

---

**Support**: For issues, check the browser console (F12 → Console tab) for error messages.
