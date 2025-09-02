// Shared editorial data for the magazine
export interface EditorialArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string; // Full article content in HTML
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const editorialArticles: EditorialArticle[] = [
  {
    id: "1",
    slug: "welcome-to-am-t",
    title: "Welcome to AM-T",
    subtitle: "Your premier destination for authentic streetwear trading",
    excerpt:
      "Discover the future of fashion trading with AM-T. Connect with a community of authentic streetwear enthusiasts, find rare pieces, and trade with confidence in a trusted marketplace.",
    content: `
      <h2>The Future of Streetwear Trading</h2>
      <p>Welcome to AM-T, the future of streetwear trading. We've created a platform where authenticity meets community, where rare finds meet passionate collectors, and where every trade tells a story.</p>
      
      <h2>More Than Just Trading</h2>
      <p>Unlike traditional e-commerce platforms, AM-T is built specifically for the streetwear community. We understand that every piece has a story, every trade is personal, and every connection matters.</p>
      
      <p>Our platform features sophisticated authentication processes, detailed item documentation, and a community-driven approach to building trust between traders. Every listing is verified, every user is vetted, and every transaction is protected.</p>
      
      <h2>A Community-First Approach</h2>
      <p>At AM-T, we believe that the best trades happen when people connect over shared passions. Our platform is designed to foster genuine relationships between traders, creating a community where knowledge is shared, rare finds are celebrated, and everyone benefits.</p>
      
      <p>Whether you're a seasoned collector looking for that one elusive piece, or a newcomer eager to start your streetwear journey, AM-T provides the tools, community, and security you need to trade with confidence.</p>
      
      <h2>Join the Movement</h2>
      <p>Ready to experience the future of streetwear trading? Join thousands of passionate traders who have already discovered what makes AM-T special. Create your profile, start building your digital closet, and connect with a community that shares your passion for authentic streetwear.</p>
      
      <p>Welcome to AM-T. Welcome to the future of trading.</p>
    `,
    image: "/amtlogo-static.png",
    category: "FEATURED",
    author: "AM-T Editorial",
    date: "August 3, 2025",
    readTime: "3 min read",
    tags: ["Welcome", "Platform", "Trading", "Community"],
  },
  {
    id: "2",
    slug: "exclusive-designer-interview",
    title: "Exclusive Designer Interview",
    subtitle: "Behind the scenes with emerging streetwear designers",
    excerpt:
      "Go behind the scenes with emerging streetwear designers and discover their creative processes, inspirations, and visions for the future of street fashion.",
    content: `
      <h2>The Creative Process</h2>
      <p>In this exclusive interview, we dive deep into the creative minds behind some of today's most sought-after streetwear pieces. Our featured designers share their inspirations, challenges, and what drives them to create authentic, culture-defining pieces.</p>
      
      <h2>From Concept to Culture</h2>
      <p>Discover how these visionary designers transform raw ideas into pieces that resonate with the streetwear community. We explore their design processes, from initial sketches to final production, and learn about the cultural influences that shape their work.</p>
      
      <p>Each designer brings a unique perspective to the streetwear landscape, whether it's through innovative materials, groundbreaking silhouettes, or powerful cultural statements. Their work represents the evolution of street fashion and its growing influence on mainstream culture.</p>
      
      <h2>Building Authentic Brands</h2>
      <p>Learn about the challenges of building authentic brands in today's competitive market. Our designers share insights on maintaining creative integrity while building sustainable businesses, and how they navigate the balance between artistic vision and commercial success.</p>
      
      <h2>The Future of Streetwear</h2>
      <p>What's next for streetwear? Our designers share their predictions for the industry's future, discussing emerging trends, sustainable practices, and the role of technology in fashion design and distribution.</p>
      
      <p>Their journeys prove that with passion, persistence, and authenticity, anyone can make their mark on the streetwear world. The future belongs to those bold enough to express their vision and dedicated enough to see it through.</p>
    `,
    image: "/amtlogo-static.png",
    category: "INTERVIEW",
    author: "AM-T Editorial",
    date: "August 3, 2025",
    readTime: "5 min read",
    tags: ["Interview", "Designer", "Behind the Scenes", "Creative Process"],
  },
  {
    id: "3",
    slug: "getting-started-guide",
    title: "Getting Started with AM-T",
    subtitle: "Everything you need to know to begin trading",
    excerpt: "Everything you need to know to begin trading on AM-T",
    content: `
      <h2>Welcome to the Trading Community</h2>
      <p>Starting your journey on AM-T is the first step toward connecting with a passionate community of streetwear enthusiasts. This comprehensive guide will walk you through everything you need to know to begin trading with confidence.</p>
      
      <h2>Setting Up Your Profile</h2>
      <p>Your profile is your digital identity in the AM-T community. Take time to create a compelling profile that showcases your style and builds trust with other traders. Upload clear photos, write an engaging bio, and highlight your trading interests.</p>
      
      <h2>Understanding Authentication</h2>
      <p>Authentication is at the heart of AM-T. Learn about our verification processes, documentation requirements, and how to spot authentic pieces. We provide detailed guides and resources to help you become an expert authenticator.</p>
      
      <h2>Making Your First Trade</h2>
      <p>Ready to make your first trade? We'll guide you through the process step by step, from browsing listings to completing successful transactions. Learn about our secure messaging system and trade protection policies.</p>
      
      <h2>Building Your Reputation</h2>
      <p>Your reputation is your most valuable asset on AM-T. Learn how to build trust through honest listings, clear communication, and positive interactions with the community.</p>
    `,
    image: "/amtlogo-static.png",
    category: "GUIDE",
    author: "AM-T Editorial",
    date: "August 2, 2025",
    readTime: "4 min read",
    tags: ["Guide", "Getting Started", "Trading"],
  },
];

// Get the latest articles (most recent first)
export function getLatestEditorials(limit = 3): EditorialArticle[] {
  return editorialArticles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

// Get articles by category
export function getEditorialsByCategory(category: string): EditorialArticle[] {
  return editorialArticles.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  );
}

// Get article by slug
export function getEditorialBySlug(slug: string): EditorialArticle | null {
  return editorialArticles.find((article) => article.slug === slug) || null;
}
