import { GoogleGenAI } from '@google/genai';

let aiClient = null;

function getAiClient() {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are Daniyal Khan's AI Assistant & Full-Stack Code Mentor on his official portfolio website.
Daniyal Khan is an expert Full-Stack Software Engineer specializing in:
- Backend: C#, ASP.NET Core MVC, Web API, Entity Framework Core, LINQ
- Database: Microsoft SQL Server, SSMS, Database Design, SQL Queries, Stored Procedures
- Frontend: HTML5, CSS3, Modern JavaScript (ES6+), React.js, Bootstrap 5, Tailwind CSS
- Cloud & Tools: Git/GitHub, Azure, Docker, Postman, Visual Studio

Your responsibilities:
1. Help visitors and students learn web development, frontend (HTML5/CSS3/JavaScript), backend (C#/.NET Core), and SQL Server.
2. Provide clean, well-formatted, concise code snippets and clear explanations.
3. Recommend Daniyal's free courses (HTML5, CSS3, JavaScript) and premium masterclasses (C#, ASP.NET Core, SQL Server, EF Core).
4. Guide clients looking to hire Daniyal for custom web apps, e-commerce, or enterprise software solutions.
5. Answer questions politely in English or Urdu/Roman Urdu if the user asks in Urdu.
6. Keep responses engaging, structured, and helpful.`;

export async function askDaniyalAI(userMessage, history = []) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      // Fallback knowledge response if API key is not yet configured in environment
      return generateFallbackResponse(userMessage);
    }

    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95
      }
    });

    return response.text || 'I am Daniyal Khan\'s AI Mentor. How can I assist you with code or courses today?';
  } catch (error) {
    console.error('Gemini AI Assistant Error:', error);
    return generateFallbackResponse(userMessage);
  }
}

function generateFallbackResponse(query) {
  const q = (query || '').toLowerCase();
  if (q.includes('html') || q.includes('css')) {
    return `### HTML5 & CSS3 Overview\n\nDaniyal offers a **100% Free HTML5 & CSS3 Masterclass** on this portfolio!\n- **HTML5:** Semantic architecture (\`<header>\`, \`<main>\`, \`<section>\`, \`<article>\`), forms & SEO metadata.\n- **CSS3:** Flexbox, CSS Grid 2D layouts, Keyframe Animations, & Responsive Media Queries.\n\nYou can click **Read & Learn Free** in the Courses section above to inspect live code and download starter packs!`;
  }
  if (q.includes('c#') || q.includes('.net') || q.includes('asp')) {
    return `### .NET & C# Enterprise Engineering\n\nDaniyal Khan specializes in building robust enterprise architectures with **C# & ASP.NET Core MVC/Web APIs**:\n- Entity Framework Core with Code-First and Database-First migrations\n- Repository Pattern, Dependency Injection, & JWT Security\n- High-performance SQL Server query optimization\n\nCheck out the **C# & ASP.NET Core Masterclass** in the Courses section to enroll!`;
  }
  if (q.includes('sql') || q.includes('database') || q.includes('ssms')) {
    return `### SQL Server & Database Architecture\n\nDaniyal Khan designs enterprise-grade relational schemas using **Microsoft SQL Server (SSMS)**:\n- Normalized relational models (1NF to 3NF)\n- Stored procedures, triggers, indexes, and ACID transactions\n- Entity Framework Core synchronization with \`PortfolioDB\`\n\nYou can enroll in the **SQL Server & Database Masterclass** to master advanced database design!`;
  }
  if (q.includes('contact') || q.includes('whatsapp') || q.includes('hire')) {
    return `### Connect with Daniyal Khan\n\n- **WhatsApp / Phone:** [+92 318 2315238](https://wa.me/923182315238)\n- **Email:** inoxentdani09@gmail.com\n- **Location:** Karachi, Pakistan\n\nYou can also submit the Contact Form below or use the green WhatsApp button on the bottom corner!`;
  }
  return `### Hello! I am Daniyal's AI Assistant & Code Mentor\n\nI can help you with:\n1. **Coding Help:** HTML5, CSS3, JavaScript, C#, ASP.NET Core, & SQL Server.\n2. **Free Courses:** Access free learning modules and download full source code packages.\n3. **Custom Projects:** Guidance on web apps, e-commerce, and software development.\n\nWhat would you like to build or learn today?`;
}
