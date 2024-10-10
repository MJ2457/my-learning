import React from 'react';
import { Book, Lightbulb, PenTool, Puzzle, Target } from 'lucide-react';

const iconComponents = {
  book: Book,
  lightbulb: Lightbulb,
  pen: PenTool,
  puzzle: Puzzle,
  target: Target,
};

export function StageIcon({ icon, className, size }) {
  const IconComponent = iconComponents[icon] || Book; // Default to Book if icon not found

  return <IconComponent className={className} size={size} />;
}

export default StageIcon;
