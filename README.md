# BananaFit (powered by Ionic)

  Social platform for fitness enthuiasts and their friends.

  Allows the user to share workouts and follow the plans of others. A great way to have a collection of all your friends'
  fitness plans.

  Current implementations of collaborative fitness do not make it easy for users to create workout templates
  that are easily usable/sharable with their friends. Current implementations do not allow users to access every detail
  of other users workouts, which would helpful for those trying to achieve certain fitness goals.
  
  Bananafit provides a medium for collabortive sharing of fitness plans.

Customer Endorsement
  "Follow your fitness or at least the fitness of others" -Derrick
  
# Contributing

## General Workflow

1. Fork the repo

2. In your console, clone the repo.

git clone https://github.com/<your_username>/BananaFitness-Ionic.git

3. Make a branch for the issue you're trying to fix
git checkout -b <title>

4. Make changes to fix the issue and commit with the issue number. Using an editor is prefered over '-m'
git commit -m '[close #<num>] <descripting commit message>'

5. We use a rebase workflow. 

git pull --rebase origin master

6. Follow the console.

Push to your fork

git push origin HEAD

7. Make pull request.
Once the pull request has been reviewed, it will be merged by another member of the team. 

Guidelines

Uphold the current code standard:
Keep your code DRY
Follow STYLE-GUIDE.md
Run tests before submitting a pull request.
Your pull request is comprised of a single commit.
Commit messages should be written in the present tense. For example, "Fix continuous integration script".

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
  - Try deleting the platforms directory, adding ios platform, and rebuilding the app.
