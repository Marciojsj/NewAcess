/**
 * Hook para gerenciar Toast
 * Fornece funções para exibir toast de sucesso, erro, warning e info
 */

import { useState, useCallback } from 'react';
import { ToastType } from '../components/ui/Toast';

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'info',
  });

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    console.log(`[TOAST ${type.toUpperCase()}] ${message}`);
    setToast({
      visible: true,
      message,
      type,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const success = useCallback((message: string) => {
    showToast(message, 'success');
  }, [showToast]);

  const error = useCallback((message: string) => {
    showToast(message, 'error');
  }, [showToast]);

  const warning = useCallback((message: string) => {
    showToast(message, 'warning');
  }, [showToast]);

  const info = useCallback((message: string) => {
    showToast(message, 'info');
  }, [showToast]);

  return {
    toast,
    showToast,
    hideToast,
    success,
    error,
    warning,
    info,
  };
};
