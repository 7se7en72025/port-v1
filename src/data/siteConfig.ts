/**
 * Every personal detail the portfolio renders lives here.
 *
 * Anything left as an empty string is treated as "not supplied yet" and is
 * skipped at render time, so the site never ships a dead link or a broken
 * image while you're still filling things in.
 */
export const siteConfig = {
  name: "NSA RAIYYAN",

  /**
   * Where the contact form posts, via formsubmit.co. Override with
   * NEXT_PUBLIC_CONTACT_EMAIL.
   *
   * `||`, not `??` — the var is declared-but-empty in .env.local, and `??` only
   * falls back on null/undefined. An empty string is a defined value, so `??`
   * handed the form a blank address and every message silently went nowhere.
   */
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "f20241312a@pilani.bits-pilani.ac.in",

  /** Cal.com link revealed by the "Book an intro call" flip button. */
  calBookingUrl: "",

  /** WonStepCareer — the product behind the WSC Private Limited co-founder line. */
  wscUrl: "https://wonstepcareer.com",

  resume: {
    /** Downloadable PDF. Drop the file in /public and point here. */
    pdf: "/resume.pdf",
    /** Page-one preview shown on /resume. Drop the image in /public and point here. */
    image: "/resume.png",
  },

  socials: {
    github: "https://github.com/7se7en72025",
    /** wa.me link — number in full international form, no "+" or spaces. */
    whatsapp: "https://wa.me/918247820120",
    twitter: "",
    linkedin: "https://www.linkedin.com/in/abdulla-raiyyan-4b81a2312/",
  },
} as const;

/** True once a resume PDF has been supplied — gates the /resume link and download. */
export const hasResume: boolean = Boolean(siteConfig.resume.pdf);
