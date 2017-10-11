/* global casper, serverIpAdress, userLogin, userPassword, adminLogin, adminPassword */

casper.resetDb(serverIpAdress, adminLogin, adminPassword);

casper.test.begin('ftp.edit', {
    test: function (test) {
        casper.start('http://' + serverIpAdress + '/index.php');
        casper.login(test, userLogin, userPassword);
        casper.createDomain(test, "domaine-ftp-edit.fr");
        casper.createFtp(test, "domaine-ftp-edit.fr", "test", "2oopa1uzt");
        casper.checkCommandLine(test, "bash", ['-c', 'curl ftp://user:2oopa1uzt@' + serverIpAdress + '']);
        casper.deleteFtp(test, "domaine-ftp-edit.fr", "user", "pass");
        casper.deleteDomain(test, "domaine-ftp-edit.fr");
        casper.logout(test);
        casper.run(function () {
            test.done();
        });
    }
});