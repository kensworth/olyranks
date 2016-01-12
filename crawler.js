var Crawler = require("crawler");
var url = require('url');

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        

        if(result) {
            var page = result.body;
            //polish for bold name. cool.
            console.log($('.nazwa_pogrubiona').text());
        }
    }
});

var search = function(search) {
  return 'http://www.iwrp.net/?view=contestant&id_zawodnik=' + search;
};

//34000 is around the current number of weightlifters in the database. Hardcoded to bypass hacky DOM method to check whether the end of the database has been reached (currently triggers MySQL error at too high a number)
for(i = 1; i < 34000; i++) {
    c.queue({
        uri: search(i)
    });
}
