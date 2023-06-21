const env = require("./environment");
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  app.locals.assetPath = function (filepath) {
    if (env.name == "development") {
      return "/" + filepath;
      //here filepath is the intial filepath i.e css/**.css
    }

    //return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
    return (
      "/" +
      JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "../public/assets/rev-manifest.json")
        )
      )[filepath]
    );
  };
};
