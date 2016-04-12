function index(req, res) {
  res.json({
    message: "Welcome to my app!",
    documentation_url: "https://github.com/lamchristine/project1/blob/master/README.md",
    base_url: "https://safe-hamlet-29298.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"},
      {method: "GET", path: "/api/users", description: "Gets all users"},
      {method: "DELETE", path: "/api/users/:id", description: "Deletes a specific user"},
      {method: "DELETE", path: "/api/users/:user_id/trips/:trip_id", description: "Deletes a specific trip"},
      {method: "POST", path: "/api/users/:user_id/trips", description: "Creates a new trip"},
      {method: "PUT", path: "/api/users/:user_id/trips/:trip_id", description: "Edits a specific trip"},
      {method: "GET", path: "/api/users/search", description: "Search all trips"},
      {method: "POST", path: "/api/users", description: "Creates a user"},
      {method: "GET", path: "/api/users/:id", description: "Shows data for specific user"}
    ]
  });
}

module.exports.index = index;
