/* global casper, adminLogin, adminPassword, serverIpAdress, userPassword, userLogin */
casper.test.begin('hook.user.create', function (test) {
    casper.start('http://' + serverIpAdress + '/index.php');
    casper.login(test, adminLogin, adminPassword );
    casper.createUser(test, userLogin, userPassword);
//    casper.deleteUser(test, 'test', 'test');
    casper.logout(test);
    casper.run(function () {
        test.done();
    });
}
);
