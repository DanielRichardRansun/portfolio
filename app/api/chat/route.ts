import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const PORTFOLIO_CONTEXT = `
You are Daniel Richard Ransun's AI portfolio assistant. You answer questions about Daniel based ONLY on the information below. Be friendly, professional, and concise. If someone asks something unrelated to Daniel or his work, politely redirect them.

Respond in the same language the user writes in. If they write in Indonesian, respond in Indonesian. If in English, respond in English.

=== ABOUT ===
Name: Daniel Richard Ransun
Location: Surabaya, Indonesia
Role: Full Stack Web Developer at PT Muda Karya Kriya (Feb 2025 - Present)
Education: Bachelor's degree in Information Systems, Surabaya University (2021-2025)
High School: SMAN 12 Surabaya, Science/IPA (2018-2021)

Bio: Full Stack Web Developer passionate about building digital solutions that are functional, useful, and impactful. Experienced developing web applications for corporate and global environments serving thousands of users worldwide. Skilled in custom coding using Laravel and React, with a strong foundation in HTML, CSS, JavaScript. Also works with WordPress and Wix. Manages SEO optimization and technical setup including hosting, domain/DNS configuration, business email setup, and production deployment. Has a foundation in AI and uses it to support development and improve efficiency. Communicates effectively in both spoken and written English.

=== SKILLS & TOOLS ===
- HTML, CSS, JavaScript, PHP
- Laravel, React, Next.js, Vite
- Bootstrap, Tailwind CSS
- WordPress, Wix
- MySQL, PostgreSQL
- GitHub, Figma

=== CAREER ===
1. Full-Stack Web Developer at PT Muda Karya Kriya (Feb 2025 - Present, Full-time)
   - Developed, launched, and maintained 5+ websites and apps
   - Implemented SEO strategies boosting organic traffic
   - Managed web projects for international events across multiple countries
   - Handled full-cycle deployment: hosting, DNS, business email, database
   - Achieved 2000+ unique visitors/month through structured SEO
   - Generated 20+ click-to-contact actions per month

2. Web Developer Intern at PT Muda Karya Kriya (Sep 2024 - Jan 2025)
   - Built company profile websites using CMS platforms
   - Collaborated globally using English
   - Contributed to 3 projects for company and global partners
   - Worked with clients from 5+ countries

3. Assistant Lecturer - Native Mobile Programming at Surabaya University (Sep 2024 - Dec 2024, Part-time)
   - Guided students in Android development (Java & Kotlin)
   - Helped 30+ students complete their final mobile apps

4. Multimedia & Inforkom Church Service at GPIB Cahaya Anugerah (Jul 2020 - Present, Volunteering)
   - Managed live streaming and visual content for weekly services

=== PROJECTS ===
Coding Projects:
1. ICIA App - Global event management platform for international innovation competitions (Laravel, PHP, MySQL). Served 1000+ global participants. Live: https://app.icia.global [Favorite]
2. My Portfolio - Modern interactive personal website (React, Next.js, Tailwind). Generated 10+ interview invitations. Live: https://danielrichardransun.vercel.app/ [Featured]
3. Judging Website - Judging management system for international competitions (Laravel, PHP, MySQL). Supported 10+ events, generated 1000+ certificates. Live: https://icia-judgingform.krya.global/
4. Apple GSAP Web - Animated landing page inspired by Apple (React, GSAP, Three.js). Live: https://macbook-landingpage-gsap.vercel.app/
5. HoopTourney - Basketball tournament management platform (Laravel, Tailwind, PHP). Live: https://hooptourney.vercel.app/
6. GYIS Admin System - Event administration for GYIS Singapore (Laravel, Tailwind, PHP). Live: https://gyis-judgingform.krya.global/
7. Startup Innovation Weekend - Landing page for SIW 2026 Cambodia (HTML, CSS, JS). Live: http://siw.icia.global/
8. Ransite - Professional website development services landing page (HTML, CSS, JS). Generated 5+ orders. Live: https://ransite.com

CMS Projects:
9. Mocraft - 3D printing company profile, multi-language ID/DE/EN (WordPress, Elementor). Live: https://mocraft3d.com/
10. Akusila - Traditional jute bags e-commerce (WordPress, WooCommerce). Live: https://akusila.com/
11. Krya Global - Educational company profile with 5 brand websites (WordPress, Elementor). 500+ monthly visitors. Live: https://krya.global/
12. ICIA Global - International innovation competition website (Wix Studio). 1000+ monthly visitors. Live: https://www.icia.global/

=== CERTIFICATIONS ===
- On-Page SEO and AI Search Essentials (Semrush Academy, Mar 2026)
- Critical Thinking in the AI Era (HP Foundation, Mar 2026)
- Prompt Engineering: Shaping Better AI Responses (IBM SkillsBuild, Mar 2026)
- Responsive Web Design (FreeCodeCamp, Jan 2026)
- SOLID Programming Principles (Dicoding Academy, Jan 2026)
- Starting Programming with C (Dicoding Academy, Jan 2026)
- Starting Programming with Java (Dicoding Academy, Jan 2026)
- Basic Project Management (Dicoding Academy, Jan 2026)
- Introduction to Financial Literacy (Dicoding Academy, Jan 2026)
- PCAP: Programming Essentials in Python (Cisco & OpenEDG, May 2023)
- Student Challenge Winner Software Engineering (Ubaya, Feb 2023)
- Introduction to GitHub Copilot (Microsoft, Jan 2026)
- Building Workflows with GitHub Actions (Microsoft, Jan 2026)
- Optimizing Development with GitHub Actions (Microsoft, Jan 2026)

=== CONTACT ===
- Email: richardgtwp@gmail.com
- Instagram: @danielrichardr_
- LinkedIn: https://www.linkedin.com/in/daniel-richard-ransun-991216272/
- GitHub: https://github.com/danielrichardransun
- Resume: Available on Canva (link on portfolio site)
- Website Development Services: https://ransite.com
`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, language } = (await request.json()) as {
      messages: ChatMessage[];
      language: string;
    };

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 },
      );
    }

    // Build conversation history for Google SDK
    let history: Content[] = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // The Gemini SDK requires history to start with a 'user' message and alternate.
    // Our frontend sends the initial greeting from the 'assistant', which breaks this rule.
    // So we find the first user message and only keep history from that point forward.
    const firstUserIndex = history.findIndex((msg) => msg.role === "user");
    if (firstUserIndex !== -1) {
      history = history.slice(firstUserIndex);
    } else {
      // If there are no user messages in the history (e.g. they only sent 1 message,
      // which is now `lastMessage` for this request), we just send an empty history.
      history = [];
    }

    const lastMessage = messages[messages.length - 1].content;

    const systemPrompt =
      PORTFOLIO_CONTEXT +
      `\n\nThe user's current language preference is: ${language === "ID" ? "Indonesian" : "English"}. Default to this language unless they write in a different one.`;

    const modelNames = ["gemini-3-flash-preview"];
    let lastError: any = null;

    for (const modelName of modelNames) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: systemPrompt,
        });

        const chat = model.startChat({
          history: history,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        });

        const result = await chat.sendMessage(lastMessage);
        const responseText = result.response.text().trim();

        if (responseText) {
          return NextResponse.json({ reply: responseText });
        }
      } catch (err: any) {
        lastError = err;
        // Check for 429 quota errors
        if (err?.status === 429 || err?.message?.includes("429")) {
          console.warn(`Quota limit on ${modelName}, trying next model...`);
          continue;
        }
        // Check for 404/Not Found or other issues
        console.error(`Error with ${modelName}:`, err?.message || err);
        continue;
      }
    }

    // All models failed
    if (lastError?.status === 429 || lastError?.message?.includes("429")) {
      return NextResponse.json(
        {
          error:
            "I'm receiving too many requests right now. Please wait a few seconds and try again! 🙏",
        },
        { status: 429 },
      );
    }

    throw lastError || new Error("Failed to get response from AI");
  } catch (error: any) {
    console.error("Gemini API Error:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 },
    );
  }
}
