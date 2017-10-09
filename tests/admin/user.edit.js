/* global casper, serverIpAdress */

casper.test.begin('user.edit', function (test) {
    casper.start('http://' + serverIpAdress + '/index.php');
    casper.login(test, 'admin', 'admin');
    casper.createUser(test, 'test', 'test');
    casper.editUser(test);
    casper.deleteUser(test);
    casper.logout(test);
    casper.run(function () {
        test.done();
    });
}
);
