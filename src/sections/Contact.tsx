import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "@/components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

type ToastState = "success" | "error" | null;
interface FormState { name: string; email: string; message: string; }

const SendIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/* ── Contact info items shown in the right panel ── */
const CONTACT_ITEMS = [
  {
    label: "Email",
    value: "kevinjiang64@hotmail.com",
    href: "mailto:kevinjiang64@hotmail.com",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kevin-jiang-6009",
    href: "https://www.linkedin.com/in/kevin-jiang-6009/",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/kevjiang64",
    href: "https://github.com/kevjiang64",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });

  useGSAP(
    () => {
      /* Panels slide up */
      gsap.utils.toArray<HTMLElement>(".contact-panel").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: { trigger: el, start: "top 84%" },
          }
        );
      });

      /* Contact info rows stagger in */
      gsap.utils.toArray<HTMLElement>(".contact-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 24 },
          {
            opacity: 1, x: 0, duration: 0.5, ease: "power3.out",
            delay: i * 0.12 + 0.3,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    },
    { scope: containerRef }
  );

  const showToast = (type: ToastState) => {
    setToast(type);
    setTimeout(() => setToast(null), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setForm({ name: "", email: "", message: "" });
      showToast("success");
    } catch {
      showToast("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding" ref={containerRef}>
      <div className="flex flex-col gap-16">
        <TitleHeader title="Get in Touch" sub="Let's Connect" />

        {/* Toast */}
        {toast && (
          <div
            role="alert"
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center
                        gap-3 px-5 py-3.5 rounded-xl border text-sm font-medium shadow-2xl
                        transition-all duration-300
                        ${toast === "success"
                          ? "bg-green-500/10 border-green-500/30 text-green-400"
                          : "bg-red-500/10 border-red-500/30 text-red-400"}`}
          >
            {toast === "success" ? <CheckIcon /> : <AlertIcon />}
            {toast === "success"
              ? "Message sent! I'll get back to you soon."
              : "Something went wrong. Please try again or reach out directly."}
            <button onClick={() => setToast(null)} className="ml-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" aria-label="Dismiss">×</button>
          </div>
        )}

        <div className="grid-12-cols">
          {/* Form */}
          <div className="contact-panel opacity-0 xl:col-span-5">
            <div className="card-border rounded-2xl p-8 md:p-10">
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="form-field">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder="John Smith" required />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
                </div>
                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="What's on your mind?" rows={5} required />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                             bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50
                             text-white text-sm font-semibold transition-all duration-200
                             cursor-pointer disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <><SendIcon /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Info panel */}
          <div className="contact-panel opacity-0 xl:col-span-7">
            <div className="card-border rounded-2xl p-8 md:p-10 h-full flex flex-col justify-between gap-10 relative overflow-hidden">
              {/* Background accent */}
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
                  transform: "translate(30%, -30%)",
                }}
                aria-hidden="true"
              />

              <div className="flex flex-col gap-4 relative z-10">
                <h3 className="text-2xl font-bold text-white">Let's work together</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                  Whether you have a project in mind, an open role, or just want to say hi —
                  my inbox is always open. I'll do my best to get back to you within 24 hours.
                </p>
              </div>

              <div className="flex flex-col gap-5 relative z-10">
                {CONTACT_ITEMS.map(({ label, value, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="contact-item opacity-0 flex items-center gap-4 group"
                  >
                    <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/[0.07]
                                     flex items-center justify-center text-zinc-400
                                     group-hover:border-indigo-500/40 group-hover:text-indigo-400
                                     transition-all duration-200">
                      {icon}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">{label}</span>
                      <span className="text-sm text-zinc-300 group-hover:text-white transition-colors duration-200">{value}</span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability badge */}
              <div className="relative z-10 flex items-center gap-2.5 pt-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                <span className="text-xs text-zinc-500 font-medium">Available for new opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
