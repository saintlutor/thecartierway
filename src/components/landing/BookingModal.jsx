import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Phone, MessageCircle, CheckCircle2, Loader2 } from "lucide-react";
const SUPABASE_FUNCTION_URL = "https://vzvpmkxpjphpaehzlckd.supabase.co/functions/v1/book-strategy-call";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s\-().]{6,}$/;

function validateStep1(form, contactMethod) {
  if (!contactMethod) return "Please select a contact method.";
  if (!form.full_name.trim()) return "Full name is required.";
  const parts = form.full_name.trim().split(/\s+/);
  if (parts.length < 2 || parts.some(p => p.length < 2)) return "Please enter your first and last name.";
  if (/\d/.test(form.full_name)) return "Name should not contain numbers.";
  if (!form.email.trim()) return "Email is required.";
  if (!EMAIL_RE.test(form.email)) return "Please enter a valid email address.";
  if (contactMethod === "phone" && !PHONE_RE.test(form.phone)) return "Please enter a valid phone number.";
  if (contactMethod === "snapchat" && !form.snapchat_username.trim()) return "Snapchat username is required.";
  if (!form.country) return "Please select your country.";
  return null;
}

function validateStep2(form) {
  if (!form.preferred_date) return "Please select a date.";
  const d = new Date(form.preferred_date);
  const today = new Date(); today.setHours(0,0,0,0);
  if (d < today) return "Please select a future date.";
  if (!form.preferred_time) return "Please select a time.";
  return null;
}
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const planNames = { standard: "Standard Plan", pro: "Pro Plan", ultimate: "Ultimate Plan" };

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM",
];

export default function BookingModal({ isOpen, onClose, selectedPlan }) {
  const [step, setStep] = useState(1);
  const [contactMethod, setContactMethod] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", snapchat_username: "",
    preferred_date: "", preferred_time: "", country: "",
    experience_level: "", goals: "", questions: "",
  });
  const openTimeRef = useRef(null);
  const honeypotRef = useRef("");

  // Record when modal opens for time gate
  useEffect(() => {
    if (isOpen) openTimeRef.current = Date.now();
  }, [isOpen]);

  const update = (field, value) => { setError(null); setForm((prev) => ({ ...prev, [field]: value })); };

  const handleStep1Next = () => {
    const err = validateStep1(form, contactMethod);
    if (err) { setError(err); return; }
    setError(null);
    setStep(2);
  };

  const handleStep2Next = () => {
    const err = validateStep2(form);
    if (err) { setError(err); return; }
    setError(null);
    setStep(3);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          email: form.email.toLowerCase().trim(),
          full_name: form.full_name.trim(),
          selected_plan: selectedPlan,
          contact_method: contactMethod,
          _hp: honeypotRef.current,       // honeypot
          _t: openTimeRef.current,        // form open timestamp
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setIsConfirmed(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStep(1);
    setContactMethod(null);
    setError(null);
    setIsConfirmed(false);
    setForm({
      full_name: "", email: "", phone: "", snapchat_username: "",
      preferred_date: "", preferred_time: "", country: "",
      experience_level: "", goals: "", questions: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && reset()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Book Your Strategy Call</h3>
              <p className="text-sm font-medium mt-0.5" style={{ color: "#0076DF" }}>
                {planNames[selectedPlan] || "Select a plan"}
              </p>
            </div>
            <button onClick={reset} className="text-gray-300 hover:text-gray-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {isConfirmed ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(0,118,223,0.08)" }}>
                <CheckCircle2 className="w-8 h-8" style={{ color: "#0076DF" }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your Call Is Booked!</h3>
              <p className="text-gray-400 text-sm mb-2">
                Your Cartier strategy call has been confirmed.
              </p>
              {form.preferred_date && form.preferred_time && (
                <p className="text-sm text-gray-600 font-medium mb-1">
                  {form.preferred_date} at {form.preferred_time} GMT
                </p>
              )}
              <p className="text-xs text-gray-400 mt-4 mb-6">
                We'll contact you at your selected method 5 minutes before the scheduled time.
              </p>
              <button
                onClick={reset}
                className="px-6 py-2.5 text-white rounded-full text-sm font-medium transition-colors hover:opacity-90"
                style={{ background: "#0076DF" }}
              >
                Got it!
              </button>
            </div>
          ) : (
            <div className="p-6">
              {/* Honeypot — invisible to humans, traps bots */}
              <input
                type="text"
                name="website"
                value={honeypotRef.current}
                onChange={(e) => { honeypotRef.current = e.target.value; }}
                style={{ position: "absolute", left: "-9999px", opacity: 0, tabIndex: -1 }}
                aria-hidden="true"
                autoComplete="off"
              />

              {/* Step indicators */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex-1 flex items-center gap-2">
                    <div className="h-1 flex-1 rounded-full transition-all duration-500"
                      style={{ background: step >= s ? "#0076DF" : "#f3f4f6" }} />
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-3">How would you like us to contact you?</p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setContactMethod("phone")}
                          className="p-4 rounded-xl border-2 text-center transition-all duration-300"
                          style={contactMethod === "phone"
                            ? { borderColor: "#0076DF", background: "rgba(0,118,223,0.05)" }
                            : { borderColor: "#f3f4f6" }}
                        >
                          <Phone className="w-5 h-5 mx-auto mb-1.5"
                            style={{ color: contactMethod === "phone" ? "#0076DF" : "#9ca3af" }} />
                          <span className="text-sm font-medium text-gray-700">Phone Call</span>
                        </button>
                        <button
                          onClick={() => setContactMethod("snapchat")}
                          className="p-4 rounded-xl border-2 text-center transition-all duration-300"
                          style={contactMethod === "snapchat"
                            ? { borderColor: "#0076DF", background: "rgba(0,118,223,0.05)" }
                            : { borderColor: "#f3f4f6" }}
                        >
                          <MessageCircle className="w-5 h-5 mx-auto mb-1.5"
                            style={{ color: contactMethod === "snapchat" ? "#0076DF" : "#9ca3af" }} />
                          <span className="text-sm font-medium text-gray-700">Snapchat</span>
                        </button>
                      </div>
                    </div>

                    {contactMethod && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div>
                          <Label className="text-xs text-gray-500">Full Name *</Label>
                          <Input value={form.full_name} onChange={(e) => update("full_name", e.target.value)} placeholder="Your full name" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Email Address *</Label>
                          <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" className="mt-1" />
                        </div>
                        {contactMethod === "snapchat" && (
                          <div>
                            <Label className="text-xs text-gray-500">Snapchat Username *</Label>
                            <Input value={form.snapchat_username} onChange={(e) => update("snapchat_username", e.target.value)} placeholder="@username" className="mt-1" />
                          </div>
                        )}
                        <div>
                          <Label className="text-xs text-gray-500">Phone Number {contactMethod === "phone" ? "*" : "(Optional)"}</Label>
                          <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+44 7XXX XXXXXX" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Country *</Label>
                          <Select value={form.country} onValueChange={(v) => update("country", v)}>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select your country" /></SelectTrigger>
                            <SelectContent>
                              {["United Kingdom", "United States", "Canada", "Australia", "European Union", "Other"].map((c) => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </motion.div>
                    )}

                    {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}

                    {contactMethod && (
                      <button
                        onClick={handleStep1Next}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-800"
                      >
                        Next: Select Time <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <div>
                      <Label className="text-xs text-gray-500">Preferred Call Date *</Label>
                      <Input type="date" value={form.preferred_date} onChange={(e) => update("preferred_date", e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Preferred Call Time * (GMT)</Label>
                      <Select value={form.preferred_time} onValueChange={(v) => update("preferred_time", v)}>
                        <SelectTrigger className="mt-1"><SelectValue placeholder="Select a time" /></SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
                    <div className="flex gap-3">
                      <button onClick={() => { setError(null); setStep(1); }} className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <button
                        onClick={handleStep2Next}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-full text-sm font-medium transition-all hover:bg-gray-800"
                      >
                        Next <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <div>
                      <Label className="text-xs text-gray-500">Experience Level</Label>
                      <Select value={form.experience_level} onValueChange={(v) => update("experience_level", v)}>
                        <SelectTrigger className="mt-1"><SelectValue placeholder="Select experience level" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner - No experience</SelectItem>
                          <SelectItem value="some_experience">Some experience</SelectItem>
                          <SelectItem value="experienced">Experienced with Apple products</SelectItem>
                          <SelectItem value="experienced_reseller">Experienced reseller</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Goals (Optional)</Label>
                      <Textarea value={form.goals} onChange={(e) => update("goals", e.target.value)} placeholder="What are your main goals with Cartier?" className="mt-1 h-20" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Questions for the call (Optional)</Label>
                      <Textarea value={form.questions} onChange={(e) => update("questions", e.target.value)} placeholder="Any specific questions?" className="mt-1 h-20" />
                    </div>
                    {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
                    <div className="flex gap-3">
                      <button onClick={() => { setError(null); setStep(2); }} className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-2 py-3 text-white rounded-full text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50"
                        style={{ background: "#0076DF" }}
                      >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Booking"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}