## Configure git
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/sergiosoba/pollocampero.git
git push origin main

## Configure heroku
heroku login
heroku git:remote -a pollocampero
git push heroku HEAD:master

## Commit
git add .
git commit -m "texto"
git push origin main
git push heroku HEAD:master

## Help
heroku logs --tail