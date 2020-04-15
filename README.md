## Project requirements 

**Your app should be server-side rendered and served via a nodeJS server.**

I chose Nextjs as the framework because it provides server side rendering and is widely used by many large companies like Netflix, Uber Marketplace, Audible, etc. So it has been widely tested and there is a lot of community support.


**Your app needs to call the Spotify "search" API endpoint with a query, any valid search term, and display a list of albums, paginated. Albums only**

For the above, I chose https://www.npmjs.com/package/node-spotify-api library because it allows us to do a query to spotify to give album list and details of each album

**Your app needs to call the Spotify "search" API endpoint with a query, any valid search term, and display a list of albums, paginated. Albums only**

I have used React https://ant.design/ library to create an input button to let the users enter the query term. After that I am redirecting the user to the page which shows all the albums. The albums have been displayed using CSS grid features. Redirection is done using nextjs routing

**The user should be able to browse albums freely in a results view, click on one to view its details (hint hint, album endpoint) and pick one to add it to a list of Top 10 Albums of All Time!**

When the user clicks on any album, (s)he is redirected to details page, which shows details of the album. If user clicks on the album, the album starts playing



## Check in as of 04/15/2020
Implemented the app with Nextjs for server side rendering. This was done using create-next-app command
Integration with spotify API was done using the https://www.npmjs.com/package/node-spotify-api.
Was able to successfully
  search all albums by giving a query item, eg. artist name or genre of music
on clicking on each album was able to show the details of each album and play each album on spotify
Used nextjs routing to navigate between pages
UI features implemented were
Home page allows the user to search for all albums by giving a search query in an input
User is redirected to the page where all albums are shown. We are showing 20 albums at the time of first search
If user clicks on any album image, (s)he is redirected to details page, which shows details of the album. If user clicks on the album, the album starts playing
Added eslint for static code analysis.
Added prettier for code formatting
Set up the initial environment for unit testing using jest


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.