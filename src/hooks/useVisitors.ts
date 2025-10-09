/**
 * Hook para gerenciar visitantes
 */

import { useState, useEffect, useCallback } from 'react';
import { Visitor } from '../types/visitorTypes';
import { visitorApi } from '../services/visitorApi';

export const useVisitors = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVisitors = useCallback(async (search?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await visitorApi.getAllVisitors(search);
      setVisitors(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar visitantes');
      console.error('Erro ao carregar visitantes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVisitors();
  }, [loadVisitors]);

  const createVisitor = async (visitorData: any) => {
    try {
      setLoading(true);
      setError(null);
      const newVisitor = await visitorApi.createVisitor(visitorData);
      setVisitors(prev => [...prev, newVisitor]);
      return newVisitor;
    } catch (err: any) {
      setError(err.message || 'Erro ao criar visitante');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateVisitor = async (id: string, visitorData: any) => {
    try {
      setLoading(true);
      setError(null);
      const updatedVisitor = await visitorApi.updateVisitor(id, visitorData);
      setVisitors(prev => prev.map(v => v.id === id ? updatedVisitor : v));
      return updatedVisitor;
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar visitante');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteVisitor = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await visitorApi.deleteVisitor(id);
      setVisitors(prev => prev.filter(v => v.id !== id));
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar visitante');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const regenerateQRCode = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedVisitor = await visitorApi.regenerateQRCode(id);
      setVisitors(prev => prev.map(v => v.id === id ? updatedVisitor : v));
      return updatedVisitor;
    } catch (err: any) {
      setError(err.message || 'Erro ao regenerar QR Code');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchVisitors = async (term: string) => {
    await loadVisitors(term);
  };

  return {
    visitors,
    loading,
    error,
    loadVisitors,
    createVisitor,
    updateVisitor,
    deleteVisitor,
    regenerateQRCode,
    searchVisitors,
  };
};
