var db = require("./models");


var sampleTrips = [];

sampleTrips.push({ country: "Germany",
                   city: "Berlin",
                   description: "Let's go visit all the biergardens!"
});
sampleTrips.push({ country: "Australia",
                   city: "Sydney",
                   description: "Can't wait to eat some meat pies and listen to some opera!"
});
sampleTrips.push({ country: "United States",
                   city: "San Francisco",
                   description: "Hope it's not too foggy."
});
sampleTrips.push({ country: "Denmark",
                   city: "Copenhagen",
                   description: "Dining at Noma!"
});
sampleTrips.push({ country: "Germany",
                   city: "Munich",
                   description: "Beautiful city"
});
sampleTrips.push({ country: "Norway",
                   city: "Oslo",
                   description: "This is way more expensive than Stockholm!"
});
sampleTrips.push({ country: "Brazil",
                   city: "Rio",
                   description: "Super hot"
});
sampleTrips.push({ country: "Peru",
                   city: "Cusco",
                   description: "Hate the altitude but love the llamas"
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
sampleTrips.push({ country: "Cambodia",
                   city: "Siem Reap",
                   description: "Let's go explore Ankor Wat...Tomb Raider style"
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
