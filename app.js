const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
// const _ = require("lodash");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//Set Up Mongo Database
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});
const articleSchema = {
  title: String,
  content: String
}
const Article = mongoose.model("Article", articleSchema);

app.route("/article")

.get(function(req,res){
  Article.find(function(err,foundArticles){
    if(!err){
      res.send(foundArticles);
    }else{
      res.send(err);
    }
  });
})

.post(function(req,res){
  // console.log();
  // console.log();

  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save(function(err){
    if (!err){
      res.send ("New Articlae Added");
    }else{
      res.send(err);
    }
  });
})

.delete(function(req,res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Succesfully Deleted all articles");
    }else{
      res.send(err);
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
