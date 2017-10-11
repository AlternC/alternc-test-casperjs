/* global casper, serverIpAdress, userLogin, userPassword */
casper.test.begin('user.login', function (test) {
    casper.start('http://' + serverIpAdress + '/index.php');
    casper.login(test, userLogin, userPassword );
    casper.logout(test);
    casper.run(function () {
        test.done();
    });
}
);