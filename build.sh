#!/bin/bash

version=0.5.7

node lib/gtkrc.js
node lib/metacity.js 

# always copy images
themes=('Function' 'Function Dot' 'Function Raven' 'Function Shiny' 'Lambda' 'Lambda Dot' 'Lambda Raven' 'Lambda Shiny' 'SO X.' 'SO X. Left' 'SO X. Bar' 'SO X. Bar Left' 'SO X. X' 'SO X. IO' 'SO X. IO Left')
for i in ${!themes[@]}
do
  theme=${themes[i]}
  rm -rf "../$theme/metacity-1/images"
  cp -R metacity-1/images "../$theme/metacity-1"
done

gtks=('Fn Dark' 'Fn Gloss' 'Fn Smooth')
for i in ${!gtks[@]}
do
    images=('blank.png' 'statusgrip.png' 'handlebox.png')
    for j in ${!images[@]}; do
        cp gtk-2.0/${images[j]} "../${gtks[i]}/gtk-2.0"
    done 
done

# add controls to array
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
sox=('Fn Gloss' 'SO X.' 'SO X. Left' 'SO X. Bar' 'SO X. Bar Left' 'SO X. X' 'SO X. X Left' 'SO X. IO' 'SO X. IO Left')

soxdebian=("${sox[@]}" 'SO X Debian' 'SO X Debian Bar' 'SO X Debian IO' 'SO X Debian X')
soxdebianL=("${sox[@]}" 'SO X Debian Left' 'SO X Debian Bar Left' 'SO X Debian IO Left' 'SO X Debian X Left')

soxubuntu=("${sox[@]}" 'SO X Ubuntu' 'SO X Ubuntu Bar' 'SO X Ubuntu IO' 'SO X Ubuntu X')
soxubuntuL=("${sox[@]}" 'SO X Ubuntu Left' 'SO X Ubuntu Bar Left' 'SO X Ubuntu IO Left' 'SO X Ubuntu X Left')

soxmint=("${sox[@]}" 'SO X Mint' 'SO X Mint Bar' 'SO X Mint IO' 'SO X Mint X')
soxmintL=("${sox[@]}" 'SO X Mint Left' 'SO X Mint Bar Left' 'SO X Mint IO Left' 'SO X Mint X Left')

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

tar cfz SOX-Debian-Left-$version.tar.gz "${soxdebianL[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfz SOX-Ubuntu-Left-$version.tar.gz "${soxubuntuL[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfz SOX-Mint-Left-$version.tar.gz "${soxmintL[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp

tar cfz SSOX-$version.tar.gz \
    SOX-Debian-$version.tar.gz SOX-Debian-Left-$version.tar.gz\
    SOX-Ubuntu-$version.tar.gz SOX-Ubuntu-Left-$version.tar.gz \
    SOX-Mint-$version.tar.gz SOX-Mint-Left-$version.tar.gz \
    --exclude=.git --exclude=.gitignore --exclude=.*swp

rm SOX*tar.gz

mv SSOX-$version.tar.gz SOX-distros-$version.tar.gz

cd src 
