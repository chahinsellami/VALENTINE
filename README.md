# Valentine's Invitation Website

A fun and interactive Valentine's invitation built with Next.js and Tailwind CSS.

## Features

- Interactive Yes/No buttons with dynamic responses
- Animated GIF transitions
- Video background animation
- Mobile responsive design
- Deployed on Vercel

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone this repository or navigate to the project folder
2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Deployment

This project is optimized for Vercel deployment.

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"

Environment variables will be automatically configured, and your site will be live!

## Customization

### Change the Name

Edit the text in `components/ValentineCard.tsx`:

```tsx
const [text, setText] = useState("will you be [YOUR NAME] valentine?❤️😘");
```

### Change the Social Media Link

Update the link in the `handleYesClick` function:

```tsx
href = "https://www.instagram.com/your-profile/";
```

### Change the Theme Colors

Edit `tailwind.config.js`:

```js
colors: {
  pink: {
    light: '#YOUR_COLOR',
    button: '#YOUR_COLOR',
  },
}
```

## Assets

All media files (GIFs, video, favicon) should be placed in the `public/resources/` directory.

## License

Feel free to use and modify for your own Valentine's invitation!

## Credits

- Heart animation video from Vecteezy
- GIFs from Tenor
- Favicon from Icon Archive
- Fonts from Google Fonts
