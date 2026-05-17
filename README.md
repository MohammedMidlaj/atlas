# Atlas

Atlas is a personal travel memory archive built with Next.js 16 and TypeScript. It combines an interactive world map, travel memories, wishlist destinations, and simple usage statistics into a calm journal-style interface.

## Features

- **Home dashboard** with quick access to recent memories, wishlist preview, and travel stats.
- **Interactive world map** with visited and wishlist countries.
- **Memories journal** with cards for each travel memory.
- **Memory management** including view, edit, and delete actions.
- **Wishlist page** for future destinations.
- **Public profile page** with travel highlights and featured memories.
- Built using **Next.js App Router**, **Tailwind CSS**, and **React**.

## Project Structure

- `app/` — Next.js application routes and layout.
- `components/` — UI components for the map, memories, layout, and shared controls.
- `contexts/` — client state providers for memories and countries.
- `lib/` — data definitions, mock content, and helper utilities.
- `public/` — static assets used by the app.

## Getting Started

### Requirements

- Node.js 20+ recommended
- npm, yarn, or pnpm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Routes

- `/` — Home dashboard
- `/map` — Interactive world map view
- `/memories` — Memory journal listing
- `/memories/new` — Add a new memory
- `/memories/[id]` — Memory detail view
- `/memories/[id]/edit` — Edit a memory
- `/wishlist` — Travel wishlist
- `/profile/[username]` — Public profile view

## Built With

- [Next.js](https://nextjs.org/) 16.2.5
- [React](https://reactjs.org/) 19.2.4
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [D3 Geo](https://github.com/d3/d3-geo) and [topojson-client](https://github.com/topojson/topojson) for map rendering
- [Framer Motion](https://www.framer.com/motion/) for animation support

## Notes

This project currently uses in-memory/mock data from `lib/data/`. You can extend it with a backend or database to persist user memories and wishlist items.

## License

This repository is private by default and does not include a license file.
