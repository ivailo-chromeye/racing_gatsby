## Wordpress integration
We are using `gatsby-source-wordpress` plugin. Its configuration is in `gatsby-config.js`. [Link](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/)
What we have problems with is **excluded routes** - still we haven't found a way to exclude **all** the routes. 

## Gatsby overall info
We have used 2 ways to create pages in gatsby. `createPage` method to dynamically create pages or a file inside `/pages` dir. With `createPage` we can add data to context of the used template, which we then can access with props.

## Different libraries
We actually experimented with `styled components`, `redux` and so on, but decided to keep it as simple as possible, so we don't have global state management and for css we are using css modules. 

## Data
The main problem we had at the start is that we had 28 races, but we didn't have a way to make one api call to get all the information about them, basically we had to make 28 api calls and that's just for info about the race.. API calls:
- race info
- runners
- verdict
- betting forecast
- (there were others before that too)

For every race we had to make these api calls, combine them with data from wordpress ( the client fills custom fields )..

So, to sum the different methods we have tried for extracting data so far are:
- standart wp_remote_get() with php or curl equivalent..
- using **admin-ajax** - dunno how familiar you are with it, we are sending ajax POST request to `echo admin_url('admin-ajax.php')` and for body the parameter that is required is **action**, which points to a function somewhere in functions.php or a plugin.. It's really standard for wordpress ( poor decision in my opinion ), but that's the wp way. Then we have access to WP itself, we can call wp methods as well as php methods..
- from json feeds
- from wordpress itself - we insert the data with a plugin or another way..

Basically, we have tried many ways, but we have never been certain which is the correct one for our use case.

## Wordpress post types
### Race - https://rp.chromeye.com/royal-ascot/wp-admin/post.php?post=356&action=edit
- Tip section - tip for a horse, we needed to find a way to insert all the horses, so the client can add a tip for a horse. The other tip section fields are for text. Racingpost Tip Text and Race Preview Text are used in tips pages for different days tips/day-1, etc 
- Free bets - choose offers from free bets post types, different filters for desktop and mobile
- Manual text - simple text for different text sections on the page
- Race Data - currently it's dynamic from **ci** plugin
- Custom banner - unused for royal-ascot/cheltenham, the idea was to have different image only for the first race of the day
- First Race Skybet Banners - similar to custom banner but for skybet offers, again unused.
- /Odds pages - text fields
- /Tips pages - similar
- Custom Meta description - for SEO
- Results Section - was intended for results page, but unused
- Advertisement
- Runners tab - unused, we are getting runners, either with ajax to admin-ajax or from json feed
- MBO banner - dunno

## Search component - present on both /races/ and /races/{raceID} pages
It needs to list all the runners and races in which they participate. The links need to open in a new window pointing to racing post. Currently its coming from the feed.

## Structure of /races/ page - for all the races
### RacesListTop
object with day as the key and races array as the value, probably should've used Map..

### ScrollBox - when clicking on each of the elements scroll to the corresponding section

### RaceInfo - displays basic info about the race - title, time, date, etc.
Currently, the data is coming from the feed, before that we have used data from wordpress itself (from the plugin), with php, with admin-ajax.. tried many things before that..

### RaceControls
we used to have switch odds there, but since odds are coming from diffusion and don't have active races now, we are not using it.

### TextBox - very simple component for displaying text

### Offers - uses FreeBetsShortForm component

### RaceRunners - sorted runners and active filter
currently runners come from the feed, before we have used php, admin-ajax, or wp itself..

### Betting forecast
as with RaceInfo, has used data from different sources, currently from the feed

### VERDICT - 
as with RaceInfo, has used data from different sources, currently from the feed
### PREVIOUS GOLD CUP WINNERS (table) - wp data
### KEY GOLD CUP STATS - wp data
### WHAT HAPPENED LAST YEAR - wp data

## Buttons small component
This got very mixed up, total mess, because we had to use different tags... just needs to be rewritten
