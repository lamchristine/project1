var db = require("./models");


var sampleTrips = [];

sampleTrips.push({ country: "Germany",
                   city: "Berlin",
                   description: "Let's go visit all the biergardens!"
});
sampleTrips.push({ country: "Germany",
                   city: "Berlin",
                   description: "Can't wait to see the Berlin Wall!"
});
sampleTrips.push({ country: "Germany",
                   city: "Berlin",
                   description: "Anyone up to drink beer?!"
});
sampleTrips.push({ country: "Australia",
                   city: "Sydney",
                   description: "Can't wait to eat some meat pies and listen to some opera!"
});
sampleTrips.push({ country: "United States",
                   city: "San Francisco",
                   description: "Although huge in terms of offerings, San Francisco is physically quite compact. It is located on a seven-by-seven mile (11 x 11km) square of land at the tip of a peninsula between the San Francisco Bay and the Pacific coast. It has a population of 812,000 which represents a small fraction of the entire Bay Area population of 7.1 million. San Francisco is just one of the cities which makes up the entire San Francisco Bay Area. San Francisco's neighbors -Oakland and Berkeley east of the Bay Bridge, Marin County north of the Golden Gate Bridge, and the Peninsula south of the city are all part of separate counties, each with their own governments and local public transportation systems."
});
sampleTrips.push({ country: "Germany",
                   city: "Munich",
                   description: "Beautiful city"
});
sampleTrips.push({ country: "Brazil",
                   city: "Rio",
                   description: "Super hot"
});
sampleTrips.push({ country: "Chile",
                   city: "Santiago",
                   description: "Colorful houses"
});
sampleTrips.push({ country: "Brazil",
                   city: "Sao Paulo",
                   description: "Caiprivodka's rock!"
});
sampleTrips.push({ country: "Ecuador",
                   city: "Quito",
                   description: "So much to see for such a small country"
});
sampleTrips.push({ country: "Canada",
                   city: "Toronto",
                   description: "Best City in the world!"
});
sampleTrips.push({ country: "Canada",
                   city: "Toronto",
                   description: "Let's go Blue JAYS!!"
});
sampleTrips.push({ country: "Canada",
                   city: "Toronto",
                   description: "Go Leafs GO!!! Wahoo!"
});
sampleTrips.push({ country: "Canada",
                   city: "Vancouver",
                   description: "Skiing and boarding"
});


var postsList = [];

postsList.push({ name: 'Jack',
                  age: 34,
                image: "http://lorempixel.com/image_output/animals-q-c-200-200-6.jpg"
});
postsList.push({ name: "Jim",
                   age: 34,
                   image: "http://lorempixel.com/image_output/animals-q-c-200-200-1.jpg"
});
postsList.push({ name: 'Henry',
                   age: 23,
                   image: "http://lorempixel.com/image_output/animals-q-c-200-200-2.jpg"
});
postsList.push({ name: 'Bill',
                   age: 44,
                   image: "http://lorempixel.com/image_output/animals-q-c-200-200-3.jpg"
});
postsList.push({ name: 'Ryan',
                   age: 25,
                   image: "http://lorempixel.com/image_output/animals-q-c-200-200-5.jpg"
});
postsList.push({ name: 'Jane',
                   age: 63,
                   image: "http://lorempixel.com/image_output/animals-q-c-200-200-4.jpg"
});
postsList.push({ name: 'Doe',
                   age: 27,
                   image: "http://lorempixel.com/image_output/animals-q-c-200-200-9.jpg"
});



postsList.forEach(function (post) {
  //randomize samplelist
  function shuffleArray(sampleTrips) {
    for (var i = sampleTrips.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = sampleTrips[i];
        sampleTrips[i] = sampleTrips[j];
        sampleTrips[j] = temp;
    }
    console.log(sampleTrips[0].name);
    return sampleTrips;
  } shuffleArray(sampleTrips);

  var removedTrips = sampleTrips.slice(0,3);
  post.trips = removedTrips;
});


db.Post.remove({}, function(err, posts){
  db.Post.create(postsList, function (err, posts){
    if (err) {return console.log('Error', err); }
    console.log("all posts:", posts);
    process.exit();
  });
});
