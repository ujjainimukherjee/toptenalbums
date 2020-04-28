## Project requirements 
The user sees a list of top ten Albums in spotify. (S)he can reorder the list, remove items from the list. When user clicks on 'Search' on menu bar, (s)he is able to search with artist name or genre name (eg. 'Mike' or 'romantic'). The results are displayed in paginated view with 30 results paer page.
The user should be able to browse albums freely in a results view, click on one to view its details (hint hint, album endpoint) and pick one to add it to a list of Top 10 Albums of All Time.
When the user clicks on any album, (s)he is redirected to details page, which shows details of the album. If user clicks on the album, the album starts playing. 

I chose **Nextjs** as the framework because it provides server side rendering and is widely used by many large companies like Netflix, Uber Marketplace, Audible, etc. So it has been widely tested and there is a lot of community support.
Some of the important features in Nextjs are
- Hot Code Reloading
- Automatic Routing
- Server Rendering
- Automatic Code Splitting
- Single File Components for scoping styles


## Getting Started

In order to run the application on our local, we need to log in to spotify. For that we need the 'client ID' and 'client secret' from spotify API. These may be obtained by logging into spotify and going here - https://developer.spotify.com/dashboard/applications. 
In my project I have stored these values in an **.env** file at the project root. Please create an '.env' file and store the values like this-

SPOTIFY_CLIENT_ID=your_id
SPOTIFY_CLIENT_SECRET=your_secret.

To run the development server, please build first using **npm run build / yarn build**. This will optimize the code and make it faster.

Then, start the development server:
```
npm run express

```
The above command will run the express server and start serving the pages.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

(Note: if you do not add the client id and client password in the .env file, the project will not run)