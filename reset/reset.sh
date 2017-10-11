#!/bin/bash

# It should ensure there is a backup available
[ -f "/tmp/alternc.reset.backup.sql"  ] || mysqldump --defaults-file=/etc/alternc/my.cnf alternc --no-data > /tmp/alternc.reset.backup.sql

# It should drop the db
mysql --defaults-file=/etc/alternc/my.cnf alternc -e 'DROP DATABASE alternc;CREATE DATABASE alternc;'

# it should reinsert the db
mysql --defaults-file=/etc/alternc/my.cnf < "/tmp/alternc.reset.backup.sql" 

# It should reinsert the minimal records 
mysql --defaults-file=/etc/alternc/my.cnf < reset.data.sql 
