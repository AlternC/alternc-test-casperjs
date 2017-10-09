
/* global casper */

/**
 * Generates a screenshot based on the test name & date
 * 
 * @param {object} test
 */
casper.doScreenshot = function (test) {
    if( ! typeof ( test ) === "object" || ! typeof ( test.currentSuite ) === "object"){
    var screenshotName = 'screenshots/__undefined__' + '-' + new Date().toISOString() + '.png';
    }else{
        var screenshotName = 'screenshots/' + test.currentSuite.name + '-' + new Date().toISOString() + '.png';
    }
    casper.echo('Saving screenshot to ' + screenshotName);
    casper.capture(screenshotName);
};

/**
 * 
 * @param {object} test
 * @param string element
 */
casper.assertScreenshot = function (test, element) {
    this.doScreenshot(test);
    if (element) {
        test.assertExists(element);
    } else {
        test.assertFalsy(true);
    }
}

/**
 * Encapsulates fillForm 
 * 
 * @param {object} test
 * @param string element
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
}

/**
 * 
 * @param {object} test
 * @param string element
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
}

/**
 * 
 * @param {object} test
 */
casper.checkElement = function (test, element) {
    casper.waitForSelector(element,
            function success() {
                test.assertExists(element);
            },
            function fail() {
                this.assertScreenshot(element);
            });
}


/**
 * 
 * @param {object} test
 */
casper.checkSucess = function (test) {

    casper.waitForSelector("div[class='alert alert-success']",
            function success() {
                test.assertExists("div[class='alert alert-success']");
            }, function fail() {
        this.assertScreenshot(test, "div[class='alert alert-success']");
    });
}

/**
 * 
 * @param {object} test
 * @param string login
 * @param string pass
 */
casper.login = function (test, login, pass) {

    // If no login form, let's logout
    casper.waitForSelector('form[action="login.php"]',
            function success() {
            },
            function fail() {
                casper.clickElement(test, "a[href='mem_logout.php']");
            });
    // Fill login form 
    casper.setFormElement(test, 'form[action="login.php"]', {
        username: login,
        password: pass,
    });
    // Wait for menu
    casper.checkElement(test, "div[id=menu]");
}

/**
 * 
 * @param {object} test
 * @param string login
 * @param string pass
 
 */
casper.logout = function (test, login, pass) {

    // Wait for menu
    casper.checkElement(test, 'div[id=menu]');
    // Click logout
    casper.clickElement(test, 'a[href="mem_logout.php"]');
    // Wait for "ok"
    casper.checkElement(test, 'h3');

}


/**
 * 
 * @param {object} test
 * @param string login
 * @param string pass
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
        nmail: login + "@example.tld",

    });
    casper.checkSucess(test);
}


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
    casper.checkSucess(test);
}

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
        nmail: 'newmail@dom.tld',
    });
    casper.checkSucess(test);
}


casper.createDomain = function (test, domain) {
    // Click on new dom
    casper.clickElement(test, 'a[href="dom_add.php"]');
    // Validate form
    casper.setFormElement(test, 'form[action="dom_doadd.php"]', {newdomain: domain});
    // OK, no error
    casper.checkElement(test, "div[class='alert alert-success']");
    casper.checkSucess(test);
}


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
    casper.checkSucess(test);
}