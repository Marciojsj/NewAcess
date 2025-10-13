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
      console.log('🔷 [useVisitors] Iniciando criação de visitante');
      console.log('📤 [useVisitors] Dados enviados:', visitorData);
      setLoading(true);
      setError(null);
      
      const newVisitor = await visitorApi.createVisitor(visitorData);
      console.log('📥 [useVisitors] Visitante retornado:', newVisitor);
      
      setVisitors(prev => {
        console.log('🔄 [useVisitors] Atualizando lista. Antes:', prev.length);
        const updated = [...prev, newVisitor];
        console.log('🔄 [useVisitors] Depois:', updated.length);
        return updated;
      });
      
      console.log('✅ [useVisitors] Criação concluída com sucesso');
      return newVisitor;
    } catch (err: any) {
      console.error('❌ [useVisitors] Erro na criação:', err);
      setError(err.message || 'Erro ao criar visitante');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateVisitor = async (id: string, visitorData: any) => {
    try {
      console.log('🔷 [useVisitors] Iniciando atualização de visitante:', id);
      console.log('📤 [useVisitors] Dados de atualização:', visitorData);
      setLoading(true);
      setError(null);
      
      const updatedVisitor = await visitorApi.updateVisitor(id, visitorData);
      console.log('📥 [useVisitors] Visitante atualizado retornado:', updatedVisitor);
      
      setVisitors(prev => {
        const updated = prev.map(v => v.id === id ? updatedVisitor : v);
        console.log('🔄 [useVisitors] Lista atualizada');
        return updated;
      });
      
      console.log('✅ [useVisitors] Atualização concluída com sucesso');
      return updatedVisitor;
    } catch (err: any) {
      console.error('❌ [useVisitors] Erro na atualização:', err);
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

  const getVisitorById = async (id: string): Promise<Visitor | null> => {
    try {
      const visitor = visitors.find(v => v.id === id);
      if (visitor) return visitor;
      
      // Se não encontrar localmente, buscar na API
      const data = await visitorApi.getVisitorById(id);
      return data;
    } catch (err: any) {
      console.error('Erro ao buscar visitante:', err);
      return null;
    }
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
    getVisitorById,
  };
};
