/* global casper, adminLogin, adminPassword, serverIpAdress, userPassword, userLogin */
casper.test.begin('hook.user.delete', function (test) {
    casper.start('http://' + serverIpAdress + '/index.php');
    casper.login(test, adminLogin, adminPassword );
    casper.deleteUser(test, userLogin, userPassword);
    casper.logout(test);
    casper.run(function () {
        test.done();
    });
}
);
