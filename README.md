📰 Personalized Content Dashboard
A fully responsive and interactive dashboard that fetches personalized content like news, trending articles, and social updates based on user preferences. Built as part of the Frontend SDE Intern Assignment using modern web technologies.


🚀 Features
✅ Personalized Feed (News, Recommendations)

✅ User Preferences via Settings Panel

✅ Infinite Scroll for Dynamic Content

✅ Favorite & Save Items for Later

✅ Fully Responsive Layout

✅ Dark Mode Toggle

✅ Smooth Animations with Framer Motion

✅ Search with Debounce Optimization

🧰 Tech Stack
Frontend: React.js, Next.js, TypeScript

Styling: Tailwind CSS, CSS Modules

State Management: Redux Toolkit, RTK Query

Animations: Framer Motion

Testing: React Testing Library, Jest

Mock APIs: News API, TMDB API (or placeholders)

⚙️ Setup Instructions
bash
Copy
Edit
# 1. Clone the repository
git clone https://github.com/beyondinfinity9988/Pgagi-internAssignment.git

# 2. Install dependencies
npm install

# 3. Create `.env.local` for your API keys (NewsAPI, TMDB, etc.)
# Example:
# NEXT_PUBLIC_NEWS_API_KEY=your_key_here

# 4. Run the app locally
npm run dev
App will be live at http://localhost:3000

🧪 Testing
Run all tests using:

bash
Copy
Edit
npm run test
You can also run E2E tests with:

bash
Copy
Edit
npx cypress open
📁 Folder Structure
bash
Copy
Edit
📦 /src
├── components        # Reusable UI components (Card, Feed, etc.)
├── features          # Redux slices and API logic
├── pages             # Next.js routing
├── styles            # Tailwind + custom styles
├── tests             # Unit & integration tests
└── utils             # Helper functions
📌 Functionality Highlights
User Preferences: Set and persist categories via Redux + localStorage

Favorites: Mark articles, see them under "Favorites"

Search: Works across all content, debounced for performance

Dark Mode: Toggle theme and save preference

Animations: Card transitions, section swipes, loaders

🔒 Environment Variables
Create a .env.local file in the root with:

NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_key

🌐 Live Demo
🔗 View Live Demo
(Optional: add video walkthrough if available)

👨‍💻 Author
Built with ❤️ by Your Name
📧 [mishravishal2123@gmail.com]
