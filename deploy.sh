comment='New build'

if [ "$1" != "" ]
then 
  comment=$1
fi

git commit -a -m "$comment" && npm version patch && npm run build && git push
