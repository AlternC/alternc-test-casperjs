casper.test.begin('user.delete', function (test) {
    casper.start('http://' + serverIpAdress + '/index.php');
    casper.login(test, 'admin', 'admin');
    casper.createUser(test, 'test', 'test');
    casper.deleteUser(test, 'test', 'test');
    casper.logout(test);
    casper.run(function () {
        test.done();
    });
}
);
