import QRCode from 'qrcode';
import crypto from 'crypto';

export const qrcodeService = {
  async generateVisitorQRCode(cpf: string) {
    const token = crypto.randomBytes(32).toString('hex');
    const qrData = JSON.stringify({
      cpf,
      token,
      timestamp: Date.now(),
    });

    const qrCode = await QRCode.toDataURL(qrData);
    
    const qrCodeExpiry = new Date();
    qrCodeExpiry.setHours(qrCodeExpiry.getHours() + 24);

    return { qrCode, qrCodeExpiry };
  },

  async validateQRCode(qrCode: string) {
    try {
      const data = JSON.parse(qrCode);
      
      if (!data.cpf || !data.token || !data.timestamp) {
        return { valid: false, cpf: null };
      }

      const now = Date.now();
      const qrAge = now - data.timestamp;
      const maxAge = 24 * 60 * 60 * 1000;

      if (qrAge > maxAge) {
        return { valid: false, cpf: null };
      }

      return { valid: true, cpf: data.cpf };
    } catch (error) {
      return { valid: false, cpf: null };
    }
  },
};
