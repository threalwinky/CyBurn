#!/bin/bash
url="$1"
if [ -z "$url" ]; then
  echo "Usage: $0 <url>"
  exit 1
fi
# echo "Scanning URL: $url"
code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
echo "$code"