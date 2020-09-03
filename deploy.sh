comment='New build'

if [ "$1" != "" ]
then 
  comment=$1
fi

npm run build && git commit -a -m "$comment" && npm version patch && git push
