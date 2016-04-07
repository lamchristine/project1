function index(req, res) {
  res.json({
    message: "Welcome to my app!",
    documentation_url: "https://github.com/lamchristine/project1/blob/master/README.md",
    base_url: "",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;
