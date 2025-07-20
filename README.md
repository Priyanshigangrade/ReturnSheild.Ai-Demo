# ReturnShield.AI - Local Setup Guide

## Prerequisites

Before you begin, ensure your system meets these requirements:
- **Node.js** (v16 or later) - [Download Node.js](https://nodejs.org/)
- **npm** (included with Node.js) or **Yarn** - [Yarn installation guide](https://yarnpkg.com/getting-started/install)
- Code editor (we recommend [Visual Studio Code](https://code.visualstudio.com/))

## Setup Instructions

### Option 1: ZIP Download Method

1. **Extract the ZIP File**
   - Locate your downloaded `ReturnShield.Ai-Demo.zip` file
   - Right-click → "Extract All" (Windows) or double-click (Mac/Linux)
   - Choose your preferred destination folder (e.g., `Documents/Projects/`)

2. **Open Project in Terminal**
   ```bash
   cd path/to/extracted/folder
   ```

### Option 2: Git Clone Method

```bash
git clone https://github.com/Priyanshigangrade/ReturnShield.Ai-Demo.git
cd ReturnShield.Ai-Demo
```

### Install Dependencies

Run either of the following commands:

```bash
npm install
# OR
yarn install
```

### Configure Environment (Optional)

1. Rename `.env.example` to `.env`
2. Update any environment variables as needed (e.g., API keys for translation services)

## Running the Application

### Development Mode

Start the development server with one of these commands:

```bash
npm start
# OR
npm run dev
# OR
yarn start
```

The application will automatically open in your default browser at:
[http://localhost:3000](http://localhost:3000)

### Testing the AI Model

1. The TensorFlow.js model loads automatically
2. Check your browser's console for the success message:
   ```
   [AI] TensorFlow.js model loaded successfully.
   ```

### Simulating a Fraud Check

1. **Seller Side**: Upload 3 product images (front, back, label)
2. **Buyer Side**: Upload return images
3. Click **"Check for Fraud"** to view the AI comparison results

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This generates production-ready files in the `build/` directory.

## Troubleshooting

If you encounter issues:
- Ensure your browser supports WebGL ([check here](https://webglreport.com/))
- Disable ad-blockers for localhost
- Clear your browser cache if experiencing unexpected behavior

## See Demo Video 

https://drive.google.com/file/d/1P2aXbq92k0RbNUZgmhvRXWDe5ZAlaJ_v/view?usp=sharing
  

