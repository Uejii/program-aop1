# 🖥️ INSTRUÇÕES VISUAIS - ONDE ABRIR CADA TERMINAL

## 📋 VOCÊ PRECISA DE 2 TERMINAIS ABERTOS AO MESMO TEMPO!

---

## 🟦 TERMINAL 1 - BACKEND (PHP)

### Como abrir:
1. Pressione `Windows + R`
2. Digite: `cmd`
3. Pressione Enter

### O que digitar:
```bash
cd "C:\Users\amara\OneDrive\Área de Trabalho\haha\backend"
php -S localhost:8000
```

### ✅ Como saber que está funcionando:
Você verá uma mensagem assim:
```
PHP 7.4.x Development Server started at http://localhost:8000
Document root is: C:\Users\amara\OneDrive\Área de Trabalho\haha\backend
```

### ⚠️ IMPORTANTE:
- **DEIXE ESTE TERMINAL ABERTO!**
- Não feche ele!
- Se aparecer erro, me diga qual erro apareceu

---

## 🟩 TERMINAL 2 - FRONTEND (React)

### Como abrir:
1. Pressione `Windows + R` novamente (ou abra outro cmd)
2. Digite: `cmd`
3. Pressione Enter

### O que digitar (PRIMEIRA VEZ):
```bash
cd "C:\Users\amara\OneDrive\Área de Trabalho\haha\frontend"
npm install
```
**Aguarde terminar!** (pode demorar 2-5 minutos)

### Depois que terminar, digite:
```bash
npm start
```

### ✅ Como saber que está funcionando:
- O navegador vai abrir automaticamente em `http://localhost:3000`
- Você verá uma mensagem no terminal tipo:
  ```
  Compiled successfully!
  ```

### ⚠️ IMPORTANTE:
- **DEIXE ESTE TERMINAL ABERTO TAMBÉM!**
- Não feche ele!

---

## 🎯 RESUMO

Você precisa ter **2 janelas de terminal abertas**:

```
┌─────────────────────────┐  ┌─────────────────────────┐
│   TERMINAL 1            │  │   TERMINAL 2            │
│   (Backend PHP)         │  │   (Frontend React)      │
│                         │  │                         │
│   cd backend            │  │   cd frontend           │
│   php -S localhost:8000 │  │   npm install           │
│                         │  │   npm start              │
│   [DEIXAR ABERTO]       │  │   [DEIXAR ABERTO]       │
└─────────────────────────┘  └─────────────────────────┘
```

---

## ❌ ERROS COMUNS

### "php não é reconhecido"
- Instale PHP: https://www.php.net/downloads.php
- Adicione ao PATH durante instalação

### "npm não é reconhecido"
- Instale Node.js: https://nodejs.org/
- Baixe a versão LTS

### "Port 8000 is already in use"
- Alguém está usando a porta 8000
- Feche outros programas
- OU mude para porta 8001 no backend

### "Cannot find module"
- Execute `npm install` no terminal 2
- Aguarde terminar completamente

---

## 🆘 AINDA COM ERRO?

Me diga:
1. Qual terminal está dando erro? (1 ou 2)
2. Qual é a mensagem de erro completa?
3. Você já instalou Node.js e PHP?

