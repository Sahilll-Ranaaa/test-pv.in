"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!supabase) {
      setError("Supabase connection is not configured.");
      setLoading(false);
      return;
    }

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      router.push("/internal/user");
    } catch (err) {
      setError(err.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-10 space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-[#9f0202]/5 rounded-2xl flex items-center justify-center text-[#9f0202] mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Admin Access</h1>
          <p className="text-gray-400 text-sm">Please sign in to access the platform management.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-gray-400">Email Address</Label>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 bg-gray-50 border-transparent rounded-2xl focus:ring-[#9f0202]" 
              placeholder="admin@pvadvisory.in"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-gray-400">Password</Label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 bg-gray-50 border-transparent rounded-2xl focus:ring-[#9f0202]" 
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 font-bold">{error}</p>
          )}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 bg-[#9f0202] hover:bg-[#7a0101] text-white font-bold rounded-2xl text-lg shadow-xl shadow-[#9f0202]/10"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign In to Dashboard"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">
            Protected by Supabase Authentication
          </p>
        </div>
      </motion.div>
    </div>
  );
}
