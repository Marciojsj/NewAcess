import { Response } from 'express';

export const successResponse = (res: Response, data: any, message?: string, statusCode = 200) => {
  const responseBody = {
    success: true,
    message: message || 'Success',
    data,
  };
  
  console.log('✅ [RESPONSE] Enviando sucesso. Status:', statusCode);
  console.log('✅ [RESPONSE] Body:', JSON.stringify(responseBody, null, 2));
  
  return res.status(statusCode).json(responseBody);
};

export const errorResponse = (res: Response, message: string, statusCode = 500, errors?: any) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
