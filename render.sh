#!bash

version=0.4.8

node lib/gtkrc.js
node lib/metacity.js 


# always copy images
themes=('Function' 'Function Dot' 'Function Raven' 'Function Shiny' 'Lambda' 'Lambda Dot' 'Lambda Raven' 'Lambda Shiny' 'Lambda SO X')
for i in ${!themes[@]}
do
  theme=${themes[i]}
  rm -rf "../$theme/metacity-1/images"
  cp -R metacity-1/images "../$theme/metacity-1"
done

# add controls
themes=("${themes[@]}" 'Fn Dark' 'Fn Gloss' 'Fn Smooth')


# add info files
for i in ${!themes[@]}
do
  theme=${themes[i]}
  echo "AUTHOR: Mario Gutierrez (mgutz)" > "../$theme/README.txt"
  echo "VERSION: $version" >> "../$theme/README.txt"
  echo "" >> "../$theme/README.txt"
  cat README.md >> "../$theme/README.txt"
done

# always include GTK controls for each set
squared=('Fn Dark' 'Fn Gloss'  'Fn Smooth' 'Function' 'Function Dot' 'Function Raven' 'Function Shiny')
rounded=('Fn Dark' 'Fn Gloss'  'Fn Smooth' 'Lambda' 'Lambda Dot' 'Lambda Raven' 'Lambda Shiny')

cd ..
tar cfz Function-$version.tar.gz "${squared[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfz Lambda-$version.tar.gz "${rounded[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
cd src 
