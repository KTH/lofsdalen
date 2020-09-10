#!/bin/bash

error() { printf "\n \033[0;31mERROR: $@\033[0;0m | $(date) \n"; }
passed() { printf "\n \033[0;32m   OK: $@\033[0;0m | $(date) \n\n"; }

MONITOR_URL="http://api:80/api/lofsdalen/_monitor";

curl $MONITOR_URL

PATTERN="APPLICATION_STATUS: OK" 

sleep 5s

RESPONSE="$(curl -s -S --max-time 30 $MONITOR_URL)"

if [[ $RESPONSE != *$PATTERN* ]]; then
    error "URL '$MONITOR_URL' does not contain '$PATTERN'."
    exit 1
fi

passed "Basic test passed for '$MONITOR_URL'."
    
exit 0
