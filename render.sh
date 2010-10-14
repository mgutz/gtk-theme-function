#!bash

version=0.4.8

node lib/gtkrc.js
node lib/metacity.js 

themes=('Function' 'Function Dot' 'Function Shiny' 'Lambda' 'Lambda Dot' 'Lambda Shiny' 'Lambda SO X')
for i in ${!themes[@]}
do
  theme=${themes[i]}
  rm -rf "../$theme/metacity-1/images"
  cp -R metacity-1/images "../$theme/metacity-1"
done


themes=("${themes[@]}" 'Fn Dark' 'Fn Gloss' 'Fn Smooth')

cd ..
# Function is not in list above since it is the master from which files are copied
tar cfz $version.tar.gz "${themes[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
cd Function
