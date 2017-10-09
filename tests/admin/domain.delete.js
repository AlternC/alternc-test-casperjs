/* global casper, serverIpAdress */

casper.test.begin('domain.delete', function (test) {
    casper.start('http://' + serverIpAdress + '/index.php');
    casper.login(test, 'admin', 'admin');
    casper.createDomain(test, 'domaine-delete.fr');
    casper.deleteDomain(test, 'domaine-delete.fr');
    casper.logout(test);
    casper.run(function () {
        test.done();
    });
}
);
