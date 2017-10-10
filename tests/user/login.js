/* global casper, serverIpAdress */

casper.test.begin('user.login', function (test) {
    casper.start('http://' + serverIpAdress + '/index.php');

    casper.checkCommandLine(test,"/bin/bash",[ "-c" ,"sleep 10"]);
    casper.run(function () {
        test.done();
    });
}
);
