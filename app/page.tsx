"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Tag, Star } from "lucide-react";
import { motion } from "framer-motion";

const quotesData: { [key: string]: string[] } = {
  success: [
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Opportunities don't happen. You create them.",
    "The road to success and the road to failure are almost exactly the same."
  ],
  motivation: [
    "The way to get started is to quit talking and begin doing.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones."
  ],
  focus: [
    "Starve your distractions, feed your focus.",
    "Focus on being productive instead of busy.",
    "The successful warrior is the average man, with laser-like focus."
  ],
  perseverance: [
    "Perseverance is not a long race; it is many short races one after the other.",
    "Through perseverance many people win success out of what seemed destined to be certain failure.",
    "It does not matter how slowly you go as long as you do not stop."
  ],
  happiness: [
    "Happiness is not something ready made. It comes from your own actions.",
    "For every minute you are angry you lose sixty seconds of happiness.",
    "Happiness depends upon ourselves."
  ],
  leadership: [
    "A leader is one who knows the way, goes the way, and shows the way.",
    "Leadership is the capacity to translate vision into reality.",
    "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things."
  ],
  gratitude: [
    "Gratitude turns what we have into enough.",
    "Gratitude is not only the greatest of virtues, but the parent of all others.",
    "Start each day with a positive thought and a grateful heart."
  ],
  creativity: [
    "Creativity is intelligence having fun.",
    "You can't use up creativity. The more you use, the more you have.",
    "Creativity takes courage."
  ],
  learning: [
    "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    "The beautiful thing about learning is that no one can take it away from you.",
    "Learning never exhausts the mind."
  ],
  courage: [
    "Courage is not the absence of fear, but the triumph over it.",
    "You cannot swim for new horizons until you have courage to lose sight of the shore.",
    "Have the courage to follow your heart and intuition."
  ],
  kindness: [
    "No act of kindness, no matter how small, is ever wasted.",
    "Kindness is a language which the deaf can hear and the blind can see.",
    "Carry out a random act of kindness, with no expectation of reward."
  ]
};

export default function QuoteGenerator() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [name, setName] = useState<string>("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const availableTopics = Object.keys(quotesData);

  // Refined palette for professional badges
  const badgeColors = [
    { bg: "bg-blue-100", border: "border-blue-200", text: "text-blue-800", hover: "hover:ring-2 hover:ring-blue-300 hover:bg-blue-200", icon: "text-blue-500" },
    { bg: "bg-slate-100", border: "border-slate-200", text: "text-slate-700", hover: "hover:ring-2 hover:ring-blue-200 hover:bg-slate-200", icon: "text-slate-400" },
    { bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-700", hover: "hover:ring-2 hover:ring-blue-100 hover:bg-blue-100", icon: "text-blue-400" },
    { bg: "bg-slate-50", border: "border-slate-100", text: "text-slate-600", hover: "hover:ring-2 hover:ring-blue-100 hover:bg-slate-100", icon: "text-slate-300" },
  ];

  // Personalized greeting logic
  useEffect(() => {
    const storedName = typeof window !== 'undefined' ? localStorage.getItem('userName') : null;
    if (storedName) {
      setName(storedName);
      setShowNamePrompt(false);
      setEditingName(false);
    } else {
      setShowNamePrompt(true);
    }
  }, []);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('favoriteQuotes') : null;
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
    }
  }, [favorites]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('userName', name.trim());
      setShowNamePrompt(false);
      setEditingName(false);
    }
  };

  const handleGenerate = () => {
    if (!topic.trim()) {
      setError("Please enter or select a topic!");
      setQuotes([]);
      return;
    }
    setError("");
    const lowerTopic = topic.trim().toLowerCase();
    const foundQuotes = quotesData[lowerTopic];
    if (foundQuotes) {
      setQuotes(foundQuotes);
    } else {
      setQuotes([`No quotes found for topic: "${topic}"`]);
    }
  };

  const handleBadgeClick = (t: string) => {
    setTopic(t.charAt(0).toUpperCase() + t.slice(1));
    setError("");
  };

  const toggleFavorite = (quote: string) => {
    setFavorites(favs =>
      favs.includes(quote)
        ? favs.filter(q => q !== quote)
        : [...favs, quote]
    );
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('favoriteQuotes');
    }
    setShowClearDialog(false);
  };

  return (
    <div className="min-h-screen w-full max-w-xl mx-auto sm:mt-16 mt-4 sm:p-8 p-2 space-y-6 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-2xl shadow-xl flex flex-col justify-center">
      {showNamePrompt || editingName ? (
        <form onSubmit={handleNameSubmit} className="flex flex-col items-center gap-2 mb-4">
          <label htmlFor="name" className="text-blue-700 font-semibold">What&apos;s your name?</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border border-blue-200 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-800"
            placeholder="Enter your name"
            autoFocus
          />
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded">Save</Button>
        </form>
      ) : (
        <motion.div
          className="flex items-center justify-center gap-3 mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
        >
          {/* Avatar with initials */}
          <motion.div
            className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-xl shadow"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            {name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : '?'}
          </motion.div>
          <div className="text-lg font-semibold text-blue-700 text-center animate-fade-in">
            Hello, {name}! Ready for some inspiration?
            <button
              className="ml-2 text-xs text-blue-400 underline hover:text-blue-600 transition-colors"
              onClick={() => setEditingName(true)}
              type="button"
              aria-label="Edit name"
            >
              Edit
            </button>
          </div>
        </motion.div>
      )}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold flex justify-center items-center gap-2">
          <Sparkles className="text-blue-500" /> Quote Generator
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="w-full max-w-lg mx-auto bg-gradient-to-r from-blue-50 via-slate-50 to-blue-100 rounded-xl shadow p-2 sm:p-4 mt-4 border-2 border-transparent bg-clip-padding"
          style={{ borderImage: "linear-gradient(90deg, #3b82f6, #64748b) 1" }}
        >
          <h2 className="text-xs sm:text-sm font-semibold text-blue-700 mb-2 flex items-center justify-center gap-1">
            <Tag className="w-4 h-4 text-blue-500" /> Available Topics
          </h2>
          <motion.div
            className="flex flex-wrap justify-center gap-1 sm:gap-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.07
                }
              }
            }}
          >
            {availableTopics.map((t, i) => {
              const color = badgeColors[i % badgeColors.length];
              return (
                <motion.span
                  key={t}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  whileHover={{ scale: 1.08 }}
                  className={`flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border shadow transition-all duration-200 cursor-pointer ${color.bg} ${color.text} ${color.border} ${color.hover}`}
                  onClick={() => handleBadgeClick(t)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Select topic ${t}`}
                >
                  <Tag className={`w-4 h-4 ${color.icon}`} /> {t}
                </motion.span>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <Input
          placeholder="Enter a topic..."
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
            setError("");
          }}
          className="bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-shadow duration-200 shadow-sm hover:shadow-lg w-full"
        />
        <Button
          onClick={handleGenerate}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
        >
          Search
        </Button>
      </div>

      {error && (
        <div className="text-xs text-blue-600 mt-1 text-center animate-pulse">{error}</div>
      )}

      <div className="space-y-4 w-full">
        {quotes.map((quote, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.18, type: "spring", stiffness: 120 }}
          >
            <Card className="bg-white border-l-4 border-blue-400 shadow-lg hover:shadow-2xl transition-shadow duration-200 w-full">
              <CardContent className="p-3 sm:p-4 text-sm sm:text-md italic text-blue-800 flex items-center justify-between gap-2">
                <span dangerouslySetInnerHTML={{ __html: `&ldquo; ${quote} &rdquo;` }} />
                <button
                  onClick={() => toggleFavorite(quote)}
                  aria-label={favorites.includes(quote) ? 'Remove from favorites' : 'Add to favorites'}
                  className={`ml-2 transition-colors ${favorites.includes(quote) ? 'text-yellow-400' : 'text-blue-200 hover:text-blue-400'}`}
                >
                  <Star fill={favorites.includes(quote) ? '#facc15' : 'none'} strokeWidth={2} className="w-5 h-5" />
                </button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-blue-700 font-bold text-lg flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400" fill="#facc15" /> Favorites</h2>
            <button
              onClick={() => setShowClearDialog(true)}
              className="ml-auto text-xs px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 transition-colors"
              aria-label="Clear all favorites"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-3">
            {favorites.map((quote, idx) => (
              <Card key={idx} className="bg-white border-l-4 border-yellow-400 shadow-md w-full">
                <CardContent className="p-3 sm:p-4 text-sm sm:text-md italic text-blue-800 flex items-center justify-between gap-2">
                  <span dangerouslySetInnerHTML={{ __html: `&ldquo; ${quote} &rdquo;` }} />
                  <button
                    onClick={() => toggleFavorite(quote)}
                    aria-label="Remove from favorites"
                    className="ml-2 text-yellow-400 hover:text-blue-400 transition-colors"
                  >
                    <Star fill="#facc15" strokeWidth={2} className="w-5 h-5" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Clear All */}
      {showClearDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xs flex flex-col items-center animate-fade-in">
            <div className="text-blue-700 font-semibold text-center mb-4">Are you sure you want to clear all favorites?</div>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setShowClearDialog(false)}
                className="px-4 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={clearAllFavorites}
                className="px-4 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
              >
                Yes, clear all
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


