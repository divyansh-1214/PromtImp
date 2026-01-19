import { useState, useEffect } from "react";
import {
  Sparkles,
  Zap,
  Layout,
  History,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Copy,
  BrainCircuit,
} from "lucide-react";

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Interactive Demo State
  const [demoInput, setDemoInput] = useState("Write code for a snake game");
  const [demoOutput, setDemoOutput] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [hasOptimized, setHasOptimized] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setDemoOutput(`Act as a Senior Python Developer. Create a fully functional Snake game using the Pygame library.
          Requirements:
          1. Initialize the game window with a resolution of 800x600.
          2. Implement snake movement logic (up, down, left, right) controlled by arrow keys.
          3. Include a scoring system that updates when the snake eats food.
          4. Add collision detection for walls and the snake's own tail.
          5. Code should be modular, commented, and follow PEP 8 standards.`);
      setIsOptimizing(false);
      setHasOptimized(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Promtizer
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Testimonials
              </a>
              <button className="text-sm font-medium px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all">
                Log In
              </button>
              <button className="text-sm font-medium px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-white/10 p-4 space-y-4">
            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-300"
            >
              Features
            </a>
            <a
              href="#testimonials"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-300"
            >
              Testimonials
            </a>
            <button className="w-full py-3 bg-indigo-600 rounded-lg font-medium">
              Get Started Free
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wide">
                Promtizer AI 2.0 Now Live
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Turn Vague Ideas into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Perfect AI Prompts
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Stop fighting with bad outputs. Promtizer transforms unclear,
              overloaded instructions into structured, high-conversion prompts
              engineered for accuracy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-white shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center group">
                Optimize Your First Prompt
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold text-white border border-slate-700 transition-all">
                View Demo
              </button>
            </div>
          </div>

          {/* Interactive Demo Component */}
          <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center border-b border-white/10 bg-slate-900/80 px-4 py-3">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="text-xs font-mono text-slate-500">
                Promtizer Engine v2.1
              </div>
            </div>

            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {/* Input Side */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                    Your Raw Idea
                  </label>
                  <span className="text-xs text-red-400 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" /> Weak Context
                  </span>
                </div>
                <textarea
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  className="w-full h-48 bg-slate-950 border border-slate-800 rounded-lg p-4 text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
                <button
                  onClick={handleOptimize}
                  disabled={isOptimizing}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium text-sm transition-all flex items-center justify-center"
                >
                  {isOptimizing ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />{" "}
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 text-indigo-400" />{" "}
                      Enhance Prompt
                    </>
                  )}
                </button>
              </div>

              {/* Output Side */}
              <div className="p-6 space-y-4 bg-slate-900/30">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                    Optimized Output
                  </label>
                  {hasOptimized && (
                    <span className="text-xs text-green-400 flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> High Fidelity
                    </span>
                  )}
                </div>
                <div
                  className={`w-full h-48 rounded-lg p-4 text-sm font-mono overflow-y-auto transition-all ${hasOptimized ? "bg-indigo-900/10 border border-indigo-500/30 text-indigo-100" : "bg-slate-950/50 border border-dashed border-slate-800 text-slate-600 flex items-center justify-center"}`}
                >
                  {hasOptimized ? (
                    <div className="whitespace-pre-wrap">{demoOutput}</div>
                  ) : (
                    <span>Waiting for optimization...</span>
                  )}
                </div>
                <div className="flex justify-end">
                  <button className="text-xs flex items-center text-slate-500 hover:text-white transition-colors">
                    <Copy className="w-3 h-3 mr-1" /> Copy to Clipboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Purple Problem Section */}
      <section
        id="problem"
        className="py-24 bg-slate-950 relative overflow-hidden"
      >
        {/* Decorative elements representing confusion */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
                The Invisible Barrier
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Are you suffering from the <br />
                <span className="text-purple-400">"Purple Problem"?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                The Purple Problem is the gap between your intent and the AI's
                understanding. It occurs when prompts are vague, unstructured,
                or overloaded with conflicting instructions.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Inconsistent, hallucinatory responses",
                  "Hours wasted tweaking words without results",
                  "Generic outputs that lack depth",
                  "AI forgetting context mid-conversation",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-slate-300">
                    <AlertCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-indigo-400 font-medium border-l-2 border-indigo-500 pl-4">
                Promtizer acts as the translation layer, structuring your intent
                so the AI understands you perfectly the first time.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl blur-2xl opacity-20 transform rotate-3"></div>
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 relative shadow-2xl">
                <div className="space-y-6">
                  {/* Bad Prompt Example */}
                  <div className="bg-purple-900/10 border border-purple-500/20 p-4 rounded-lg">
                    <div className="text-xs font-bold text-purple-400 mb-2 uppercase">
                      The Problem (Unclear)
                    </div>
                    <p className="text-slate-400 text-sm line-through decoration-purple-500/50">
                      "Write a blog post about marketing."
                    </p>
                    <div className="mt-2 text-xs text-purple-300/70 italic">
                      Result: Generic, boring, lacks target audience...
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="bg-slate-800 p-2 rounded-full border border-slate-700">
                      <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>

                  {/* Good Prompt Example */}
                  <div className="bg-indigo-900/10 border border-indigo-500/20 p-4 rounded-lg">
                    <div className="text-xs font-bold text-indigo-400 mb-2 uppercase">
                      The Promtizer Fix
                    </div>
                    <p className="text-indigo-100 text-sm">
                      "Act as a Content Marketing Strategist. Write a 1,500-word
                      comprehensive guide on B2B SaaS marketing trends for 2024.
                      Tone: Professional yet conversational. Focus on AI-driven
                      personalization."
                    </p>
                    <div className="mt-2 text-xs text-indigo-300/70 italic">
                      Result: Targeted, authoritative, ready to publish.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="py-24 bg-slate-900/50 border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything you need to master Prompt Engineering
            </h2>
            <p className="text-slate-400">
              Promtizer isn't just a rewriter; it's a complete suite for
              optimizing your interaction with Large Language Models.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="w-6 h-6 text-indigo-400" />}
              title="Intelligent Prompt Improver"
              description="Instantly rewrites raw, messy thoughts into structured instructions using proven prompt engineering frameworks (Chain-of-Thought, RTF)."
              benefit="Save 15 minutes of rewriting per prompt."
            />
            <FeatureCard
              icon={<BrainCircuit className="w-6 h-6 text-pink-400" />}
              title="Use-Case Context Engine"
              description="Tailored enhancement modes for Coding, Creative Writing, Academic Learning, and Business Strategy."
              benefit="Get domain-specific accuracy."
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6 text-cyan-400" />}
              title="Clarity Quality Score"
              description="Get a 0-100 score on your prompt's clarity, specificity, and contextual depth before you send it to ChatGPT or Claude."
              benefit="Eliminate ambiguity errors."
            />
            <FeatureCard
              icon={<Layout className="w-6 h-6 text-emerald-400" />}
              title="Multi-Variation Generator"
              description="Generate 3 versions of the same prompt: Concise (for quick answers), Detailed (for complex tasks), and Step-by-Step."
              benefit="Choose the right depth for the job."
            />
            <FeatureCard
              icon={<History className="w-6 h-6 text-amber-400" />}
              title="Smart Library & History"
              description="Save your best prompts. Create variables like {{Topic}} or {{Language}} to reuse high-performing structures instantly."
              benefit="Build a personal asset library."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-white" />}
              title="Keyboard-First UI"
              description="Designed for speed. Shortcuts for everything. Dark mode default. No clutter, just pure productivity."
              benefit="Flow state for power users."
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Comparison */}
      <section id="testimonials" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 border border-white/5 relative overflow-hidden mb-20">
            <div className="relative z-10 text-center">
              <h3 className="text-2xl font-bold mb-6">
                "It's like Grammarly, but for AI Prompts"
              </h3>
              <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                Just as spellcheckers fix your writing, Promtizer fixes your
                logic and structure before it hits the AI model.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="text-2xl font-bold text-white mb-1">2.5h</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wide">
                    Saved Daily
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="text-2xl font-bold text-white mb-1">40%</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wide">
                    Better Code
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="text-2xl font-bold text-white mb-1">10k+</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wide">
                    Prompts Fixed
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="text-2xl font-bold text-white mb-1">5/5</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wide">
                    User Rating
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="I used to spend 20 minutes going back and forth with ChatGPT to get the right code snippet. With Promtizer, I get it on the first try."
              author="Sarah Jenkins"
              role="Senior Frontend Dev"
            />
            <TestimonialCard
              quote="The 'Purple Problem' is real. My team was getting inconsistent results until we mandated Promtizer. Now our output is standardized."
              author="Marcus Chen"
              role="Content Director"
            />
            <TestimonialCard
              quote="The multi-variation feature is a game changer. I can instantly switch between a summary prompt and a deep-dive analysis prompt."
              author="Elena Rodriguez"
              role="PhD Researcher"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/20" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-slate-950 to-transparent" />

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to fix your prompts?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Join 10,000+ creators, developers, and thinkers producing higher
            quality AI outputs today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-indigo-900 hover:bg-slate-100 rounded-xl font-bold text-lg shadow-xl shadow-white/10 transition-all w-full sm:w-auto">
              Get Started for Free
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 rounded-xl font-semibold text-lg text-white transition-all w-full sm:w-auto">
              View Pricing
            </button>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            No credit card required. Free plan available.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <span className="text-lg font-bold text-white">Promtizer</span>
              </div>
              <p className="text-slate-400 text-sm">
                Optimizing the world's interaction with Artificial Intelligence.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="hover:text-white cursor-pointer">Features</li>
                <li className="hover:text-white cursor-pointer">
                  Integrations
                </li>
                <li className="hover:text-white cursor-pointer">Pricing</li>
                <li className="hover:text-white cursor-pointer">Changelog</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="hover:text-white cursor-pointer">
                  Prompt Guide
                </li>
                <li className="hover:text-white cursor-pointer">
                  API Documentation
                </li>
                <li className="hover:text-white cursor-pointer">Community</li>
                <li className="hover:text-white cursor-pointer">Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="hover:text-white cursor-pointer">About</li>
                <li className="hover:text-white cursor-pointer">Careers</li>
                <li className="hover:text-white cursor-pointer">
                  Contact Support
                </li>
                <li className="hover:text-white cursor-pointer">
                  Privacy Policy
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">
              © 2024 Promtizer Inc. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {/* Social placeholders */}
              <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-slate-700 cursor-pointer transition-colors" />
              <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-slate-700 cursor-pointer transition-colors" />
              <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-slate-700 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Sub-components

const FeatureCard = ({ icon, title, description, benefit }) => (
  <div className="bg-slate-800/50 hover:bg-slate-800 border border-white/5 hover:border-indigo-500/30 p-6 rounded-2xl transition-all duration-300 group">
    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/5">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm mb-4 leading-relaxed">{description}</p>
    <div className="flex items-center text-xs font-semibold text-indigo-400">
      <CheckCircle2 className="w-3 h-3 mr-1.5" />
      {benefit}
    </div>
  </div>
);

const TestimonialCard = ({ quote, author, role }) => (
  <div className="bg-slate-900 p-6 rounded-2xl border border-white/5">
    <div className="flex text-amber-400 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="text-slate-300 mb-6 italic">"{quote}"</p>
    <div className="flex items-center">
      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3">
        {author.charAt(0)}
      </div>
      <div>
        <div className="text-white font-semibold text-sm">{author}</div>
        <div className="text-slate-500 text-xs">{role}</div>
      </div>
    </div>
  </div>
);

export default Landing;
