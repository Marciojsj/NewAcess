#!/bin/bash

# Script para limpar e reinstalar dependências corretamente

echo "🧹 Limpando projeto..."

# Para o Expo se estiver rodando
echo "Parando Expo..."
pkill -f "expo start" 2>/dev/null || true
killall node 2>/dev/null || true

# Remove arquivos bloqueados com sudo
echo "Removendo node_modules (pode pedir senha sudo)..."
sudo rm -rf node_modules
sudo rm -rf package-lock.json
sudo rm -rf .expo

# Limpa cache do npm
echo "Limpando cache npm..."
npm cache clean --force

# Reinstala dependências com as versões corretas
echo "📦 Instalando dependências corretas..."
npm install --legacy-peer-deps

echo ""
echo "✅ Limpeza completa!"
echo ""
echo "🚀 Para iniciar o projeto:"
echo "   npm start"
echo ""
