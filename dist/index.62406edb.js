const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
}; // https://forkify-api.herokuapp.com/v2
 ///////////////////////////////////////
 /*
  Readme:

  Before we need to initialize a new project by writing : 
  npm init
 And so this command will then create a package .json file.
 name: forkify
 version : (1.0.0)
 decrip: Recipe application
 entry point: (index.js)
 test command: 
 git repository:
 keywords:
 author: Seidy KANTE

Do some modification in package.js (in "scripts") like;
"start": "parcel index.hmtl",
"build": "parcel build index.html" 

Now, in order to actually run Parcel, of course we need to install it
Terminal:
npm install parcel -D / npm install parcel@next -D / npm install parcel@2 -D

To run:
npm run start / npm start

*/ 

//# sourceMappingURL=index.62406edb.js.map
