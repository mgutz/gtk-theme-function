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
squared=('Fn Gloss' 'Fn IO' 'Fn Smooth' 'Function' 'Function IO' 'Function Shiny')
rounded=('Fn Gloss' 'Fn IO'  'Fn Smooth' 'Lambda' 'Lambda IO' 'Lambda Shiny')
extras=('Fn Dark' 'Fn Smooth' 'Function Dot' 'Function Raven' 'Lambda Dot' 'Lambda Raven')
sox=('Fn Gloss' 'Fn IO' 'SO X.' 'SO X. Left' 'SO X. Bar' 'SO X. Bar Left' 'SO X. X' 'SO X. X Left' 'SO X. IO' 'SO X. IO Left')

soxdebian=("${sox[@]}" 'SO X Debian' 'SO X Debian Bar' 'SO X Debian IO' 'SO X Debian X')
soxdebianL=("${sox[@]}" 'SO X Debian Left' 'SO X Debian Bar Left' 'SO X Debian IO Left' 'SO X Debian X Left')

soxubuntu=("${sox[@]}" 'SO X Ubuntu' 'SO X Ubuntu Bar' 'SO X Ubuntu IO' 'SO X Ubuntu X')
soxubuntuL=("${sox[@]}" 'SO X Ubuntu Left' 'SO X Ubuntu Bar Left' 'SO X Ubuntu IO Left' 'SO X Ubuntu X Left')

soxmint=("${sox[@]}" 'SO X Mint' 'SO X Mint Bar' 'SO X Mint IO' 'SO X Mint X')
soxmintL=("${sox[@]}" 'SO X Mint Left' 'SO X Mint Bar Left' 'SO X Mint IO Left' 'SO X Mint X Left')

cd ..
tar cfj Function-$version.tar.bz2 "${squared[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfj Lambda-$version.tar.bz2 "${rounded[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfj Extras-$version.tar.bz2 "${extras[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfj SOX-$version.tar.bz2 "${sox[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfj Function-Lambda-$version.tar.bz2 Function-$version.tar.bz2 Lambda-$version.tar.bz2 Extras-$version.tar.bz2 SOX-$version.tar.bz2

rm Function-$version.tar.bz2 
rm Lambda-$version.tar.bz2 
rm Extras-$version.tar.bz2 
rm SOX-$version.tar.bz2

tar cfj SOX-Debian-$version.tar.bz2 "${soxdebian[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfj SOX-Ubuntu-$version.tar.bz2 "${soxubuntu[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfj SOX-Mint-$version.tar.bz2 "${soxmint[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp

tar cfj SOX-Debian-Left-$version.tar.bz2 "${soxdebianL[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfj SOX-Ubuntu-Left-$version.tar.bz2 "${soxubuntuL[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp
tar cfj SOX-Mint-Left-$version.tar.bz2 "${soxmintL[@]}" --exclude=.git --exclude=.gitignore --exclude=.*swp

tar cfj SSOX-$version.tar.bz2 \
    SOX-Debian-$version.tar.bz2 SOX-Debian-Left-$version.tar.bz2\
    SOX-Ubuntu-$version.tar.bz2 SOX-Ubuntu-Left-$version.tar.bz2 \
    SOX-Mint-$version.tar.bz2 SOX-Mint-Left-$version.tar.bz2 \
    --exclude=.git --exclude=.gitignore --exclude=.*swp

rm SOX*tar.bz2

mv SSOX-$version.tar.bz2 SOX-distros-$version.tar.bz2

cd src 
