/**
 * Utility Functions
 * 
 * Helper functions used throughout the application
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names intelligently
 * Merges Tailwind CSS classes and removes duplicates
 * 
 * @param inputs - Array of class names or conditional class objects
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
