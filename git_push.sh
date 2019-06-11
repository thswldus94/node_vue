#!/bin/bash

# git commit and push script

echo -e "Enter the comment: "
read comment

git add --all
git status

git commit -m "$comment"
git push -u origin master
