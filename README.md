# Setting up ionic on your computer
  - Run 'npm install -g ios-sim'
  - Run 'npm install -g cordova ionic'
  - Clone the repo, and go into it
  - Run 'bower install'
  - Run 'npm install'
  - Run 'ionic platform add ios'

# Running it
  - ionic build ios
  - ionic emulate ios
  
# Debugging
  - ionic serve (This opens your app as a web app in your chrome. So you can use Chrome's console)

#Workflow
## Simulating the app
  1. Pull/Rebase the latest changes from the repo
  3. Run 'ionic build ios' to compile your app locally. Do this when you make changes.
  4. Run 'ionic emulate ios' to run your compiled app.
  
## Making changes
  1. After making changes on your inoic, rebase your feature branch with the latest master branch.
  2. Push your branch up to BananaFitness-Ionic
  3. Create a pull request

#Build failure
  - Try deleting the platform directory and rebuilding the app.