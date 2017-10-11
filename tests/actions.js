
/* global casper, useReset, serverIpAdress, adminLogin, adminPassword */

/**
 * Internal / Debugging. Generates a screenshot based on the test name & date
 * 
 * @param {object} test
 */
casper.doScreenshot = function (test) {
    if (typeof (test) !== "object") {
        this.echo("Huh. Seems you passed the wrong test object... Got " + test)
        var screenshotName = 'screenshots/' + new Date().toISOString() + '-' + '__undefined__.png';
    } else {
        var screenshotName = 'screenshots/' + new Date().toISOString() + '-' + test.currentSuite.name + '.png';
    }
    casper.echo('Saving screenshot to ' + screenshotName);
    casper.capture(screenshotName);
};

/**
 * Helper for building test methods : place in error callbacks to 
 * automatically get a screenshot + FAIL log
 * 
 * @param {object} test
 * @param {string} element
 */
casper.assertScreenshot = function (test, element) {
    this.doScreenshot(test);
    if (element) {
        test.assertExists(element);
    }
};

/**
 * Helper for building test methods : fill forms the simple way
 * 
 * @param {object} test
 * @param {string} element
 * @param {object} data
 * @returns Promise
 */
casper.setFormElement = function (test, element, data) {
    casper.waitForSelector(element,
            function success() {
                test.assertExists(element);
                this.fill(element, data, true);
            },
            function fail() {
                this.assertScreenshot(test, element);
            });
};

/**
 * Helper : checks presence of an element and clicks on it
 * 
 * @param {object} test
 * @param {string} element
 */
casper.clickElement = function (test, element) {
    casper.waitForSelector(element,
            function success() {
                test.assertExists(element);
                this.click(element);
            },
            function fail() {
                this.assertScreenshot(test, element);
            });
};

/**
 * Helper : checks presence of an element 
 * 
 * @param {object} test
 * @param {string} element
 */
casper.checkElement = function (test, element) {
    casper.waitForSelector(element,
            function success() {
                test.assertExists(element);
            },
            function fail() {
                this.assertScreenshot(test, element);
            });
};


/**
 * Helper : checks presence of the success div
 * 
 * @param {object} test
 */
casper.checkSuccess = function (test) {

    casper.waitForSelector("div[class='alert alert-success']",
            function success() {
                test.assertExists("div[class='alert alert-success']");
            }, function fail() {
        this.assertScreenshot(test, "div[class='alert alert-success']");
    });
};

/**
 * Hook to run on every test if you deployed the reset methon on server
 * 
 * @param {object} test
 * @returns {undefined}
 */
casper.resetDb = function (serverIpAdress, adminLogin, adminPassword) {
    if (useReset) {
        casper.test.begin('reset.db', function test(test) {
            casper.start('http://' + serverIpAdress + '/index.php');
            casper.waitForExec('/usr/bin/curl', ['http://' + adminLogin + ':' + adminPassword + '@' + serverIpAdress + '/reset.php'], function success(response) {
            }, function error(response) {
                casper.echo("Ouch. You got timeouted by casper:" + JSON.stringify(response.data));
            }, 20000, [20000, 40000]);
            casper.run(function () {
                test.done();
            });
        })
    }
};
/**
 * 
 * Helper. Encapsulates the waitForExec command for ease of use in test scenarios
 * 
 * @example     casper.checkCommandLine(test,"/bin/bash",[ "-c" ,"ls", "-lh","1>/dev/null"]);
 * @param {object} test
 * @param {string} command
 * @param {array} commandArgs
 * @param {number} timeout
 * @returns {undefined}
 */
casper.checkCommandLine = function (test, command, commandArgs, timeout) {

    casper.then(function () {

        var success = function (response) {
//            this.echo("Program finished by itself:" + JSON.stringify(response.data));
            test.assertTruthy(response.data.exitCode === 0, 'Command "' + command + '" with args "' + commandArgs.join(" ") + '"');
        };
        var error = function (timeout, response) {
//        this.echo("Program finished by casper:" + JSON.stringify(response.data));
            test.assertTruthy(response.data.elapsedTime < 0, 'Timed out (' + response.data.elapsedTime + 'ms) for command "' + command + '" with args "' + commandArgs.join(" ") + '"');
        };
        casper.waitForExec(command, commandArgs, success, error, timeout);
    })
};


/**
 * 
 * @param {object} test
 * @param {string} login
 * @param {string} pass
 */
casper.login = function (test, login, pass) {

// If no login form, let's logout
    casper.waitForSelector('form[action="login.php"]',
            function success() {
                this.echo("Login user in as " + login)
            },
            function fail() {
                casper.clickElement(test, "a[href='mem_logout.php']");
            });
    // Fill login form 
    casper.setFormElement(test, 'form[action="login.php"]', {
        username: login,
        password: pass
    });
    // Wait for menu
    casper.checkElement(test, "div[id=menu]");
};

/**
 * 
 * @param {object} test
 * @param {string} login
 * @param {string} pass
 
 */
casper.logout = function (test, login, pass) {

// Wait for menu
    casper.checkElement(test, 'div[id="menu"]');
    // Click logout
    casper.clickElement(test, 'a[href="mem_logout.php"]');
    // Wait for "ok"
    casper.checkElement(test, 'h3');

};


/**
 * 
 * @param {object} test
 * @param {string} login
 * @param {string} pass
 */
casper.createUser = function (test, login, pass) {

// Click "manage users"
    casper.clickElement(test, 'div[id="menu-admin"] a[href="adm_list.php"]');
    // Click add user
    casper.clickElement(test, 'a[href="adm_add.php"]');
    // Fill form
    casper.setFormElement(test, 'form[name="main"]', {
        login: login,
        pass: pass,
        passconf: pass,
        nom: login,
        prenom: login,
        nmail: login + "@example.tld"
    });
    casper.checkSuccess(test);
};


/**
 * 
 * @param {object} test
 */
casper.deleteUser = function (test) {
// It should wait for the menu and click on admin user
    casper.clickElement(test, 'div[id="menu-admin"] a[href="adm_list.php"]');
    // It should click on the first user checkbox
    casper.clickElement(test, 'form input[name="accountList[]"]');
    // It should click on delete user button
    casper.clickElement(test, 'form[action="adm_dodel.php"] input[type="submit"]');
    // It should wait on the confirmation page
    casper.checkElement(test, 'form[action="adm_dodel.php"] input[value="delete"][name="action"]');
    // It should click on confirm delete
    casper.clickElement(test, 'form[action="adm_dodel.php"] input[type="submit"]');
    casper.checkSuccess(test);
};

/**
 * 
 * @param {object} test
 */
casper.editUser = function (test) {
// click menu 
    casper.clickElement(test, 'div[id="menu-admin"] a[href="adm_list.php"]');
    // Click edit user
    casper.clickElement(test, 'a[href="adm_edit.php?uid=2001"]');
    // Fill form
    casper.setFormElement(test, 'form[name="main"]', {
        pass: 'testpass',
        passconf: 'testpass',
        nom: 'newname',
        prenom: 'newfirst',
        nmail: 'newmail@dom.tld'
    });
    casper.checkSuccess(test);
};

/**
 * 
 * @param {object} test
 * @param {string} domain
 * @returns {undefined}
 */
casper.createDomain = function (test, domain) {
// Click on new dom
    casper.clickElement(test, 'a[href="dom_add.php"]');
    // Validate form
    casper.setFormElement(test, 'form[action="dom_doadd.php"]', {newdomain: domain});
    // OK, no error
    casper.checkElement(test, "div[class='alert alert-success']");
    casper.checkSuccess(test);
};


/**
 * 
 * @param {object} test
 * @param {type} domain
 * @returns {undefined}
 */
casper.deleteDomain = function (test, domain) {

// Wait for domain edit button
    casper.clickElement(test, 'a[href="dom_edit.php?domain=' + domain + '"]');
    // click on delete
    casper.clickElement(test, 'a[href="#tabsdom-delete"]');
    // delete OK
    casper.clickElement(test, 'form[action="dom_dodel.php?domain=' + domain + '"] input[type=submit]');
    // wait for delete confirm
    casper.checkElement(test, 'form[action="dom_dodel.php"] input[name="del_confirm"]');
    // Yes, confirm delete
    casper.clickElement(test, "form[action='dom_dodel.php'] input[type=submit]");
    // OK, no error
    casper.checkElement(test, "div[class='alert alert-success']");
    casper.checkSuccess(test);
};

/**
 * 
 * @param {object} test
 * @param {string} domain
 * @returns {undefined}
 */
casper.createFtp = function (test, domain, login, pass) {
// Click on new dom
    casper.clickElement(test, '#menu-ftp a[href~="ftp_edit.php?create=1"]');
    // Validate form
    casper.setFormElement(test, 'form#main[action="ftp_doedit.php"]', {
        login: '',
        pass: pass,
        passconf: pass
    });
    // OK, no error
    casper.checkElement(test, "div[class='alert alert-success']");
    casper.checkSuccess(test);
};


/**
 * 
 * @param {object} test
 * @param {type} domain
 * @returns {undefined}
 */
casper.editFtp = function (test, domain, login, pass) {

    casper.then(function () {
        // Wait for domain edit button
        casper.clickElement(test, '#menu-ftp a[href="ftp_list.php"]');
        // click on edit
        casper.clickElement(test, 'div[class="ina edit"]:first-child a');
        // Validate form
        casper.setFormElement(test, 'form#main[action="ftp_doedit.php"]', {
            login: '',
            pass: pass,
            passconf: pass
        });
        // OK, no error
        casper.checkElement(test, "div[class='alert alert-success']");
        casper.checkSuccess(test);
    })
};
/**
 * 
 * @param {object} test
 * @param {type} domain
 * @returns {undefined}
 */
casper.deleteFtp = function (test, domain) {

// Wait for domain edit button
    casper.clickElement(test, '#menu-ftp a[href="ftp_list.php"]');
    // click on delete
    casper.clickElement(test, 'form[action="ftp_del.php"] input[type="checkbox"]');
    casper.clickElement(test, 'form[action="ftp_del.php"] input[type="submit"]');
    // click on delete confirm
    casper.clickElement(test, 'form#main[action="ftp_del.php"] input[type=submit]');
    // OK, no error
    casper.checkElement(test, "div[class='alert alert-success']");
    casper.checkSuccess(test);
};
