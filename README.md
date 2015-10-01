# Setting up ionic on your computer
  - npm install -g ios-sim
  - npm install -g cordova ionic

# App Simulation
  - ionic build ios
  - ionic emulate ios

# Debugging
  - ionic serve (This opens your app as a web app in your chrome. So you can use Chrome's console)

#Workflow
## Compiling and Simulating
  1. Run 'ionic build ios' to compile your app locally. Do this when you make changes.
  2. Run 'ionic emulate ios' to run your compiled app.

## Making changes
  1. After making changes on your inoic, rebase your feature branch with the latest master branch.
  2. Push your branch up to BananaFitness-Ionic
  3. Create a pull request