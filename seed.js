var db = require("./models");


var sampleTrips = [];

sampleTrips.push({ country: "Germany",
                   city: "Berlin"
});
sampleTrips.push({ country: "Australia",
                   city: "Sydney"
});
sampleTrips.push({ country: "United States",
                   city: "San Francisco"
});
sampleTrips.push({ country: "Australia",
                   city: "Arlie Beach"
});



var postsList = [];

postsList.push({ name: 'Jack',
                   age: 34
});
postsList.push({ name: "Jim",
                   age: 34
});
postsList.push({ name: 'Henry',
                   age: 23
});
postsList.push({ name: 'Bill',
                   age: 44
});
postsList.push({ name: 'Ryan',
                   age: 25
});
postsList.push({ name: 'Jane',
                   age: 63
});
postsList.push({ name: 'Doe',
                   age: 27
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
