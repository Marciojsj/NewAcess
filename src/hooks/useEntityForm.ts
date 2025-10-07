// src/hooks/useEntityForm.ts
import { useState, useEffect } from 'react';
import { Entity } from '../types/entityTypes';
import { validateCPF } from '../utils/entityHelpers';

export interface EntityFormData {
  cpf: string;
  rg: string;
  type: string;
  active: boolean;
  name?: string;
}

export interface EntityFormErrors {
  cpf?: string;
  rg?: string;
  type?: string;
  name?: string;
}

export interface UseEntityFormReturn {
  formData: EntityFormData;
  errors: EntityFormErrors;
  isValid: boolean;
  isDirty: boolean;
  handleChange: (field: keyof EntityFormData, value: any) => void;
  validate: () => boolean;
  reset: () => void;
  clearErrors: () => void;
}

export const useEntityForm = (initialEntity?: Entity): UseEntityFormReturn => {
  const initialData: EntityFormData = initialEntity
    ? {
        cpf: initialEntity.cpf || '',
        rg: initialEntity.rg || '',
        type: initialEntity.type || '',
        active: initialEntity.active !== undefined ? initialEntity.active : true,
        name: initialEntity.name || '',
      }
    : {
        cpf: '',
        rg: '',
        type: '',
        active: true,
        name: '',
      };

  const [formData, setFormData] = useState<EntityFormData>(initialData);
  const [errors, setErrors] = useState<EntityFormErrors>({});
  const [isValid, setIsValid] = useState(false);
  const [initialFormData] = useState<EntityFormData>(initialData);

  // Check if form is dirty
  const isDirty =
    JSON.stringify(formData) !== JSON.stringify(initialFormData);

  // Handle field change
  const handleChange = (field: keyof EntityFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user types
    if (errors[field as keyof EntityFormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof EntityFormErrors];
        return newErrors;
      });
    }
  };

  // Validate form
  const validate = (): boolean => {
    const newErrors: EntityFormErrors = {};

    // Validate CPF
    if (!formData.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    // Validate type
    if (!formData.type) {
      newErrors.type = 'Tipo é obrigatório';
    }

    setErrors(newErrors);
    const valid = Object.keys(newErrors).length === 0;
    setIsValid(valid);
    return valid;
  };

  // Reset form
  const reset = () => {
    setFormData(initialFormData);
    setErrors({});
    setIsValid(false);
  };

  // Clear errors
  const clearErrors = () => {
    setErrors({});
  };

  // Update isValid whenever errors or formData change
  useEffect(() => {
    // Form is valid only if there are no errors AND required fields are filled
    const hasNoErrors = Object.keys(errors).length === 0;
    const hasRequiredFields = formData.cpf && formData.type;
    setIsValid(hasNoErrors && !!hasRequiredFields);
  }, [errors, formData]);

  return {
    formData,
    errors,
    isValid,
    isDirty,
    handleChange,
    validate,
    reset,
    clearErrors,
  };
};
