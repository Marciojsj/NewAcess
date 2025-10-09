/**
 * Visitor API Service - Wrapper para a API de visitantes
 * Usa dados REAIS do backend via API REST
 */

import { Visitor, VisitorFormData } from '../types/visitorTypes';
import { visitorsApi, Visitor as APIVisitor, CreateVisitorData } from './api/visitorsApi';

export const visitorApi = {
  /**
   * Buscar todos os visitantes do banco de dados
   */
  getAllVisitors: async (search?: string): Promise<Visitor[]> => {
    try {
      const visitors = await visitorsApi.getAll(search);
      return visitors.map(visitor => ({
        id: visitor.id,
        name: visitor.name,
        cpf: visitor.cpf,
        phone: visitor.phone,
        email: visitor.email,
        company: visitor.company,
        qrCode: visitor.qrCode,
        qrCodeExpiry: visitor.qrCodeExpiry,
        entityId: visitor.entityId,
        createdAt: visitor.createdAt,
        updatedAt: visitor.updatedAt,
      }));
    } catch (error: any) {
      console.error('Erro ao buscar visitantes:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar visitantes');
    }
  },

  /**
   * Buscar visitante por ID
   */
  getVisitorById: async (id: string): Promise<Visitor> => {
    try {
      const visitor = await visitorsApi.getById(id);
      
      return {
        id: visitor.id,
        name: visitor.name,
        cpf: visitor.cpf,
        phone: visitor.phone,
        email: visitor.email,
        company: visitor.company,
        qrCode: visitor.qrCode,
        qrCodeExpiry: visitor.qrCodeExpiry,
        entityId: visitor.entityId,
        createdAt: visitor.createdAt,
        updatedAt: visitor.updatedAt,
      };
    } catch (error: any) {
      console.error('Erro ao buscar visitante:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar visitante');
    }
  },

  /**
   * Criar novo visitante no banco de dados
   */
  createVisitor: async (visitorData: VisitorFormData): Promise<Visitor> => {
    try {
      const createData: CreateVisitorData = {
        name: visitorData.name,
        cpf: visitorData.cpf,
        phone: visitorData.phone,
        email: visitorData.email,
        company: visitorData.company,
      };

      const newVisitor = await visitorsApi.create(createData);
      return {
        id: newVisitor.id,
        name: newVisitor.name,
        cpf: newVisitor.cpf,
        phone: newVisitor.phone,
        email: newVisitor.email,
        company: newVisitor.company,
        qrCode: newVisitor.qrCode,
        qrCodeExpiry: newVisitor.qrCodeExpiry,
        entityId: newVisitor.entityId,
        createdAt: newVisitor.createdAt,
        updatedAt: newVisitor.updatedAt,
      };
    } catch (error: any) {
      console.error('Erro ao criar visitante:', error);
      throw new Error(error.response?.data?.error || 'Erro ao criar visitante');
    }
  },

  /**
   * Atualizar visitante existente
   */
  updateVisitor: async (id: string, visitorData: Partial<VisitorFormData>): Promise<Visitor> => {
    try {
      const updatedVisitor = await visitorsApi.update(id, visitorData);

      return {
        id: updatedVisitor.id,
        name: updatedVisitor.name,
        cpf: updatedVisitor.cpf,
        phone: updatedVisitor.phone,
        email: updatedVisitor.email,
        company: updatedVisitor.company,
        qrCode: updatedVisitor.qrCode,
        qrCodeExpiry: updatedVisitor.qrCodeExpiry,
        entityId: updatedVisitor.entityId,
        createdAt: updatedVisitor.createdAt,
        updatedAt: updatedVisitor.updatedAt,
      };
    } catch (error: any) {
      console.error('Erro ao atualizar visitante:', error);
      throw new Error(error.response?.data?.error || 'Erro ao atualizar visitante');
    }
  },

  /**
   * Deletar visitante do banco de dados
   */
  deleteVisitor: async (id: string): Promise<void> => {
    try {
      await visitorsApi.delete(id);
    } catch (error: any) {
      console.error('Erro ao deletar visitante:', error);
      throw new Error(error.response?.data?.error || 'Erro ao deletar visitante');
    }
  },

  /**
   * Regenerar QR Code do visitante
   */
  regenerateQRCode: async (id: string): Promise<Visitor> => {
    try {
      const visitor = await visitorsApi.regenerateQRCode(id);
      
      return {
        id: visitor.id,
        name: visitor.name,
        cpf: visitor.cpf,
        phone: visitor.phone,
        email: visitor.email,
        company: visitor.company,
        qrCode: visitor.qrCode,
        qrCodeExpiry: visitor.qrCodeExpiry,
        entityId: visitor.entityId,
        createdAt: visitor.createdAt,
        updatedAt: visitor.updatedAt,
      };
    } catch (error: any) {
      console.error('Erro ao regenerar QR Code:', error);
      throw new Error(error.response?.data?.error || 'Erro ao regenerar QR Code');
    }
  },
};