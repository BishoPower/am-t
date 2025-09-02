# How to Add New Editorials

Adding a new editorial is now **super easy**! Just edit one file: `src/lib/editorial-data.ts`

## 📝 Quick Steps:

1. Open `src/lib/editorial-data.ts`
2. Add a new object to the `editorialArticles` array
3. Save the file - that's it!

## ✨ Template for New Articles:

Copy this template and fill in your content:

```typescript
{
  id: "4", // Increment from the last ID
  slug: "your-article-slug", // URL-friendly, no spaces, use hyphens
  title: "Your Article Title",
  subtitle: "A compelling subtitle that draws readers in",
  excerpt: "A brief preview of what this article covers (shown in previews and search)",
  content: `
    <h2>Your First Section</h2>
    <p>Your first paragraph goes here. You can write as much as you want.</p>

    <h2>Another Section</h2>
    <p>Another paragraph with more content.</p>

    <p>You can add multiple paragraphs in each section.</p>

    <h2>Final Thoughts</h2>
    <p>Wrap up your article with final thoughts or a call to action.</p>
  `,
  image: "/amtlogo-static.png", // Or path to your custom image
  category: "FEATURED", // Options: FEATURED, INTERVIEW, GUIDE, NEWS, REVIEW, etc.
  author: "AM-T Editorial",
  date: "August 4, 2025", // Use today's date to appear first in carousel
  readTime: "5 min read", // Estimate based on content length
  tags: ["Tag1", "Tag2", "Tag3"], // Relevant tags for the article
},
```

## 🎯 Pro Tips:

- **Use today's date** to make articles appear first in the carousel
- **Keep slugs unique** and URL-friendly (no spaces, use hyphens)
- **Use `<h2>` for sections** and `<p>` for paragraphs
- **Categories**: FEATURED, INTERVIEW, GUIDE, NEWS, REVIEW, TREND
- **Tags**: Help with search and categorization

## 🔄 What Happens Automatically:

When you add a new article to the array:

- ✅ It appears in the front page carousel (if it's one of the latest 3)
- ✅ It shows up in the editorial section
- ✅ The article page is automatically created
- ✅ Like/comment functionality works
- ✅ Related articles are updated
- ✅ Search and filtering include it

## 📊 Content Guidelines:

- **Title**: Clear and engaging (keep under 60 characters)
- **Subtitle**: Expand on the title (keep under 120 characters)
- **Excerpt**: 1-2 sentences for previews (keep under 200 characters)
- **Content**: Use HTML formatting with `<h2>` and `<p>` tags
- **Read Time**: Estimate ~200 words per minute

That's it! No need to edit multiple files or complicated setup. Just add your article to the array and everything works automatically! 🚀
