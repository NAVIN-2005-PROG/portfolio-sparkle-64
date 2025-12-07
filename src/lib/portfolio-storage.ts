/**
 * Portfolio Storage Utilities
 * Handles saving, loading, and managing portfolios in localStorage
 */

import { SavedPortfolio, PortfolioTemplate, defaultUserData } from '@/data/templates';

const STORAGE_KEY = 'poovi_portfolios';

/**
 * Generate a unique ID for portfolios and share links
 */
export const generateUniqueId = (): string => {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Generate a shareable link for a portfolio
 */
export const generateShareLink = (portfolioId: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/portfolio/${portfolioId}`;
};

/**
 * Get all saved portfolios from localStorage
 */
export const getSavedPortfolios = (): SavedPortfolio[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading portfolios from storage:', error);
  }
  return [];
};

/**
 * Save a portfolio to localStorage
 */
export const savePortfolio = (portfolio: Omit<SavedPortfolio, 'id' | 'createdAt' | 'shareLink'> & { data: Record<string, unknown> }): SavedPortfolio => {
  const portfolios = getSavedPortfolios();
  const id = generateUniqueId();
  
  const newPortfolio: SavedPortfolio = {
    ...portfolio,
    id,
    createdAt: new Date().toISOString(),
    shareLink: generateShareLink(id),
  };
  
  portfolios.push(newPortfolio);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
  
  return newPortfolio;
};

/**
 * Update an existing portfolio
 */
export const updatePortfolio = (id: string, updates: Partial<SavedPortfolio>): SavedPortfolio | null => {
  const portfolios = getSavedPortfolios();
  const index = portfolios.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  portfolios[index] = {
    ...portfolios[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
  return portfolios[index];
};

/**
 * Get a single portfolio by ID
 */
export const getPortfolioById = (id: string): SavedPortfolio | null => {
  const portfolios = getSavedPortfolios();
  return portfolios.find(p => p.id === id) || null;
};

/**
 * Delete a portfolio
 */
export const deletePortfolio = (id: string): boolean => {
  const portfolios = getSavedPortfolios();
  const filtered = portfolios.filter(p => p.id !== id);
  
  if (filtered.length === portfolios.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

/**
 * Create initial portfolio data from template
 */
export const createPortfolioData = (template: PortfolioTemplate): Record<string, string | string[]> => {
  return {
    name: defaultUserData.name,
    title: defaultUserData.title,
    email: defaultUserData.email,
    phone: defaultUserData.phone,
    location: defaultUserData.location,
    bio: defaultUserData.bio,
    skills: defaultUserData.skills,
    linkedin: defaultUserData.social.linkedin,
    github: defaultUserData.social.github,
    twitter: defaultUserData.social.twitter,
    templateName: template.name,
    templateColor: template.color,
  };
};
