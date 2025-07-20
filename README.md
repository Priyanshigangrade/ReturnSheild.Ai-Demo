
#ReturnShield.AI Demo - Setup Guide
##For Local Development (ZIP Download Method)


#1. Prerequisites

Before beginning, ensure you have these installed:
Node.js (v16 or later) - Download here
npm (comes with Node.js) or Yarn - Yarn installation
Code editor (VS Code recommended)

#2. Setup Instructions
#Step 1: Extract the ZIP File

Locate the downloaded ReturnSheild.Ai-Demo.zip file.
Right-click rightarrow "Extract All" (Windows) or double-click (Mac/Linux).
Choose your destination folder (e.g., Documents/Projects/).
              Or 
Clone the Repository
git clone https://github.com/Priyanshigangrade/ReturnSheild.Ai-Demo.git
cd ReturnSheild.Ai-Demo


#Step 2: Open Project in Terminal

Open your terminal or command prompt.
Navigate to the project folder:
Bash
cd path/to/extracted/folder



#Step 3: Install Dependencies
Run either of the following commands :
npm install
# OR
yarn install



#Step 4: Configure Environment(Optional)
Rename .env.example to .env and update variables if needed (e.g., API keys for translation services).



#3. Running the Application
Development Mode
To run the application in development mode, use one of these commands:

npm start
# OR
npm run dev
# OR
yarn start


This will automatically open the application in your browser at http://localhost:3000.



#Test the AI Model

 TensorFlow.js loads automatically. Wait for the console log:
[AI] TensorFlow.js model loaded successfully.





#Simulate a Fraud Check
Seller Side: Upload 3 product images (front, back, label).
Buyer Side: Upload return image.
 Click "Check for Fraud" to see the AI comparison result.





#Production Build
To create an optimized production build, run:
Bash
npm run build


This command generates optimized files in the build/ folder.




