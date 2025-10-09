import nodemailer from 'nodemailer';
import { env } from '../config/env';
import logger from '../utils/logger.util';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const emailService = {
  async sendWelcomeEmail(to: string, name: string) {
    try {
      await transporter.sendMail({
        from: env.SMTP_FROM,
        to,
        subject: 'Bem-vindo ao Sistema de Controle de Acesso',
        html: `
          <h1>Olá, ${name}!</h1>
          <p>Seja bem-vindo ao Sistema de Controle de Acesso.</p>
          <p>Sua conta foi criada com sucesso.</p>
          <p>Acesse o sistema em: ${env.FRONTEND_URL}</p>
        `,
      });
      logger.info(`Email de boas-vindas enviado para: ${to}`);
    } catch (error) {
      logger.error('Erro ao enviar email de boas-vindas:', error);
    }
  },

  async sendPasswordResetEmail(to: string, resetToken: string) {
    try {
      const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      
      await transporter.sendMail({
        from: env.SMTP_FROM,
        to,
        subject: 'Recuperação de Senha',
        html: `
          <h1>Recuperação de Senha</h1>
          <p>Você solicitou a recuperação de senha.</p>
          <p>Clique no link abaixo para redefinir sua senha:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>Este link expira em 1 hora.</p>
        `,
      });
      logger.info(`Email de recuperação de senha enviado para: ${to}`);
    } catch (error) {
      logger.error('Erro ao enviar email de recuperação de senha:', error);
    }
  },
};
