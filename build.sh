#!bash

version=0.5.2

node lib/gtkrc.js
node lib/metacity.js 


# always copy images
themes=('Function' 'Function Dot' 'Function Raven' 'Function Shiny' 'Lambda' 'Lambda Dot' 'Lambda Raven' 'Lambda Shiny' 'SO X.' 'SO X. Bar' 'SO X. X' 'SO X. Left')
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
squared=('Fn Dark' 'Fn Gloss'  'Fn Smooth' 'Function' 'Function Raven' 'Function Shiny')
rounded=('Fn Dark' 'Fn Gloss'  'Fn Smooth' 'Lambda' 'Lambda Raven' 'Lambda Shiny')
extras=('Fn Smooth' 'Function Dot' 'Lambda Dot')
sox=('Fn Gloss' 'SO X.' 'SO X. Bar' 'SO X. Left' 'SO X. X')
soxdebian=('Fn Gloss' 'SO X.' 'SO X. Bar' 'SO X. Left' 'SO X. X' 'SO X Debian' 'SO X Debian Bar' 'SO X Debian Left' 'SO X Debian X')
soxubuntu=('Fn Gloss' 'SO X.' 'SO X. Bar' 'SO X. Left' 'SO X. X' 'SO X Ubuntu' 'SO X Ubuntu Bar' 'SO X Ubuntu Left' 'SO X Ubuntu X')
soxmint=('Fn Gloss' 'SO X.' 'SO X. Bar' 'SO X. Left' 'SO X. X' 'SO X Mint' 'SO X Mint Bar' 'SO X Mint Left' 'SO X Mint X')

cd ..
tar cfz Function-$version.tar.gz "${squared[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfz Lambda-$version.tar.gz "${rounded[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfz Extras-$version.tar.gz "${extras[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfz SOX-$version.tar.gz "${sox[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfz Function-Lambda-$version.tar.gz Function-$version.tar.gz Lambda-$version.tar.gz Extras-$version.tar.gz SOX-$version.tar.gz

rm Function-$version.tar.gz 
rm Lambda-$version.tar.gz 
rm Extras-$version.tar.gz 
rm SOX-$version.tar.gz

tar cfz SOX-Debian-$version.tar.gz "${soxdebian[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfz SOX-Ubuntu-$version.tar.gz "${soxubuntu[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfz SOX-Mint-$version.tar.gz "${soxmint[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp

tar cfz SSOX-$version.tar.gz SOX-Debian-$version.tar.gz SOX-Ubuntu-$version.tar.gz SOX-Mint-$version.tar.gz --exclude=.git --exclude=.gitignore --exclude=.*swp

rm SOX*tar.gz

mv SSOX-$version.tar.gz SOX-distros-$version.tar.gz

cd src 



