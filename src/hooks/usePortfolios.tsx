/**
 * Portfolios Hook
 * Manages portfolio CRUD operations with Supabase
 */

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

export interface Portfolio {
  id: string;
  user_id: string;
  template_id: number;
  template_name: string;
  name: string;
  data: Json;
  style: Json;
  share_link: string | null;
  is_public: boolean | null;
  created_at: string;
  updated_at: string;
}

export const usePortfolios = () => {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolios = async () => {
    if (!user) {
      setPortfolios([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setPortfolios(data as Portfolio[]);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      toast.error('Failed to load portfolios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, [user]);

  const createPortfolio = async (
    templateId: number,
    templateName: string,
    name: string,
    data: Json,
    style: Json
  ): Promise<Portfolio | null> => {
    if (!user) {
      toast.error('Please sign in to save portfolios');
      return null;
    }

    try {
      const { data: newPortfolio, error } = await supabase
        .from('portfolios')
        .insert({
          user_id: user.id,
          template_id: templateId,
          template_name: templateName,
          name,
          data,
          style,
        })
        .select()
        .single();

      if (error) throw error;
      
      setPortfolios(prev => [newPortfolio as Portfolio, ...prev]);
      toast.success('Portfolio saved successfully!');
      return newPortfolio as Portfolio;
    } catch (error) {
      console.error('Error creating portfolio:', error);
      toast.error('Failed to save portfolio');
      return null;
    }
  };

  const updatePortfolio = async (
    id: string,
    updates: {
      name?: string;
      data?: Json;
      style?: Json;
      is_public?: boolean | null;
    }
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('portfolios')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setPortfolios(prev =>
        prev.map(p => (p.id === id ? { ...p, ...updates } : p))
      );
      toast.success('Portfolio updated successfully!');
      return true;
    } catch (error) {
      console.error('Error updating portfolio:', error);
      toast.error('Failed to update portfolio');
      return false;
    }
  };

  const deletePortfolio = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPortfolios(prev => prev.filter(p => p.id !== id));
      toast.success('Portfolio deleted successfully!');
      return true;
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      toast.error('Failed to delete portfolio');
      return false;
    }
  };

  const getPortfolioById = async (id: string): Promise<Portfolio | null> => {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as Portfolio | null;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      return null;
    }
  };

  const getPortfolioByShareLink = async (shareLink: string): Promise<Portfolio | null> => {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('share_link', shareLink)
        .eq('is_public', true)
        .maybeSingle();

      if (error) throw error;
      return data as Portfolio | null;
    } catch (error) {
      console.error('Error fetching portfolio by share link:', error);
      return null;
    }
  };

  return {
    portfolios,
    loading,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    getPortfolioById,
    getPortfolioByShareLink,
    refetch: fetchPortfolios,
  };
};
