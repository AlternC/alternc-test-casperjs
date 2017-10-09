var serverIpAdress='185.34.33.40';
var x = require('casper').selectXPath;
casper.options.viewportSize = {width: 1489, height: 404};
casper.on('page.error', function(msg, trace) {
   this.echo('Error: ' + msg, 'ERROR');
   for(var i=0; i<trace.length; i++) {
       var step = trace[i];
       this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
   }
});
