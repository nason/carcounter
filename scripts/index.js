
require("./vendor/zepto.js");
var $ = window.Zepto;

var Backbone = require("backbone");
var CounterView = require("./counter_view");
var loadScript = require("./load_script");


function main() {
  var collection = new Backbone.Collection();
  var counter = new CounterView({
    collection: collection
  });

  $(".counter-container").html(counter.el);
  counter.render();

  counter.once("display:graph", function() {

    loadScript("bundle/toggle_graph.js", function(err) {
      if (err) throw err;
      var toggleGraphFor = require("./toggle_graph");
      var toggler = toggleGraphFor(collection, $(".graph-container"));
      toggler();
      counter.on("display:graph", toggler);

    });
  });

}

$(main);