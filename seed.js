var db = require("./models");


var sampleTrips = [];

sampleTrips.push({ country: "Canada",
                   city: "Toronto",
                   description: "looking for travel partners in just those countries. i know my dates. if you're in the area lets hang out or even better EAT! i don't know how i'm not 1000 lbs. also if you happen to know how i could get involved in volunteering in Torono, please message me. (please dont lecture me on the dangers or etc in toronto - just message me about toronto if you know of an org or a contact. thank you)"
});
// sampleTrips.push({ country: "Germany",
//                    city: "Munich",
//                    description: "Hi! I'm Sydney, 22 .Will be traveling Europe for 5 months before moving to Australia. I'm arriving in Munich on the 15th of May. I don't have a set plan I usually just go with the flow. I like to dive, hike, get to know the local culture, and enjoy the night life. I love getting to know other people, and learning about other ways of life."
// });
sampleTrips.push({ country: "Germany",
                   city: "Berlin",
                   description: "Hi my name is Jennifer I'm 19 & currently live in North Carolina ,there is an event in Berlin next week called 'Playlist Live' there you can meet popular youtubers ect and I would like someone to join me on this trip.I would also like to explore Berlin."
});
sampleTrips.push({ country: "Australia",
                   city: "Sydney",
                   description: "Hi, My name is Jamues, 24 years old and I am currently a graduate student from University of Cambridge. I will be graduating this August and I will be doing a month long road trip around the east coast of Australia. I have already booked my flight from 1st Sep to 29th Sep. Currently, I intend to rent a car and drive around the following places from 6th Sep to 24th Sep."
});
sampleTrips.push({ country: "United States",
                   city: "San Francisco",
                   description: "Although huge in terms of offerings, San Francisco is physically quite compact. It is located on a seven-by-seven mile (11 x 11km) square of land at the tip of a peninsula between the San Francisco Bay and the Pacific coast. It has a population of 812,000 which represents a small fraction of the entire Bay Area population of 7.1 million. San Francisco is just one of the cities which makes up the entire San Francisco Bay Area. San Francisco's neighbors -Oakland and Berkeley east of the Bay Bridge, Marin County north of the Golden Gate Bridge, and the Peninsula south of the city are all part of separate counties, each with their own governments and local public transportation systems."
});
// sampleTrips.push({ country: "Ecuador",
//                    city: "Amazon",
//                    description: "Hi all, I'm a teacher with summers off and I'm always looking for somewhere exciting to go. Upcoming ideas include: Traveling down the Amazon on a local boat (I'd really prefer to do this with someone) from Iquitos, Peru to Manaus, Brazil Backpacking through Guyana, Suriname, and French Guinea. Morocco. Feel free to send me a message so we can get to know one another. I'm 31, from the US, and really easy going."
// });
// sampleTrips.push({ country: "Chile",
//                    city: "Patagonia",
//                    description: "Hi folks! I'm a 19 year old girl living in the Netherlands (cap. Amsterdam) studying interactive design. I really like to get to know new people even though i'm a little shy (i like to go out at night tho). I'm planning to travel to Chile and stay for 2 weeks in Patagonia. I plan to hike, camp, but also enjoy the nightlife, do fun activities and chill at the beach. I just want to see new things and have fun with someone.. My friends don't have the money to come with me, but that won't stop me from going!"
// });
// sampleTrips.push({ country: "Chile",
//                    city: "Santiago",
//                    description: "Hey folks! This will be my first time traveling alone (I have been through Peru and Chile now but in company). I have many questions and I'd really like to meet people for the way - everything is nicer if you can share it with someone. Also I feel better traveling with others in long distances, it's more entertained and save."
// });
// sampleTrips.push({ country: "Brazil",
//                    city: "Sao Paulo",
//                    description: "hey guys I'm looking for a someone to share in an adventure. setting out from Christchurch and ending in Auckland. I've rented a car and I've got a rough draft of my route but I'm open to everything. I wanna do a mix of hiking, camping, sightseeing and a little adrenaline seeking."
// });
// sampleTrips.push({ country: "Ecuador",
//                    city: "Quito",
//                    description: "My name is Samantha and I'm 18 years old. I recently got back from backpacking through Europe and I'm already planning my next trip. I used this website to find my last travel partner and we became great friends! I thought I would try again. I'm planning on going to Ireland, Scotland, and England this coming September for a month or two. If anyone is interested, please let me know!"
// });
// sampleTrips.push({ country: "Canada",
//                    city: "Toronto",
//                    description: "Hi all ! I'm a Spanish student that is searching a mate for summer, I would to improve my English. I'm 17 years old. It's like a swap. I will teach Spanish and who wants to come to Spain will teach me English. I don't want any money, I only want to have fun for a month or something like that. I live in Valencia, a very very very beatiful city. We also can go to Madrid or Barcelona, eat a lot and watch football or go to the best beaches. I will be waiting for an answer. "
// });
// sampleTrips.push({ country: "Canada",
//                    city: "Toronto",
//                    description: "My name is Armando, I’m a 26 year old Mexican living in France. I’m about to finish my masters so I thought it’d be a good idea to travel for a while before deciding what to do next. I haven’t planned anything but I’d like to leave in the beginning of September and stay there about 6 weeks. I want to visit Thailand, Cambodia? and Vietnam but am open to anything. I reckon the basic shouteast asia loop would be a good starting point."
// });
// sampleTrips.push({ country: "Canada",
//                    city: "Toronto",
//                    description: "Hi All! I just purchased my tickets to Australia - so excited! This is my first time. 28/female from Chicago here. I'm flying in and out of Sydney, but anything that happens in between there is up in the air. Would love to find some people to join for adventures. Interested in heading up to Cairns - there has been some debate about whether or not the Great Barrier Reef will continue to be preserved and I'd like to see it."
// });
// sampleTrips.push({ country: "Canada",
//                    city: "Vancouver",
//                    description: "Hi everyone, I've booked my flight to Bangkok & land 20th September & would like to have some travel buddies. I wouldn't want to stay in Bangkok long, just a day & then head off elsewhere. This route I have not planned yet so any advice would be great. I'm looking to travel Cambodia, Vietnam, Chiang rai & Chiang mai then heading to southern Thailand making my way to Singapore & fly to oz where I have my working visa. Looking to be in oz December time."
// });
//

var usersList = [];

usersList.push({ username: 'jjack',
                  email: 'jjack@jack.com',
                 password: 'abc',
                 fullname: 'Jack McJack',
                      age: '22',
                    blurb: 'Most Memorable Travel Experience: Seeing baby sea turtles escape from their eggs and crawl to the see in Florida. Dancing and partying in Old San Juan. Having a tradition Turkish dinner with friends in Istanbul. Staying in a eco lodge directly centered in the cloud rainforest. Salsa dancing in the clubs of Bogota.',
                    image: "/images/sports-3.jpg"
});
usersList.push({ username: "jajimz",
                    email: 'jjimmy@jim.com',
                 password: 'abc',
                  fullname: 'Jimmy J.',
                       age: '45',
                     blurb: 'Love to travel!',
                   image: "/images/sports-1.jpg"
});
usersList.push({ username: 'bbenny',
                    email: 'bbenny@b.com',
                  fullname: 'Benny Zee',
                   password: 'abc',
                   age: '67',
                 blurb: 'Eating and traveling is my life',
                   image: "/images/people-9.jpg"
});
usersList.push({ username: 'bubbill',
                  email: 'billyb@billy.com',
                    fullname: 'Billy Smith',
                   pasword: 'abc',
                   age: '35',
                 blurb: 'Can not stop traveling',
                   image: "/images/people-8.jpg"
});
usersList.push({ username: 'rayray',
                  email: 'ray@ray.com',
                  fullname: 'Ryan Q.',
                   password: 'abc',
                   age: '41',
                 blurb: 'Forever young!',
                   image: "/images/people-7.jpg"
});
usersList.push({ username: 'jdoe',
                    email: 'jane@doe.com',
                    fullname: 'Jane Doe',
                   password: 'abc',
                   age: '25',
                 blurb: "Let's party!",
                   image: "/images/people-6.jpg"
});
usersList.push({ username: 'ddoedoe',
                  email: 'd@doedoe.com',
                  fullname: 'Klean K.',
                   password: 'abc',
                   age: '28',
                 blurb: 'Still got the travel bug',
                   image: "/images/people-5.jpg"
});



  // usersList.forEach(function (user) {
    for(var i = 0; i < usersList.length; i++) {
      usersList[i].posts = sampleTrips[i];
      console.log("AAAAAAAAAAAAA", usersList);
    }
  // });

  db.User.remove({}, function (err,users) {
    db.User.create(usersList, function(err,users){
      if (err) { return console.log("ERROR", err); }
      // console.log("all users:", users);
      // console.log("created", users.length, "users");
      process.exit();
    });
  });


// usersList.forEach(function (user) {
//   //randomize samplelist
//   function shuffleArray(sampleTrips) {
//     for (var i = sampleTrips.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = sampleTrips[i];
//         sampleTrips[i] = sampleTrips[j];
//         sampleTrips[j] = temp;
//     }
//     return sampleTrips;
//   } shuffleArray(sampleTrips);
//
//   var removedPosts = sampleTrips.slice(0,2);
//   user.posts = removedPosts;
// });
//
//
// db.User.remove({}, function(err, users){
//   db.User.create(usersList, function (err, users){
//     if (err) {return console.log('Error', err); }
//     process.exit();
//   });
// });


// db.User.remove({}, function(err, users){
//     if (err) {return console.log('Error', err); }
//     process.exit();
//   });
