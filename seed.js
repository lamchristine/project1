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
sampleTrips.push({ country: "Australia",
                   city: "Arlie Beach",
                   description: "Relaxing and surfing on the beach!"
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
  post.trips = sampleTrips;
});

db.Post.remove({}, function(err, posts){
  db.Post.create(postsList, function (err, posts){
    if (err) {return console.log('Error', err); }
    console.log("all posts:", posts);
    process.exit();
  });
});
