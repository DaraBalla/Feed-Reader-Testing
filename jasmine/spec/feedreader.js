/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that run against the application.
 */

/* All of my tests are placed within the $() function,
 * since some of these tests may require DOM elements. I want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
    
    /** This suite is all about the RSS feeds definitions, 
     * the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {
        
        /** This test is written to make sure that the allFeeds
         *  variable has been defined and that it is not empty.
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /** This test loops through each feed in the allFeeds
         *  object and ensures it has a URL defined and that
         *  the URL is not empty.
         */

        it('URL is defined', function() {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
            
        });

        /** This test loops through each feed in the allFeeds
         *  object and ensures it has a name defined and that
         *  the name is not empty.
         */

        it('name is defined', function() {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);                
            });
        });
    });



    describe('The menu', function() {

        
        // This test ensures the menu element is hidden by default.

         it('Menu is hidden', function() {
            var body = $('body');
            expect(body.hasClass('menu-hidden')).toBe(true);
         })

         /** This test ensures the menu changes visibility
          *  when the menu icon is clicked.
          */

         it('Menu changes visibility', function() {
            var body = $('body');
            var menu = $('.menu-icon-link');

            menu.click();
            expect(body.hasClass('menu-hidden')).toBe(false); 

            menu.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
         }); 
    });



    describe('Initial Entries', function() {
        
            
        /** This test ensures when the loadFeed function is called
         *  and completes its work, there is at least a single .entry
         *  element within the .feed container.
         */

        beforeEach(function(done) {
                loadFeed(0,done);
        });
        

        it('entry element within the .feed container', function() {
            var entryEl = document.querySelectorAll('.feed .entry');
            expect(entryEl.length).not.toBe(0);
        });

    });



    describe('New Feed Selection', function() {
        
        
        /** This test ensures when a new feed is loaded by the loadFeed
         *  function that the content actually changes.
         */

        let oldFeed;
        let newFeed;         

        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $('.feed').html();
                loadFeed(1, function() {
                    newFeed = $('.feed').html();
                })
                done();
            })
        })
        

        it('Content changed after loading new feed', function() {
            expect(oldFeed).not.toBe(newFeed);
        });
        
    });
}());
