# Mia - RAKU Pottery Showcase Website

Site vitrine pour Michelle Roberge - Artiste céramiste RAKU

## Features

- **Landing Page**: Clean hero section with photo-first design
- **Portfolio Gallery**: Showcase of handmade RAKU pottery pieces
- **Artwork Details**: Individual pages for each artwork with images and specifications
- **About Page**: Artist biography and RAKU technique information
- **Contact Form**: Contact form for inquiries and reservations
- **News Section**: Auto-expiring news and events
- **Admin Panel**: Mobile-friendly administration area to manage artworks and news
- **Responsive Design**: Fully responsive across all devices
- **Minimalist Aesthetic**: Clean, elegant design highlighting the artwork

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Vanilla CSS with CSS Modules
- **Backend**: Next.js API Routes (Node.js)
- **Database**: MongoDB
- **Payments**: Stripe (optional integration)
- **Hosting**: Designed for Hostinger deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB instance (local or cloud like MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sblaaaf/mia.git
cd mia
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
mia/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── artworks/     # Artwork CRUD operations
│   │   └── news/         # News CRUD operations
│   ├── about/            # About page
│   ├── admin/            # Admin panel
│   ├── artworks/[id]/    # Individual artwork pages
│   ├── contact/          # Contact page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   ├── Hero.tsx          # Landing hero section
│   ├── Portfolio.tsx     # Portfolio gallery
│   └── NewsSection.tsx   # News display
├── lib/                  # Utility libraries
│   ├── db.ts            # Database connection
│   └── auth.ts          # Authentication utilities
├── types/               # TypeScript type definitions
├── public/              # Static assets
└── package.json         # Dependencies

```

## Admin Access

Default admin credentials (change in production):
- Email: admin@michelle-roberge.com
- Password: admin123

Access admin panel at: `/admin`

## Features in Detail

### Portfolio Management
- Add, edit, and delete artworks
- Upload multiple images per artwork
- Set price, dimensions, technique
- Mark artwork status (available, reserved, sold)
- Feature artworks on homepage

### News Management
- Create news items with expiration dates
- Auto-expiring news (won't display after expiry)
- Optional image for each news item

### Responsive Design
- Mobile-first approach
- Touch-friendly navigation
- Optimized images and layout for all screen sizes

## Deployment on Hostinger

1. Build the project:
```bash
npm run build
```

2. Upload the following to your Hostinger hosting:
   - `.next` folder (build output)
   - `public` folder
   - `package.json`
   - `next.config.js`
   - `.env` (with production values)

3. Set up MongoDB connection (Atlas or other provider)

4. Configure Node.js application in Hostinger control panel

5. Run `npm start` or configure with PM2 for process management

## Environment Variables

Required:
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token generation

Optional:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe public key
- `STRIPE_SECRET_KEY`: Stripe secret key

## License

Private project - All rights reserved © 2024 Michelle Roberge

## Contact

For questions or support, contact: contact@michelle-roberge.com
