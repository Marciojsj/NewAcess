/**
 * Sistema de Feedback Visual
 * Gerencia toasts, alertas e mensagens de sucesso/erro
 */

import { Alert, Platform } from 'react-native';

export type FeedbackType = 'success' | 'error' | 'warning' | 'info';

interface FeedbackMessage {
  type: FeedbackType;
  title: string;
  message: string;
}

/**
 * Mostra feedback visual ao usuário
 */
export const showFeedback = (
  type: FeedbackType,
  title: string,
  message: string
) => {
  console.log(`[FEEDBACK ${type.toUpperCase()}] ${title}: ${message}`);
  
  if (Platform.OS === 'web') {
    // Para web, usar alert temporariamente (pode ser substituído por toast library)
    const emoji = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    }[type];
    
    alert(`${emoji} ${title}\n${message}`);
  } else {
    // Para mobile, usar Alert nativo
    Alert.alert(title, message);
  }
};

/**
 * Feedback específico para operações CRUD
 */
export const crudFeedback = {
  createSuccess: (entityName: string) => {
    console.log(`[CRUD SUCCESS] ${entityName} criado(a) com sucesso`);
    showFeedback('success', 'Sucesso', `${entityName} criado(a) com sucesso!`);
  },
  
  createError: (entityName: string, error: any) => {
    console.error(`[CRUD ERROR] Falha ao criar ${entityName}:`, error);
    const message = error?.response?.data?.message || error?.message || 'Erro desconhecido';
    showFeedback('error', 'Erro ao Criar', `Não foi possível criar ${entityName}.\n\n${message}`);
  },
  
  updateSuccess: (entityName: string) => {
    console.log(`[CRUD SUCCESS] ${entityName} atualizado(a) com sucesso`);
    showFeedback('success', 'Sucesso', `${entityName} atualizado(a) com sucesso!`);
  },
  
  updateError: (entityName: string, error: any) => {
    console.error(`[CRUD ERROR] Falha ao atualizar ${entityName}:`, error);
    const message = error?.response?.data?.message || error?.message || 'Erro desconhecido';
    showFeedback('error', 'Erro ao Atualizar', `Não foi possível atualizar ${entityName}.\n\n${message}`);
  },
  
  deleteSuccess: (entityName: string) => {
    console.log(`[CRUD SUCCESS] ${entityName} excluído(a) com sucesso`);
    showFeedback('success', 'Sucesso', `${entityName} excluído(a) com sucesso!`);
  },
  
  deleteError: (entityName: string, error: any) => {
    console.error(`[CRUD ERROR] Falha ao excluir ${entityName}:`, error);
    const message = error?.response?.data?.message || error?.message || 'Erro desconhecido';
    showFeedback('error', 'Erro ao Excluir', `Não foi possível excluir ${entityName}.\n\n${message}`);
  },
  
  loadError: (entityName: string, error: any) => {
    console.error(`[CRUD ERROR] Falha ao carregar ${entityName}:`, error);
    const message = error?.response?.data?.message || error?.message || 'Erro desconhecido';
    showFeedback('error', 'Erro ao Carregar', `Não foi possível carregar ${entityName}.\n\n${message}`);
  }
};

/**
 * Logger para operações CRUD
 */
export const crudLogger = {
  attempt: (operation: string, entityName: string, data?: any) => {
    console.log(`[CRUD ATTEMPT] ${operation} ${entityName}`, data || '');
  },
  
  success: (operation: string, entityName: string, result?: any) => {
    console.log(`[CRUD SUCCESS] ${operation} ${entityName}`, result || '');
  },
  
  error: (operation: string, entityName: string, error: any) => {
    console.error(`[CRUD ERROR] ${operation} ${entityName}`, {
      message: error?.message,
      response: error?.response?.data,
      status: error?.response?.status
    });
  }
};
