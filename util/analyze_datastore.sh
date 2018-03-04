#!/bin/bash
set -e

# pull store from device
adb pull /data/data/org.iimog.xmobile/databases/RKStorage
# exemplary extraction of the game collection
sqlite3 RKStorage 'SELECT * FROM catalystLocalStorage;' | cut -f2- -d"|" | jq '.collection | fromjson'
