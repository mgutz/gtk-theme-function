#!bash

version=0.4.7

node lib/gtkrc.js
node lib/metacity.js 

themes=('Function Dot' 'Function Shiny' 'Lambda' 'Lambda Dot' 'Lambda Shiny')
for i in ${!themes[@]}
do
  theme=${themes[i]}
  rm -rf "../$theme/metacity-1/images"
  cp -R metacity-1/images "../$theme/metacity-1"
done

cd ..
# Function is not in list above since it is the master from which files are copied
tar cfz $version.tar.gz Function "${themes[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
cd Function
