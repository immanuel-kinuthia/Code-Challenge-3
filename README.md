# Code-Challenge-3
## Overview

Deployment link: https://code-challenge-3-kmz3.onrender.com

Welcome to the Blog Post Management Single Page Application (SPA)! This project is a dynamic web application built with HTML, CSS, and JavaScript to manage blog posts using a local API powered by json-server. Users can view, add, edit, and delete blog posts, with each post featuring a title, content, author, and date. The app runs on a single page with no reloads, leveraging asynchronous API requests and DOM manipulation for a seamless experience. This project was developed as of 10:09 AM EAT on Friday, June 27, 2025.

## Setup Instructions

### Prerequisites

Node.js (to run npm and json-server)

A code editor (e.g., VS Code)

A local server (e.g., live-server extension or npm package)

### Installation

Create Project Folder:

Create a new directory for the project (e.g., blog-post-spa).

Navigate to the directory in your terminal: cd blog-post-spa.

Initialize Project Files:

Create the following files:

index.html

css/styles.css

src/index.js

db.json

Install Dependencies:

Install json-server globally: npm install -g json-server@0.17.4.

Add Sample Data:

Populate db.json with sample blog post data (see example below).

Start the Backend:

Run json-server db.json in the terminal. This starts the API server on http://localhost:3000.

Start the Frontend:

Install live-server globally (if not installed): npm install -g live-server.

Run live-server in the terminal, or use a VS Code extension to open index.html in a browser.

Access the app at http://localhost:8080 (or the port specified by live-server).

### Author & License

Immanuel Kinuthia

immanuel.kinuthia@student.moringaschool.com

Created: 10:00 AM EAT, Friday, June 27, 2025

Free to use, modify, and distribute.