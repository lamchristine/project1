function index(req, res) {
  res.json({
    message: "Welcome to my app!",
    documentation_url: "https://github.com/lamchristine/project1/blob/master/README.md",
    base_url: "https://safe-hamlet-29298.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;
