# Image Email Assignment

A JavaScript web application that loads random images from the Picsum API and allows them to be assigned to one or more email addresses.

The project was built as part of the Netmatters Scion Coalition Scheme JavaScript Array Assessment and demonstrates DOM manipulation, form validation, data management and responsive front-end development.

## Features

- Load random images from the Picsum API
- Assign images to email addresses
- Validate email addresses before assignment
- Assign multiple images to the same email address
- Assign the same image to multiple email addresses
- Prevent duplicate assignments of the same image to the same email address
- Group assigned images by email address
- Display each email address only once
- Responsive and user-friendly interface
- Browser-based application with no backend required
- Cross-browser support for Chrome, Edge and Firefox

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- jQuery
- Picsum API

## Project Structure

```
project-folder/
│
├── index.html
├── css/
│   └── main.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── icons/
│       └── favicon.ico
└── README.md
```

## How It Works

1. A random image is loaded from the Picsum API.
2. The user enters an email address.
3. The email address is validated.
4. The image is assigned to the email address.
5. A new image can be loaded and assigned again.
6. Assigned images are grouped and displayed under each email address.

## Validation Rules

- Email addresses must be entered in a valid format.
- An email address can have multiple images assigned.
- An image can be assigned to multiple email addresses.
- The same image can only be assigned once to a specific email address.

## Installation

Clone the repository:

```bash
git clone https://github.com/feafania/image-email-assignment.git
```

Open the project folder:

```bash
cd image-email-assignment
```

Launch `index.html` in your browser.

No build tools or server setup are required.

## Browser Compatibility

Tested and supported on:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

## Future Improvements

- Search functionality for email addresses
- Remove assigned images
- Dark mode support
- Advanced filtering and sorting options
- Drag and drop image management

## Author

Created by **Tatsiana Kashko**

Part of the Netmatters Scion Coalition Scheme.