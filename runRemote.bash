function apply() {
  ssh -i ~/.ssh/need-mask root@167.172.96.230 "
  cd /etc/hasura;
  version=\$(hasura migrate status | grep $1 | awk '{print \$1}');
  hasura apply --version $version" &
  wait
}

function pull() {
  rm -rf hasura
  scp -i ~/.ssh/need-mask -r root@167.172.96.230:/etc/hasura/ .
}

# Check if the function exists (bash specific)
if declare -f "$1" > /dev/null
then
  # For when we want to call special helper functions
  "$@"
else
  # Else we can just run anything we want on the remote server
  ssh -i ~/.ssh/need-mask root@167.172.96.230 "cd /etc/hasura; $@" &
  wait
fi
