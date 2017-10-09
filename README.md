# alternc-test-casperjs


![alt text](https://github.com/AlternC/alternc-test-casperjs/raw/master/cast/admin.domain.delete.gif "A test example")

## Status 

This is still in beta. Help appreciated. See List of todo further.

# Requirements 

* node / npm [sudo apt install node]
* phantomjs [sudo apt install phantomjs]
* casperjs [sudo npm install -g casperjs]

# Usage 

casperjs test admin/domain.delete.js --includes=params.js,actions.js

## List of todo checks:

alternc.user.pass.change
alternc.user.login.fail
alternc.admin.user.setadmin
alternc.admin.super.user.create
alternc.admin.super.user.quota.view
alternc.bro.file.create
alternc.bro.perms.change
alternc.bro.archive.dezip
alternc.bro.folder.lock
alternc.admin.quota.view
alternc.user.delete
alternc.mysql.db.delete
alternc.mysql.user.delete
alternc.mysql.phpmyadmin.sso
alternc.domain.sub.create.vhost.http
alternc.domain.sub.create.vhost.https
alternc.domain.sub.create.redirect.ip
alternc.domain.sub.create.redirect.url
alternc.domain.sub.create.mx.primary
alternc.domain.sub.create.mx.secondary
alternc.domain.sub.create.mx.TXT
alternc.mail.create.alias
alternc.mail.create.box
alternc.mail.create.catchall
alterc.ftp.edit

mailman.list.edit
mailman.list.login

roundcube.login
roundcube.filter.edit
roundcube.pass.change
roundcube.domain.sub.create.roundcube

squirrelmail.login
squirrelmail.filter.edit
squirrelmail.pass.change
squirrelmail.domain.sub.create.squirrelmail

