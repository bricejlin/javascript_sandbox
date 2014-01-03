// Algorithms



// Closures

function showName(firstName, lastName) {
  var nameIntro = "Your name is ";

  return function makeFullName() {
    return nameIntro + firstName + " " + lastName;
  }
}

function celebrityName(firstName) {
  var nameIntro = "This celebrity is ";
  return function lastName(theLastName) {
    return nameIntro + firstName + " " + theLastName;
  }
}
var mjName = celebrityName("Michael");
mjName("Jackson"); // Prints 'This celebrity is Michael Jackson'

function celebrityID() {
  var celebrityID = 999; // All inner functions have access to this variable
  return {
    getID: function() { // Returns current value of celebrityID
      return celebrityID;
    },
    setID: function(theNewID) {
      celebrityID = theNewID // Changes the outer function's variable celebrityID
    }
  }
}

function createPerson(person) {
  return function(mood) {
    return person + " is " + mood; // grabs person from outer function parameter
  }
}

function createFunction() {
  var local = 100;
  return function() { return local; };
}

function makeAdder(amount) {
  return function(number) {
    return amount + number;
  };
}

var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };
})();

// Classes

function Playlist() {
  this.tracks = [];
}
Playlist.prototype = { // prototype sets functions to belong to Playlist only
  addTrack: function(track) {
    this.tracks.push(track);
  },
  removeTrack: function(track) {
    this.tracks.splice(this.tracks.indexOf(track),1);
  },
  getTracks: function() {
    return this.tracks;
  }
};

var myPlaylist = new Playlist();
myPlaylist.addTrack("Burn");
myPlaylist.removeTrack("Burn");
myPlaylist.getTrack(); // What does get return?
myPlaylist.shuffle(); // What does shuffle return? A list?

//

var makePlaylist = function() {
  var tracks = [];
  return {
    addTrack: function(track) {
      tracks.push(track);
    },
    removeTrack: function(track) {
      tracks.splice(tracks.indexOf(track),1);
    },
    getTracks: function() {
      return tracks;
    }
  }
};

var myPlaylist2 = makePlaylist();

myPlaylist.addTrack("Burn");
myPlaylist.addTrack("Wake Me Up");
myPlaylist.addTrack("Don't You Worry Child");
myPlaylist.getTracks();

// Tom Rudick problem

callAnotherFunc = (function() {
  var counter = 0;
  return function onlyOnce() {
    if (counter < 1) {
      console.log("Once!");
      counter++;
    } else {
      console.log("Function onlyOnce was called already!");
    }
  };
})();

//

function zeroPad(number, width) {
  var string = String(Math.round(number));

  while (string.length < width) {
    string = "0" + string;
  }
  return string;
}

function range(number) {
  var result = [];
  for (var i = 0; i <= number; i++) {
    result.push(i);
  }
  return result;
}

function range(start, end) {
  if (arguments.length < 2) 
  {
    end = start;
    start = 0;
  }
  var result = [];
  for (var i = 0; i <= end; i++) 
  {
    result.push(i);
  }
  return result;
}

function sum(numbers) {
  var total = 0;
  for (var i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

for (var n)

// Grandma's cats example

function startsWith(string, pattern) {
  return string.slice(0,pattern.length) == pattern;
}
function catNames(paragraph) {
  var colon = paragraph.indexOf(":");
  return paragraph.slice(colon + 2).split(", ");
}

function extractDate(paragraph) {
  function numberAt(start, length) {
    return Number(paragraph.slice(start, start + length));
  }
  return new Date(numberAt(11,4), numberAt(8,2) - 1, numberAt(5,2));
}

function catRecord(name, birthdate, mother) {
  return {name: name, birth: birthdate, mother: mother};
}

function addCats(set, names, birthdate, mother) {
  for (var i = 0; i < names.length; i++) {
    set[names[i]] = catRecord(names[i], birthdate, mother);
  }
}
function deadCats(set, names, deathdate) {
  for (var i = 0; i < names.length; i++) {
    set[names[i]].death = deathdate;
  }
}
function extractMother(paragraph) {
  var start = paragraph.indexOf("(mother ") + "(mother ".length;
  var end = paragraph.indexOf(")");
  return paragraph.slice(start, end);
}


function findCats() {
  var cats = {"Spot": catRecord("Spot", new Date(1997,2,5), "unknown")};

  function handleParagraph(paragraph) {
    if (startsWith(paragraph, "born")) {
      addCats(cats, catNames(paragraph), extractDate(paragraph), extractMother(paragraph));
    } else if (startsWith(paragraph, "died")) {
      deadCats(cats, catNames(paragraph), extractDate(paragraph));
    }
  }
  for (var mail = 0; mail < ARCHIVE.length; mail++) {
    var paragraphs = ARCHIVE.split("\n");
    for (var i = 0; i < paragraphs.length; i++) {
      handleParagraph(paragraphs[i]);
    }
  }
  return cats;
}

function formatDate(date) {
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

function catInfo(data, name) {
  var cat = data[name];
  if (cat == undefined) {
    return "No cat by the name of " + name + " is known.";
  }
  var message = name + ", born " + formatDate(cat.birth) + " from mother " + cat.mother;
  if ("death" in cat) {
    message += ", died " + formatDate(cat.death);
  }
  return message + ".";
}

function oldestCat(data) {
  var oldest = null;

  for (var name in data) {
    var cat = data[name];
    if (!("death" in cat) && (oldest == null || oldest.birth > cat.birth)) {
      oldest = cat;
    }
    if (oldest == null) {
      return null;
    } else {
      return oldest.name;
    }
  }
}

// Exception handling

function lastElement(array) {
  if (array.length > 0) {
    return array[array.length - 1];
  } else {
    throw "Cannot take the last element of an empty array.";
  }
}

function lastElementPlusTen(array) { // completely disregards the possibility that lastElement might go wrong
  return lastElement(array) + 10; 
}

try {
  console.log(lastElementPlusTen([]));
} catch(error) {
  console.log("Something went wrong: ", error);
}

var currentThing = null;

function processThing(thing) {
  var prevThing = currentThing;
  currentThing = thing;
  /* do complicated processing */
  currentThing = prevThing;
} // what if complicated processing throws an error? currenThing will never be reset to old value

function processThing(thing) {
  var prevThing = currentThing;
  currentThing = thing;
  try {
    /* do complicated processing */
  }
  finally { // finally gets called everytime
    currenThing = prevThing;
  }
}

try {
  console.log(Sasquatch);
} 
catch(error) {
  console.log("Caught: " + error.message);
}

var InvalidInputError = new Error("Invalid numeric input");

function inputNumber() {
  var input = Number(prompt("Give me a number", ""));
  if (isNaN(input)) {
    throw InvalidInputError;
  }
  return input;
}

try {
  alert(inputNumber() + 5);
  break;
}
catch(e) {
  if (e != InvalidInputError) {
    throw e;
  }
  alert("You did not input a number. Try again.");
}

// Hoisting

var name = "Baggins";

(function() {
  console.log("Original name was " + name);

  var name = "Underhill";

  console.log("New name is " + name);
})();

// Higher-Order Functions - functions that operate on other functions

function forEach(array, action) { // Abstracts away the for loop
  for (var i = 0; i < array.length; i++) {
    action(array[i]);
  }
}

function sum(numbers) {
  total = 0;
  forEach(numbers, function(number) {
    total += number;
  });
  return total;
}

function negate(func) { // Negates a function's return
  return function(x) {
    return !func(x);
  };
}

function negate(func) { // For functions with multiple parameters
  return function() {
    return !func.apply(null, arguments);
  };
}

function reduce(combine, base, array) {
  forEach(array, function(element) {
    base = combine(base, element);
  });
  return base;
}

function add(a, b) {
  return a + b;
}

function sum(numbers) {
  return reduce(add, 0, numbers);
}

function countZeroes(array) {
  function counter(total, element) {
    return total + (element === 0 ? 1 : 0);
  }
  return reduce(counter, 0, array);
}

function count(test, array) {
  var counted = 0;
  forEach(array, function(element) {
    if (test(element)) { counted++; }
  });
  return counted;
}

function countZeroes(array) {
  function isZero(x) { return x === 0; }
  return count(isZero, array);
}

function map(func, array) { // goes over an array, applying a function to every element e.g. Ruby's .map
  var result = [];
  forEach(array, function(element) {
    result.push(func(element));
  });
  return result;
}

map(Math.round, [0.01, 2, 9.89, Math.PI]);

// Lonely recluse program

var paragraphs = RECLUSEFILE.split("\n\n");

paragraphs.length; // 22

function processParagraph(paragraph) {
  var header = 0;
  while (paragraph.charAt(header) == "%") {
    header++;
  }
  if (header > 0) {
    return { type: "h" + header, content: splitParagraph(paragraph.slice(header + 1)) };
  } else {
    return { type: "p" + content: splitParagraph(paragraph) }; 
  }
}

processParagraph(paragraphs[0]); // {type: "h1", content: "The Book of Programming"}

function map(func, array) {
  var result = [];
  forEach(array, function(element) {
    result.push(func(element));
  });
  return result;
}

map(processParagraph, RECLUSEFILE.split("\n\n")); // [{type: "h1", content: "The Book of Programming"}, etc]

function splitParagraph(text) {
  function split() {
    var pos = 0, fragments = [];
    while (pos < text.length) {
      if (text.charAt(pos) == "*") {
        var end = findClosing("*", pos + 1);
        fragments.push({type: "emphasized", content: text.slice(pos + 1, end)});
        pos = end + 1;
      }
      else if (text.charAt(pos) == "{") {
        var end = findClosing("}", pos + 1);
        fragments.push({type: "footnote", content: text.slice(pos + 1, end)});
        pos = end + 1;      
      }
      else {
        var end = findOpeningOrEnd(pos);
        fragments.push({type: "normal", content: text.slice(pos + 1, end)});
        pos = end;      
      }
    }
    return fragments;
  }
  function findClosing(character, from) {
    var end = text.indexOf(character, from);
    if (end == -1) {
      throw new Error("Missing closing '" + character + "'");
    } else {
      return end;
    }
  }
  function findOpeningOrEnd(from) {
    function indexOrEnd(character) {
      var index = text.indexOf(character, from);
      return index == -1 ? text.length : index;
    }
    return Math.min(indexOrEnd("*"), indexOrEnd("{"));
  }
  return split(0);
}

function extractFootnotes(paragraphs) {
  var footnotes = [];
  var currentNote = 0;

  function replaceFootnote(fragment) {
    if (fragment.type == "footnote") {
      currentNote++;
      footnotes.push(fragment);
      fragment.number = currentNote;
      return {type: "reference", number: currentNote};
    }
    else {
      return fragment;
    }
  }

  forEach(paragraphs, function(paragraph) {
    paragraph.content = map(replaceFootnote, paragraph.content);
  });

  return footnotes;
}

// Generating HTML

var linkObject = {name: "a", 
                  attributes: {href: "http://www.gokgs.com/"},
                  content: ["Play Go!"]};

function tag(name, content, attributes) {
  return {name: name, attributes: attributes, content: content};
}

function link(target, text) {
  return tag("a", [text], {href: target});
}

function htmlDoc(title, bodyContent) {
  return tag("html", [tag("head", [tag("title", [title])]),
                      tag("body", bodyContent)]);
}

function escapeHTML(text) {
  var replacements = [[/&/g, "&amp;"], [/"/g, "&quot;"],
                      [/</g, "&lt;"], [/>/g, "&gt;"]];
  forEach(replacements, function(replace) {
    text = text.replace(replace[0], replace[1]);
  });
  return text;
}
"
function renderAttributes(attributes) {
  if (attributes == null) { return "" }

  var result = [];
  for (var name in attributes) {
    result.push(" " + name + "=\"" + escapeHTML(attributes[name]) + "\"");
  return result.join("");
  }
}

function renderHTML(element) {
  var pieces = [];

  function render(element) {
    // Text node
    if (typeof element == "string") {
      pieces.push(escapeHTML(element));
    }
    // Empty tag
    else if (!element.content || element.content.length == 0) {
      pieces.push("<" + element.name + renderAttributes(element.attributes) + ">");
    }
    // Tag with content
    else {
      pieces.push("<" + element.name + renderAttributes(element.attributes) + ">");
      forEach(element.content, render);
      pieces.push("</" + element.name + ">");
    }
  }
  render(element);
  return pieces.join("");
}

function renderFragment(fragment) {
  if (fragment.type == "reference") {
    return tag("sup", [link("#footnote" + number, String(number))]);
  } 
  else if (fragment.type == "emphasized") {
    return tag("em", [fragment.content]);
  }
  else if (fragment.type == "normal") {
    return fragment.content;
  }
}

function renderParagraph(paragraph) {
  return tag(paragraph.type, map(renderFragment, paragraph.content));
}

function renderFootnote(footnote) {
  var anchor = tag("a", [], {name: "footnote" + footnote.number});
  var number = "[" + footnote.number + "] ";
  return tag("p", [tag("small", [anchor, number, footnote.content])]);
}

function renderFile(file, title) {
  var paragraphs = map(processParagraph, file.split("\n\n"));
  var footnotes = map(renderFootnote, extractFootnotes(paragraphs));
  var body = map(renderParagraph, paragraphs).concat(footnotes);
  return renderHTML(htmlDoc(title, body));
}

// Operator functions

var op = {
  "+": function(a, b) { return a + b; },
  "==": function(a, b) { return a == b; },
  "===": function(a, b) { return a === b; },
  "!": function(a) { return !a; },
  /* and so on */
};

reduce(op["+"], 0, [1,2,3,4,5]) // to sum an array

// Partial application

function partial(func) {
  var knownArgs = arguments;
  return function() {
    var realArgs = [];
    for (var i = 1; i < knownArgs.length; i++) {
      realArgs.push(knownArgs[i]);
    }
    for (var i = 1; i < arguments.length; i++) {
      realArgs.push(arguments[i]);
    }
    return func.apply(null, realArgs);
  };
}

// Function composition
function compose(f1, f2) {
  return function() {
    return f1(f2.apply(null, arguments));
  };
}

var isNotNaN = compose(op["!"], isNaN);
isNotNaN(5); // true

// Object-Oriented Programming

var rabbit = {};
rabbit.speak = function(line) {
  console.log("The rabbit says '", line, "'");
};

rabbit.speak("I'm alive!!!");

function speak(line) {
  console.log("The ", this.adjective, " rabbit says '", line, "'");
}
var whiteRabbit = {adjective: "white", speak: speak};
var fatRabbit = {adjective: "fat", speak: speak};

function run(from, to) {
  console.log("The ", this.adjective, " rabbit runs from ", from, " to ", to, ".");
}
run.apply(whiteRabbit, ["A","B"]);
run.call(fatRabbit, "the cupboard", "the fridge");

// Constructors

function Rabbit(adjective) { // Rabbit is constructor, much like new Array, new Object, etc.
  this.adjective = adjective;
}

var killerRabbit = new Rabbit("killer");
killerRabbit.speak("GRAAAAAAAAAAH!");

var fluffyRabbit = new Rabbit("fluffy");

Rabbit.prototype.teeth = "small"
killerRabbit.teeth; // "small"
killerRabbit.teeth = "long, sharp, and bloody";
killerRabbit.teeth; // "long, sharp, and bloody"
Rabbit.prototype.teeth; // "small"
fluffyRabbit.teeth; // "small"

Rabbit.prototype.dance = function() {
  console.log("The ", this.adjective, " rabbit dances a jig.");
};

Rabbit.prototype.speak = function(line) {
  console.log("The ", this.adjective, " rabbit says '", line, "'");
}

var noCatsAtAll = {}; // Problematic
if ("constructor" in noCatsAtAll) {
  console.log("Yes, there is definitely a cat called 'constructor'.");
}

Object.prototype.properties = function() { // Problematic
  var result = [];
  for (var property in this) {
    result.push(property);
  }
  return result;
};

function forEachIn(object, action) {
  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      action(property, object[property]);
    }
  }
} // But what if we find a cat named hasOwnProperty?

function forEachIn(object, action) {
  for (var property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property)) {
      action(property, object[property]);
    }
  }
}

// hasOwnProperty checks if object has any direct properties
// in checks for properties inherited through the prototype chain

var object = {foo: "bar"};
Object.prototype.propertyIsEnumerable.call(object, "foo"); // true

function Dictionary(startValues) {
  this.values = startValues || {};
}
Dictionary.prototype.store = function(name, value) {
  this.values[name] = value;
};
Dictionary.prototype.lookup = function(name) {
  return this.values[name];
};
Dictionary.prototype.contains = function(name) {
  return Object.prototype.propertyIsEnumerable.call(this.values, name);
};
Dictionary.prototype.each = function(action) {
  forEachIn(this.values, action);
};

// Building an Ecosystem Simulation

function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.add = function(other) {
  return new Point(this.x + other.x, this.y + other.y);
};

// Basic idea of polymorphism is that when a piece of code is written to work
// with objects that have a certain interface, any kind of object that happens
// to support this interface can be plugged into the code, and it will just work


// Inheritance
function clone(object) {
  function OneShotConstructor(){}
  OneShotConstructor.prototype = object;
  return new OneShotConstructor();
}

// Inheritance is the creation of a new type of object, the subtype, based on
// an existing type, the supertype.
// Piano type could be a subtype of an Instrument type

var names = ["January", "Feb", "March", "April", "May", "June", "July", 
             "August", "September", "October", "November", "December"];
function getMonthName(number) { return names[number]; }
function getMonthNumber(name) { return names.indexOf(name); }

function buildMonthNameModule() {
  var names = ["January", "Feb", "March", "April", "May", "June", "July", 
             "August", "September", "October", "November", "December"];
  function getMonthName(number) { return names[number]; }
  function getMonthNumber(name) { return names.indexOf(name); }
}

function provide(values) {
  forEachIn(values, function(name, value) {
    window[name] = value;
  });
}

// Regex

var asteriskOrBrace = /[\{\*]/;
var story = "We noticed the *giant sloth*, hanging from a giant branch."; 
story.search(asteriskOrBrace); // 15

var badWords = ["ape", "monkey", "simian", "gorilla", "evolution"];
var pattern = new RegExp(badWords.join("|"), "i");
function isAcceptable(text) {
  return !pattern.test(text);
}

// DOM Manipulation

// function dom(name, attributes, children) {
//   var node = document.createElement(name);
//   if (attributes) {
//     forEachIn(attributes, function(name, value) {
//       node.setAttribute(name, value);
//     });
//   }
//   for (var i = 2; i < arguments.length; i++) {
//     var child = arguments[i];
//     if (typeof child == "string") {
//       child = document.createTextNode(child);
//     }
//     node.appendChild(child);
//   }
//   return node;
// }

function dom(name, attributes, children) {
  var node = document.createElement(name);
  if (attributes) {
    for (var prop in attributes) {
      node.setAttribute(prop, attributes[prop]);
    }
  }
  for (var i = 2; i < arguments.length; i++) {
    var child = arguments[i];
    if (typeof child == "string") {
      child = document.createTextNode(child);
    }
    node.appendChild(child);
  }
  return node;
}
















