# Jarurat Care — Patient Records Dashboard

A simple React app to manage and view patient records with search, details modal, and an Add New Patient form.

## Features
- Landing page with Jarurat Care branding and nav (Home, Patients, About)
- Patients page
  - Fetches mock data from JSONPlaceholder Users API
  - Responsive grid of patient cards (Name, Age, Contact)
  - Search by name
  - View Details in an accessible modal
  - Add New Patient (local state only)
  - Loading and error states
- Responsive styling with plain CSS

## Tech
- React + Vite
- React Router (react-router-dom)
- Hooks-based state management

## Requirements
- Node.js 20.19+ (or 22.12+) is recommended for Vite 7

## Getting Started
```bash
# install deps
npm install

# start dev server
npm run dev

# build for production
npm run build

# preview production build
npm run preview
```

If you see a Node version warning, upgrade Node to 20.19+.

## Project Structure
```
src/
  components/
    Navbar.jsx
    PatientCard.jsx
    Modal.jsx
  pages/
    Home.jsx
    Patients.jsx
    About.jsx
  App.jsx
  App.css
  main.jsx
  index.css
```

## Deployment
- Vercel
  1. Push this repo to GitHub
  2. Import in Vercel, Framework: Vite, Build: `npm run build`, Output: `dist`
- Netlify
  1. Push to GitHub
  2. New site from Git, Build cmd: `npm run build`, Publish dir: `dist`

## Screenshots
Add screenshots to the README (e.g., `/screenshots/home.png`, `/screenshots/patients.png`).

## License
MIT
