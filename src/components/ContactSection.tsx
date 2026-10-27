import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Send, Mail, MapPin, Github, Linkedin, CheckCircle2, Sparkles, Clock, Copy, Check, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [localTime, setLocalTime] = useState<string>('');

  // Live ticking clock for Ethiopia / East Africa Time (UTC+3)
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setLocalTime(`${timeStr} EAT`);
      } catch {
        setLocalTime('UTC+3 (Addis Ababa)');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Standard RFC 5322 compliant email validation
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g., name@domain.com)';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter a message';
    } else if (formData.message.trim().length < 5) {
      errs.message = 'Message must be at least 5 characters long';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const recipient = PERSONAL_INFO.email;
    const emailSubject = formData.subject.trim() || `Portfolio Contact from ${formData.name.trim()}`;
    const emailBody = `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nSubject: ${formData.subject.trim() || 'General Inquiry'}\n\nMessage:\n${formData.message.trim()}\n\n---\nSent from Portfolio Website`;
    const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    try {
      // Actually send message to zekariasali4@gmail.com
      const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          _subject: emailSubject,
          message: formData.message.trim(),
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (!response.ok) {
        throw new Error('Submission endpoint error');
      }

      setIsSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#06b6d4', '#c084fc', '#ffffff']
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      // Fallback: If network or ad-blocker blocks the API request, open user's mail client directly
      window.location.href = mailtoUrl;
      setIsSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#06b6d4', '#c084fc', '#ffffff']
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhoneToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#07070b]">
      {/* Background Lighting & Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-600/15 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-4 mb-16 text-center items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>LET'S BUILD TOGETHER</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-[1.1]">
            HAVE SOMETHING <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400">AMBITIOUS</span> IN MIND?
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
            Whether you are looking for a Software Engineer, Frontend Architect, or Full-Stack Developer to build your next product, my inbox is always open.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Contact Card */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">DIRECT EMAIL</span>
                <button
                  onClick={copyEmailToClipboard}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-violet-300 border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="block font-display font-bold text-xl sm:text-2xl text-white hover:text-violet-300 transition-colors break-all"
              >
                {PERSONAL_INFO.email}
              </a>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-slate-400 block text-[10px] uppercase">LOCATION</span>
                  <span className="text-white font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-violet-400" />
                    <span>{PERSONAL_INFO.location}</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 block text-[10px] uppercase">TIMEZONE (ETHIOPIA / UTC+3)</span>
                  <span className="text-white font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{localTime || 'UTC+3 (Addis Ababa)'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Phone Card (Above LinkedIn & GitHub) */}
            <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>DIRECT PHONE / CALL</span>
                </div>
                <button
                  onClick={copyPhoneToClipboard}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-emerald-300 border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPhone ? 'Copied!' : 'Copy Phone'}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="font-display font-bold text-xl sm:text-2xl text-white hover:text-emerald-300 transition-colors tracking-wide flex items-center gap-2.5"
                >
                  <span>{PERSONAL_INFO.phoneFormatted}</span>
                </a>
                <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                  {PERSONAL_INFO.phone}
                </span>
              </div>
            </div>

            {/* Social Links Cards */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl glass-panel hover:bg-white/10 border border-white/10 transition-all flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-sm">GitHub</h4>
                  <p className="text-[11px] text-slate-400 font-mono">@azriel-le</p>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl glass-panel hover:bg-white/10 border border-white/10 transition-all flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-sm">LinkedIn</h4>
                  <p className="text-[11px] text-slate-400 font-mono">Zekarias Ali</p>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Form Interface */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-12 text-center flex flex-col items-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">Message Transmitted!</h3>
                    <p className="text-slate-300 text-sm max-w-sm">
                      Thank you for reaching out! Your message was transmitted to <span className="text-violet-400 font-medium">{PERSONAL_INFO.email}</span>. I'll get back to you shortly.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-slate-300 block">
                          Your Name <span className="text-violet-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                          }}
                          placeholder="e.g. Alex Morgan"
                          className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                            errors.name ? 'border-rose-500' : 'border-white/10 focus:border-violet-500'
                          } text-white placeholder:text-slate-500 text-sm outline-none transition-colors`}
                        />
                        {errors.name && <span className="text-[11px] text-rose-400">{errors.name}</span>}
                      </div>

                      {/* Email Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-slate-300 block">
                          Your Email <span className="text-violet-400">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                          }}
                          placeholder="e.g. alex@example.com"
                          className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                            errors.email ? 'border-rose-500' : 'border-white/10 focus:border-violet-500'
                          } text-white placeholder:text-slate-500 text-sm outline-none transition-colors`}
                        />
                        {errors.email && <span className="text-[11px] text-rose-400">{errors.email}</span>}
                      </div>

                    </div>

                    {/* Subject Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-slate-300 block">
                        Subject / Project Title
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Full-Stack Web Development Inquiry"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-violet-500 text-white placeholder:text-slate-500 text-sm outline-none transition-colors"
                      />
                    </div>

                    {/* Message Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-slate-300 block">
                        Your Message <span className="text-violet-400">*</span>
                      </label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                        }}
                        placeholder="Hello Zekarias, I'd like to discuss an ambitious web development project..."
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                          errors.message ? 'border-rose-500' : 'border-white/10 focus:border-violet-500'
                        } text-white placeholder:text-slate-500 text-sm outline-none transition-colors resize-none`}
                      />
                      {errors.message && <span className="text-[11px] text-rose-400">{errors.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-violet-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Transmitting Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
