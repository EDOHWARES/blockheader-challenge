# Ethereum Wallet Validator 🔍

This project allows users to validate a list of Ethereum wallet addresses and get real-time feedback.

## ✅ Features

- Accepts multiple Ethereum addresses (comma or newline separated)
- Validates:
  - Must start with `0x`
  - Must be 42 characters long
  - Must contain only hexadecimal characters
- Highlights valid and invalid addresses
- Toast notifications using `sonner`
- Copy only valid addresses (bonus)

## 🛠️ Built With

- NextJs
- Tailwind CSS
- Sonner (for toasts)

## 🚀 Live Demo

[Live Vercel Link](https://your-vercel-eth-validator.vercel.app)

## 🧪 Usage

1. Paste multiple addresses into the textarea.
2. Click "Validate".
3. See real-time feedback.
4. Click "Copy Valid" to copy only the valid addresses.

## 📦 Run Locally

```bash
cd ethereum-wallet-validator
npm install
npm run dev
