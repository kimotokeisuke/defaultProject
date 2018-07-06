#!/bin/bash
open -a "/Applications/Max.app"
 
sleep 30s
cd "${0%/*}"
cd ".."
echo $PWD
echo 'opening' $(find .  -name  '*.maxproj')
find .  -name  '*.maxproj' -exec open {} \;
