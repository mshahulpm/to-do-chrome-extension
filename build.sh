rm -rf ./todo-extension
yarn build 
cp manifest.json dist/
cp dist ./todo-extension -r