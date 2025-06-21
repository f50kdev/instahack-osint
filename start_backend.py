#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para iniciar o backend Python do Instagram OSINT
"""

import os
import sys
import subprocess
import time

def check_python_dependencies():
    """Verifica se as dependências Python estão instaladas"""
    try:
        import flask
        import requests
        print("✅ Dependências Python encontradas")
        return True
    except ImportError as e:
        print(f"❌ Dependência não encontrada: {e}")
        return False

def install_dependencies():
    """Instala as dependências necessárias"""
    print("📦 Instalando dependências...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "backend/requirements.txt"])
        print("✅ Dependências instaladas com sucesso")
        return True
    except subprocess.CalledProcessError:
        print("❌ Erro ao instalar dependências")
        return False

def start_backend():
    """Inicia o backend Python"""
    print("🚀 Iniciando backend Python...")
    print("📍 API estará disponível em: http://localhost:5001")
    print("📋 Para parar o servidor, pressione Ctrl+C")
    print("-" * 50)
    
    try:
        # Muda para o diretório backend
        os.chdir("backend")
        
        # Inicia o servidor Flask
        subprocess.run([sys.executable, "instagram_api.py"])
        
    except KeyboardInterrupt:
        print("\n🛑 Servidor parado pelo usuário")
    except FileNotFoundError:
        print("❌ Arquivo backend/instagram_api.py não encontrado")
    except Exception as e:
        print(f"❌ Erro ao iniciar servidor: {e}")

def main():
    print("🔍 Instagram OSINT Backend")
    print("=" * 40)
    
    # Verifica se estamos no diretório correto
    if not os.path.exists("backend"):
        print("❌ Diretório 'backend' não encontrado")
        print("💡 Execute este script no diretório raiz do projeto")
        return
    
    # Verifica dependências
    if not check_python_dependencies():
        print("📦 Instalando dependências...")
        if not install_dependencies():
            print("❌ Falha ao instalar dependências")
            return
    
    # Inicia o backend
    start_backend()

if __name__ == "__main__":
    main() 