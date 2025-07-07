'use client';

import * as React from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default function AssignmentPage() {
  return <h1>This is the Assignment 1 page</h1>;
}
