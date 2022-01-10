# 02. Functions and Asynchrony

# Fun with Functions

Functions are, of course, a very important part of any modern programming language. At the most basic level, a function is a kind of mini-program within a program that takes a defined set of parameters (including none) and returns a value (or nothing). You’ve already seen several functions earlier in this lesson and have probably figured out the basic syntax for JavaScript functions. Here’s a simple example of a JS function that takes a number as a parameter and returns that number squared:


    function square(x) {
      return x * x;
    }

Before we get into React Native, we need to make sure our understanding of functions is **solid**. React Native uses functions in ways that might be a bit unfamiliar to anyone who has mostly dealt with data processing-style coding in Python. It’s worth noting that most of the concepts we’ll discuss here also apply to Python in some form, but it’s not likely that you would have had to deal with these concepts if you weren’t building highly interactive programs or dealing with large, complex frameworks (like React Native).

## Parameters, arguments, defaults, and return values

Functions can take zero or more parameters. In the above example (`square(x)`), there is one parameter and it is named `x`. This means that the variable name `x` will refer to whatever is passed into the function when it is called.

The specific *value* of a parameter when the function is called is referred to as an *argument* (said another way, an *argument* is the specific piece of data that is passed into a function’s parameter)*.* This terminology can be confusing. Here is an example that might help clear it up:


    function square(x) { // x is a parameter of the function square
      return x * x;
    }
    let y = square(5); // 5 is an argument passed to square. x will be initialized to 5

It’s not super important to have this terminology memorized, but since you’ll see the terms “parameter” and “argument” used a lot in documentation and examples, it can be helpful to know precisely what is being talked about.

**Default parameters**
Just like in python, you can assign default values to parameters. Like so:


    function square(x = 2) {
        return x * x;
    }
    console.log(square());
    console.log(square(3));

Unlike in Python, JavaScript does not have support for *named arguments.* So this code does not do what you might expect it to do, coming from a Python background.


    function accuse(person = "Mrs. White", room = "Conservatory", weapon = "Lead Pipe") {
        return person + " did it in the " + room + " with the " + weapon + "!";
    }
    console.log(accuse());
    console.log(accuse("Colonel Mustard", "Library", "Knife"));
    console.log(accuse("Mrs. Peacock", "Kitchen"))
    console.log(accuse(weapon="Candlestick")); // ??
    console.log(accuse(room="Hall", person="Prof Plum")); // ??
## Functions as variables

Functions in JavaScript are a special data type, and functions can be assigned to variables just like numbers, strings, and objects can. So you can do stuff like this:


    function foo() {
      return "bar";
    }
    
    var baz = foo; // bar, like foo, is of type "function"
    console.log(baz()); // will print "bar"
    console.log(foo()); // will also print "bar"

It’s worth pointing out here that there is a BIG difference between 


    var baz = foo;

and 

    var baz = foo();

The former (`var baz = foo)` assigns the variable baz to the function foo. Both foo and baz are functions, and in fact they are exactly the *same* function. In this case `baz` just becomes another name for `foo`. On the other hand, `var baz = foo()`(note the parentheses `( )`) *executes* the function `foo` and assigns the *return value* to `baz`. In this case, `baz` is a string, and it’s value is `"bar"`. In fact any time you see a function name followed by parentheses (other than when it is first declared), you should know that the function will be executed and the return value will take the place of the statement `theFunction()` in whatever larger statement it appears. For example:


    var len = foo().length;

In this case, `foo()` executes, which returns `"bar"`, so the statement becomes


    var len = "bar".length;

Then `"bar".length` executes, which returns `3`, which is then assigned to `len`.


    var len = 3;

So now `len` is a a number, and its value is 3.

## Functions as parameters

Now that it’s clear that functions can be assigned to variables, we can see that functions can also be passed as parameters to other functions. This pattern turns out to be very useful, and it shows up *a lot* in frameworks like React Native, especially when it’s your job to tell React Native how you want your app to behave under certain circumstances. 

There are couple of very useful examples of passing functions into other functions that are built into JavaScript. The first, which you may have used before in Python, is `Array.map()`. You use map when you want to transform all of the values in an array all at once. Here’s a basic example:


    function triple(x) {
      return x * 3;
    }
    
    var arr = [1, 2, 3, 4];
    var arr3 = arr.map(triple); // arr3 will now equal [3, 6, 9, 12]

Here, note that `triple(x)` is defined in the conventional way as a function that takes exactly one parameter. The function is then passed as a parameter to `arr.map()` (note that it is passed *without parentheses—*remember why?). We don’t get to see how `map()` works, so we can only refer to the docs, which tell us that 


- The `map()` method creates a new array with the results of calling a function for every array element.
- The `map()` method calls the provided function once for each element in an array, in order.

So we know that `arr.map(triple)` will call `triple(x)` four times, passing each array element as an argument to `triple(x)`. Effectively, `map(triple)` will call `triple(1)`, then `triple(2)`, `triple(3)`, and `triple(4)`, in that order. And the results of each call will be stored in an array and the returned. 

**Passing a function to** `**Array.sort()**`
You saw another example of passing a function to a function in the previous lesson, but only if you were looking closely. `Array.sort()` *can* take a function as an argument, but it doesn’t have to. By default, if you call an array’s `sort()` method it will treat all of the elements of the array as strings and sort them alphabetically in ascending order. If you want to do anything else like sort them in descending order or have them treated as numbers (so that, for example, 2 will be less than 10), you need to supply your own comparison function. The function you provide needs to meet the following criteria: 

- it needs to take two parameters, we’ll call them `a` and `b`.
- if `a > b`, according to whatever sorting mechanism you’re using, the function must return a number greater than 0.
- if `a == b`, the function should return 0
- if `a < b`, the function should return a number less than zero.

Here’s an example of how you would do a reverse alphabetical sort using the `Array.sort()` method:


    function reverseSort(a, b) {
        if (b > a) {
            return 1;
        } else if (b < a) {
            return -1;
        } else {
            return 0;
        }
    }
    var arrAlpha = ["cherry", "watermelon", "apple"];
    arrAlpha.sort(reverseSort);
    console.log(arrAlpha);

And here’s an example of how you would sort an array of numbers:


    function numberSort(a, b) {
        return a - b;
    }
    var arrNum = [1, 2, 10 , 3, 200];
    arrNum.sort(); // sorts alphabetically -- NOT what we want
    console.log(arrNum);
    arrNum.sort(numberSort); // sorts numerically -- that's better!
    console.log(arrNum);

Side note: `Array.sort()` sorts the elements of an array *in place.* In other words, it permanently changes the array. If you don’t want this to happen, you need to make a copy of the original array and then sort it. Usually it’s OK to just sort it in place, unless you really want to be able to get the original ordering back and you can’t get it by just sorting again in a different way.

| Now You Try #1                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Rewrite `numberSort()` so that it performs a *reverse number sort* (i.e., the array will be sorted in descending rather than ascending numerical order). <br>2. In the `numberSort()` example above, what would happen if you wrote `arrNum.sort(numberSort());` instead of `arrNum.sort(numberSort);` in line 7? |
| [Answer on slido.](https://app.sli.do/event/6jj5lzie)                                                                                                                                                                                                                                                                |

## Anonymous functions 

So far we’ve mainly looked at *named* functions. These are the functions defined in the conventional way, like so:


    function myFunc() {
      // do something  
    }

But now that we’ve seen that functions can be assigned to variables and passed as arguments/parameters to functions, we can see cases where *anonymous* functions can be useful. These are simply functions without names, and they can be declared just like the example above, only without a name, like so:


    function () {
      // do something
    }

If you were to do this, though, how would you ever call the function? Well, one way would be to assign the function to a variable, like so:


    var myFunc = function () {
      // do something
    }

Now you could call `myFunc()` from other parts of the code and use it just like a normal function. This looks like just a more complicated version of creating a named function and it basically is (though there are some subtle differences we will probably get to later). Anonymous functions get much more handy, though, when they are declared somewhere that a function is needed, like as an argument to another function, and when the anonymous function is not needed by any other parts of the code. This style is used *very often* in JavaScript, so you’ll see it in example code and you’ll want to get comfortable doing it yourself. Let’s rewrite the functions we wrote above to pass into `map()` and `sort()` as anonymous functions, to illustrate this *very common* usage pattern:


    var arr = [1, 2, 3, 4];
    var arr3 = arr.map(function(x) { return x * 3 }); 

Note that what we did was take the original `triple()` function and wedge it right into the argument for `map()`. The function still takes a parameter `(x)` and still has the same body, but it no longer has a name. It doesn’t need a name because it will never get called by anyone else other than the internals of the `map()` function. As you can see, this style of writing is much more compact, though it can be a bit more confusing until you get the hang of it.

Just to drive the point home, let’s rewrite the comparison function we created for `sort()`  to perform numerical sorting using an anonymous function. 


    var arrNum = [1, 2, 10 , 3, 200];
    arrNum.sort(function(a, b) { return a - b });

Again, much more compact, but perhaps a bit harder to make sense of at first.

## Arrow functions

Anonymous functions are *so* useful and *so* popular among JavaScript developers that, as of ES6, there is an even more compact syntax for defining anonymous functions called *arrow functions.* Arrow functions look like this:


    (param1, param2) => { // function body }

This is the equivalent of the following:

    function(param1, param2) {
      // function body
    }

Basically you’re saving a few keystrokes since you’re getting rid of the `function` keyword and inserting `=>` instead. Otherwise, they’re pretty much the same. And again, arrow functions can go anywhere a function would be expected. For example:


    var myFunc = () => { return "Hello"; }; // assign an arrow function to a var
    console.log(myFunc());
    
    var arr = [1, 2, 3, 4];
    var arr3 = arr.map((x) => { return x * 3 }); 
    
    var arrNum = [1, 2, 10 , 3, 200];
    arrNum.sort((a, b) => { return a - b });

There are even some other syntactic shortcuts that were introduced with arrow functions, just so the cool kids could type even fewer characters. Those shortcuts include:


- if your arrow function has exactly one parameter you can leave off the parentheses
- if your arrow function has only one statement you can leave off the `{ }` *and* the `return` keyword—that single statement will be executed and its result returned as the function’s value. 

So to really streamline the example above, you could rewrite it as


    var myFunc = () => "Hello"; // assign an arrow function to a var
    
    var arr = [1, 2, 3, 4];
    var arr3 = arr.map(x => x * 3); 
    
    var arrNum = [1, 2, 10 , 3, 200];
    arrNum.sort((a, b) => a - b);

Of course if you have a more complicated function you can’t take advantage of these nifty shortcuts. For the reverse sort comparison example above, you still need curly braces and `return` statements, but the arrow syntax still saves you a few keystrokes:


    var arrAlpha = ["cherry", "watermelon", "apple"];
    arrAlpha.sort((a, b) => {
        if (b > a) {
            return 1;
        } else if (b < a) {
            return -1;
        } else {
            return 0;
        }
    });
    console.log(arrAlpha);


| Now You Try #2                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Rewrite the following code in just one line using an arrow function (and maybe another trick or two):<br><br>`function triple(x) {`       <br>  `return x * 3;`            <br>`}`                          <br>`var arr = [1, 2, 3, 4];`    <br>`var arr3 = arr.map(triple);` |
| [Answer on slido.](https://app.sli.do/event/6jj5lzie)                                                                                                                                                                                                                             |

# Variable scope

A subtle issue that causes all kind of hard-to-fix problems if you don’t have a good grasp of it is variable scope. “Scope” refers to the parts of a program within which a particular variable name is valid. At first, when you’re writing small programs, scoping seems like a pain in the butt. “Global scope” is the term for the variable scope that allows a variable to be references from *any* part of a program. Given that wrongly-scoped variables are the source of lots of errors when getting started writing programs in a new language, it seems like it would be a lot easier if all variables just had global scope. That way at any time, anywhere in my program if I want to access or change, say, the `classRoster` variable, I could just do it. Once programs get larger, however, variable scope becomes your friend and actually *keeps* you from making silly errors that are *also* hard to find and fix. As an example, in a large program it’s pretty common to end up defining a lot of variables with names like `x` and `i` and `temp` that are meant for very local use (like, say, iterating through an array to find a particular value). If you aren’t careful, you can end up using the `x` or `i` or `temp` that you defined somewhere else, often *very* far away (even in a different `js` file), which already has a value you weren’t expecting, and which screws up the thing you are trying to do in *this* corner of your code in ways that can be very hard to reproduce or even track down.

Enough with the pep talk, how does variable scoping work in JavaScript?

There are three scopes it is important to understand in JavaScript: global, function, and block. “Global” scope refers to the entire program. Any variable that has global scope can be accessed from anywhere in the program. In this example, `x` is a global variable, which means it can be accessed anywhere, including inside the function `incrX()` and inside the `for` loop.


    var x = 5;
    function incrX() {
      x += 1;
    }
    for (var i = 0; i < 5; i++) {
      incrX();
      console.log(x);
    }

The reason `x` is global is because it was declared *outside* any function—essentially at the top level of the program.

*Note: technically, there isn’t actually any such thing as “global” scope in JavaScript. The highest level scope you can have is* ***module*** *****scope, which means a variable is available within an entire module which, generally speaking, is a single JavaScript file. Since pretty soon and probably for the rest of your life you’ll be writing multi-file and therefore multi-module JavaScript programs, you won’t be dealing with “global” variables, just module, function, and block variables*

If a variable is declared inside a function using `var`, it will have *function* scope. That is to say, the variable will *only* be accessible from within the function in which it was declared. So the following code won’t work—it will throw an error complaining that `z` is not defined on line 7. 


    function incrX() {
        var z = 5;
        z += 1;
    }
    for (var i = 0; i < 5; i++) {
        incrX();
        console.log(z);
    }
## `let` and block scope

The final scope we’ll discuss at this point is *block* scope. Block scope refers to variables that are declared within a block that is *not* a function, like a loop or if/else statement.  Before ES6, block scope did not exist in JavaScript—there was only global and function scope. ES6 introduced a new keyword `let` that provides an alternative way to declare a variable. `let` allows you to declare variables with block scope, like so:


    for (let j = 0; j < 10; j++) {
      console.log(j);  
    }
    console.log(j); // this will not work; j is undefined at global scope

Try the above loop, replacing `let` with `var` and you’ll see that the code *does* work. Why? (A: because with `var`, `j` is declared within a loop but outside of a function, meaning it has *global* scope.) 

Generally speaking, `let` is simply better than `var`, and the recommendation is that everyone should use `let` instead of `var`, full stop. Eventually, `var` is likely to get phased out of the language. I know I have been using `var` throughout this entire lesson, and that’s mainly because there is still tons of JavaScript documentation out there that uses `var`. Before 2015 there was no other option, and there are still quite a few developers out there that have `var` so deeply ingrained in their muscle memory that they continue to use it. 95% of the time it doesn’t end up making any difference, but there are a few cases where it does and `let` never hurts you, so you should use `let` instead of `var`. I will now switch to `let` for the remainder of this lesson.

There are two other differences between `let` and `var` that you may come across:

- variables declared with `var` can be declared *after* they are used thanks to a confusing JS feature called “hoisting.” We’re not going to get into hoisting here and hopefully you will never have to deal with it. Variables declared with `let` *must* be declared before they are used.
- variables declared using var can be re-declared within the same scope. So you can do this with `var`:
    var x = 5;
    // some code, or not
    var x = 6;
    You can’t do this with `let`. If you write code like this:
    let x = 5;
    // some code, or not
    let x = 6;
    JavaScript will throw an error at line 3 and refuse to run your code.

In all of these cases `let` is more restrictive than `var`, which can seem like a pain. However, `let` is actually better because it forces you to write cleaner, more legible, and more debuggable code. 


## Use `const` for immutable variables

Along with `let`, ES6 introduced yet another way to declare variables: the `const` keyword. `const` is meant to be used for declaring “constants,” that is variables that won’t change after they are declared. In terms of scope, `const` is just like `let`—variables declared with `const` have block scope. The major difference between `let` and `const` is that *const variables cannot be modified after they are initialized.*

In other words, if you try to do this:


    const x = 5;
    x = 6;

JavaScript will throw an error telling you that `x` cannot be modified in line 2. The general recommendation for using is `const` is to use it whenever you can. That is, if you declare a variable and you know that it won’t and shouldn’t be modified, declare it with `const`.

There is actually a fourth way to declare variables in JavaScript, but this way is **lazy** and **bad** so you should never do it. This horrible practice is the standard practice in Python—just initializing a variable with no leading keyword. Any variable created this way will have *global scope*, even if it’s declared inside a function, block, or class. So this is valid (but undesirable) in JavaScript:


    function foo() {   
        xyz = 55; 
    }
    foo();
    console.log(xyz);

So even though `xyz` was declared (sort of) within the function `foo()`, it can be accessed outside the function. This might not seem like a big deal and you can probably get away with it most of the time without any negative effects as long as you’re writing small, simple programs all by yourself. But polluting the global variable space can lead to all kinds of nasty problems once programs get big, so I would strongly encourage you to be thoughtful and careful when declaring and scoping your variables.

In ReactNative you won’t be allowed to do this anyway, because ReactNative uses ‘strict’ mode, which requires you to declare variables with `var`, `let`, or `const`.


## Choosing between `let` and `const`

Consider the following example program, which picks a random number and then tries to guess it. Note which variables are declared using `let` and which are declared using `const`. Also note which variables are declared within functions and/or blocks and which ones are global.


    const maxTries = 10;
    const maxInt = 50;
    let numTries = 0;
    
    function randInt() {
        return Math.round(Math.random() * maxInt);
    }
    
    const secret = randInt();
    
    while (numTries < maxTries) {
        let guess = randInt();
        if (guess == secret) {
            console.log("Guess was correct after " + 
                        numTries + " tries! It was " + guess);
            break;
        }
        console.log("Guess was wrong. It was " + guess);
        numTries++;
    }
    
    if (numTries == maxTries) {
        console.log("Gave up after " + numTries + " tries. Secret was " + secret);
    }


| ***Pause and think***                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. Find all five variable declarations in the above example. Which scope does each variable belong to?<br>2. Which variables are declared using `const` and which are declared using `let`? Is the choice of declaration appropriate in each case? Why or why not? |

## Nesting scopes

It’s very common to see JS code that includes *nested scopes.* In fact any code that isn’t pretty trivial will have at least some degree of nesting. A couple of common types of nesting that you’ll see are loops nested inside other loops or loops nested inside functions (you can even have functions nested inside functions, which we may see some of later). Any scope that is nested inside another scope can access any variables from the outer scope. However, variables defined inside an inner scope can *not* be accessed from the outer scope. 

In this example, `sum` is declared within the function `sumArr()`, and is therefore available everywhere within the function, including within the `for`  loop (lines 3-5), which is a separate block-level scope nested *inside* the function. Since `sum` has function scope, it would not be available in the global scope, or in any scope that is not enclosed within the function’s `{ }`. 


    function sumArr(arr) {
        let sum = 0;
        for (el of arr) {
            sum += el;
        }
        return sum
      }
    console.log(sumArr([3, 4, 5, 6, 7]));


Here’s an example that has four levels of nesting (including the top level “global” scope):


    function removeElement(arr, elem) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === elem) {
                let foundIndex = i;
            }
        }
        arr.splice(foundIndex, 1); // removes one element from the array, 
                                   // starting at foundIndex
    }
    let a = ["apple", "pear", "peach"];
    removeElement(a, "pear");
    console.log(a);
| **Now You Try #3**                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------- |
| 1. There is an error in the code above. What is it?<br>2. How would you fix the error (describe in English, not code)? |
| [Answer on slido.](https://app.sli.do/event/6jj5lzie)                                                                  |

## Bracket hell

Since JavaScript uses curly brackets `{ }` to define blocks, functions, and objects, and uses square brackets `[ ]` to define arrays and indices into arrays and objects, and uses parentheses (also sometimes called round brackets) `( )` for various other things such as marking off function parameters and arguments, grouping expressions within larger statements, and containing conditional statements, it’s very easy to end up with portions of code that have lots and lots of differently shaped brackets nested inside of each other in ways that can be hard to keep track of. Here’s an example from earlier:

    var arrAlpha = ["cherry", "watermelon", "apple"];
    arrAlpha.sort((a, b) => {
        if (b > a) {
            return 1;
        } else if (b < a) {
            return -1;
        } else {
            return 0;
        }
    });
    console.log(arrAlpha);

Look at lines 9 and 10 and you’ll see two curly brackets followed by a round bracket (followed by a semicolon). This indicates that three statements are all ending at pretty much the same time. If you’re not careful, you can end up losing track of which brackets go with which. Sometimes this causes the code not to run, but other times the code will run but now how you expect because you end up with brackets in the wrong places, which causes the code to behave in unexpected ways. This is a situation I call “bracket hell,” and it can be a major source of headaches. The good news is that most modern code editors will help you out with this in a couple of ways. One is by providing the close bracket automatically whenever you type an open bracket. You can see this in VS Code, for example:

![](https://paper-attachments.dropbox.com/s_0662CAA3916C915E3807D349D96C44CEFFC23C1782306F8D4CF2359DF1B675EB_1567284263729_image.png)


Many code editors will also highlight the matching bracket if you place your cursor right next to a bracket.  Again, from VS Code (note that the cursor is by the final close parenthesis):

![](https://paper-attachments.dropbox.com/s_0662CAA3916C915E3807D349D96C44CEFFC23C1782306F8D4CF2359DF1B675EB_1567283535599_image.png)


Also, most editors will indicate when there is an error in the code, as in this VS Code view of the above code with the last curly bracket deleted (note the red squiggle under the final parenthesis in the compound statement:

![](https://paper-attachments.dropbox.com/s_0662CAA3916C915E3807D349D96C44CEFFC23C1782306F8D4CF2359DF1B675EB_1567284512104_image.png)



    var arrAlpha = ["cherry", "watermelon", "apple"];
    arrAlpha.sort((a, b) => { if (b > a) { return 1; } else if (b < a) { return -1; } 
    else { return 0; });
    console.log(arrAlpha);
| Pause and think                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. The example above has a syntax error. What is it?<br>2. Rewrite this code using line breaks and indentation that makes it easier to see the program structure and identify syntax errors (hint, look at earlier examples in this lesson).<br>3. Fix the error, then identify all matching pairs of brackets, including `()`, `[]`, and `{}` in the example. |

# Interlude

[Fun facts about YOU!](https://docs.google.com/presentation/d/1O_Y-tdvFtwr6zIWHDA_ciVUYfhI0NigrXRBHj0Q-Bu4/edit?usp=sharing)

- Slightly more cats than dogs, but it’s close
- Many avid travellers and photographers
- Musicians, artists, dancers
- Several serious (and “addicted”) gamers
- Off screens too: avid readers, hikers, and cooks (yum!)
- Thrill seekers: snowboarding, skiing, roller coasters
- Several athletes and one competitive napper
- Other passions: crochet, pomegranate, rain, the zoo, plush toys, bubble tea
- Zhang and Li are tied for most common surname (3 each)
## Updates
- Week 3 Prep not quite ready, but should be by the end of today
    - It will take *a while*, plan ahead
- 2 assignments due by next class: HW1 and App of the Week Signup
- I had you read about “destructuring” and the “spread operator”, but we’re actually not going to talk about that today—we’ll get back to it in a week or two
## 10 Minute Break!
## [App of the Week](https://docs.google.com/presentation/d/1jt4-K4JipuyVXVvspRcVb6bYqMP36uzr--9qhSWkJ04/edit?usp=sharing)
# Asynchrony and Events

Most of the programs you’ve written up to this point have probably been “synchronous,” which means that the code in the program *runs at the same time* (“synchronous” means “at the same time”--”asynchronous” means “at different times”). That is to say, that when you run a typical program that you’ve written in python (say), it starts executing at the beginning, chugs through the program line by line (and there might be lots of lines!), and then, when it runs out of lines to execute it stops—the program is done. If you’ve written JavaScript in the browser, you’ve almost certainly written a different kind of program—an “asynchronous” program. Such a program doesn’t start at the beginning and stop when it runs out of lines to executes. Rather, it defines portions of the program that run at different times, often in response to things that happen outside of the program such as user input or the completion of long-running background processes—things that are generally called “events.” In this lesson we will examine asynchronous program execution with particular attention to a type of asynchronous program design called “event-driven programming.” Event-driven programming is fundamental to most modern application development frameworks and approaches, very much including React Native.

# Asynchronous execution
## What is “execution”? How does it work?

Before we get into “asynchronous execution,” let’s make sure we have a clear understanding of what normal (or “synchronous”) program execution looks like. We don’t need to get into gory details, but it’s worth making sure we’re clear on some basics. 

First, as you know, programs generally start executing at the first line, then proceed to the second line, then go on like that until they run out of lines to execute, at which point the program is done. In the following example, the program executes line 1, then line 2, then line 3, then 4, and that’s it.


    let x = 5;
    let y = x + 3;
    let z = x * y;
    console.log(z);

If a program has any conditionals or loops, it’s slightly more involved, but not too tricky. The next example executes the following lines, in order: 1, 2, 3, 4, 2, 3, 4, 2, 3, 4, exit.


    let fruits = ["banana", "apple", "pomegranate"];
    for (f of fruits){ 
        console.log(f);
    }

Consider this program:


    let fruits = ["banana", "apple", "pomegranate", "watermelon"];
    for (f of fruits){ 
        if (f[0] > "a") {
            console.log(f.toUpperCase());
        } else {
            console.log(f);
        }
    }

**Functions and the Call Stack**
What about this program?


    function square(num) {
        return num * num;
    }
    for (let i = 0; i < 4; i++) {
        square(i);
    }

Which line executes first? Clearly it’s line 4. The function `square()` doesn’t execute until it’s called on line 5. So what’s going on here?

First, when the JS interpreter encounters a function definition, it doesn’t execute it. It makes a note of it’s location so that if it ever needs to call it at some point during execution it will know where to find it (the story is a bit more complicated than this, but the main point is that the function is not executed until it’s called).

Second, when the JS interpreter encounters a function call, it *pushes the function onto the call stack.* What does this mean?

*Stacks*

![Stacks of plates are a LIFO dinnerware structure](https://ii.worldmarket.com/fcgi-bin/iipsrv.fcgi?FIF=/images/worldmarket/source/7184_XXX_v1.tif&wid=480&cvt=jpeg)


A “stack” is the name given to a common type of data structure that more or less resembles a stack of plates that you might encounter in a cafeteria (or in your kitchen for that matter). When you need a clean plate, you take one off the top of the stack. When you clean a plate and are ready to put it back onto the stack, where do you put it? On the top as well. A stack is sometimes called a “Last-in First-out” (or LIFO) data structure because the things added to it most recently are also going to be the first things to be taken back out. Those poor plates on the bottom might never get used!

In JavaScript (and in all other programming languages), a stack is just an array that is managed in a particular way. You may have noticed that arrays in JavaScript have the operations `push()` and `pop()`--these are the “stack” operations supported by the Array type. By convention, a “push” adds an item to the top of stack and a “pop” takes the top item off. Stacks have a number of uses in programming, but the use we are concerned with here is the case of the “call stack.”

*The Call Stack*
JavaScript always has one and only one “execution context” active at a time. An execution context is basically a structure that contains all of the variables and data that the program can access. It also contains the code that will be executed, one line at a time, until it runs out. When a program starts, the active execution context is the “global” context. When it comes time to execute a function, a new execution context is “pushed” onto the call stack. When the function is done executing, its context is “popped” off the stack. The following walkthrough of Example 03.1.1D illustrates this process:

| The program starts executing in the global context.                                                                                                                                                                     | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568108636989_image.png) |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| The global execution context remains active when the next line executes as well…                                                                                                                                        | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568108694591_image.png) |
| … until the interpreter encounters the function call `square(i)`,                                                                                                                                                       | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568108836035_image.png) |
| at which point it *pushes a new execution context* (also called a “stack frame”) onto the stack, after which it starts executing code in the new context (which includes the code contained in the function `square()`. | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568108865159_image.png) |
| The code within the function then executes within the new context.                                                                                                                                                      | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568108885511_image.png) |
| When the interpreter reaches the end of the function, the function’s execution context is *popped* off the stack.                                                                                                       | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568134269562_image.png) |
| Execution resumes in the global context at the line following the function call.                                                                                                                                        | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568134342111_image.png) |
| Which is the end of the loop, so execution proceeds with the next iteration of the loop, and so on…                                                                                                                     | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568134406289_image.png) |

    function foo(t) {
        return t + " world";
    }
    function bar(s) {
        return foo(s) + "!";
    }
    let h = "hello";
    console.log(bar(h));
| Now You Try #4                                                                                   |
| ------------------------------------------------------------------------------------------------ |
| 1. What does the example above print out?<br>2. List the line numbers in the order they execute. |
| [Answer on slido.](https://app.sli.do/event/6jj5lzie)                                            |

## What is asynchronous execution?

What we just covered is standard, or “single-threaded” program execution. For some programs this is fine, but for many it is not. For example, for interactive programs that perform “expensive” operations such as accessing data over the Internet or doing large, complex calculations, single-threaded programs will result in a terrible user experience. As soon as the program runs into one of those big, slow operations it will block until the operation finishes and during that time the program can’t respond to user input, present any information, or do any of the cool stuff that you designed it to do. So, we need a different approach. 

The approach we need is *asynchronous execution.* “Asynchronous” means “at different times,” so “asynchronous execution” means execution that happens at different times.  Most modern programming languages support asynchronous execution—you can write programs in such a way that you specify parts that execute in their own “threads,” where each thread is logically independent of the other and each can execute in its own time (more or less).

Many modern languages have support for *parallel execution*, in which two or more threads can execute at the same time, with the computer’s CPU either splitting time between the threads (running one for a bit, then pausing to run another one) or assigning threads to different CPU cores so that they can actually execute at exactly the same time. Unfortunately (and somewhat surprisingly), JavaScript does not have this capability. JavaScript *does* have support for asynchronous execution, it just works a bit differently. 

In JavaScript, certain functions can, in some cases, be called asynchronously, which will end up placing them into a special holding place (called the *Event Queue*) to be run at a later time. We will talk about how and when these functions eventually run, but first let’s look at one way that JavaScript allows you to invoke functions that don’t run right away, but run sometime later.

## Async JavaScript: Using Timers

The `setTimeout()` function schedules a function to run at a particular time in the future. As it happens, `setTimeout()` is not built into JavaScript itself, but it’s built into all of the JavaScript environments you’re likely to encounter, including the browser (via `window.setTimeout()`) as well as both node and ReactNative (where it’s simply called `setTimeout()`). Here is the syntax for calling `setTimeout()`:


    setTimeout(function_to_call, delay_in_milliseconds)

In other words, when you call `setTimeout()` you’re going to supply a function as well as the amount of time to delay. And here’s where it gets tricky--`setTimeout()` returns *right away.* That is, instead of waiting for `delay_in_milliseconds` milliseconds and then running the supplied function, it returns right away and the program continues executing at the line right after `setTimeout()`. And then, somehow, a little while later, the function executes. Here’s a more complete example:


    setTimeout(() => console.log("inside the timeout function"), 2000); 
    // 2000ms = 2sec
    console.log("the line after setTimeout()");
| Pause and think                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------- |
| 1. Read through the above code. Try to figure out what prints first and what prints next. Run the code and see if you were right. |

What should have happened when you ran the code is that the `console.log()` statement in line 2 executed before the `console.log()` statement in line 1. Moreover, the statement in line 1 should have only executed after a delay of 2 seconds. What’s going on here is that `setTimeout()` is telling the JavaScript environment (node, in this case) to do two things:

- start a timer (the environment will keep track of the timer)
- register a *callback* function to run when the timer expires

Once the program does those things, which take very little time, it’s done with `setTimeout()` and can resume executing at the next line. It will keep executing until it runs out of code to execute, and then it will wait. Ordinarily, a program would just exit at this point, but because of the timer the environment knows not to let the program end—it just keeps the program active and waits for the timer expiration event to show up. Once the timer expires, the JS environment will post an event to the *Event Queue*, which, since the program is just sitting around doing nothing, will be processed immediately. Once the event is received, the environment will look to see if there are any callback functions associated with this event and, since there is one, it will execute it.

# JavaScript Events

We will take a closer look at how `setTimeout()` works shortly (not so much because 
`setTimeout()` is something you’ll use all the time, though you may want to use it sometimes, but because it provides a good case study for some of the inner workings of the JS event system). Before we return to `setTimeout()`, though, let’s look at the concept of *events.* 

Event-driven programming is essential to basically all modern application development. Without events you can’t practically have user interfaces or web API access, so … pretty important. Event-driven programming requires a somewhat different mindset than “regular” programming. In “regular” programming, you just write your program and when you run it, it runs from start to finish and then it’s done. In event-driven programming, you are generally not fully in control of when parts of your program run. You write your program to respond to “events” that can, in principle, happen at any time. You do this by writing various “event handlers” that respond to different kinds of events. Something outside of the code you write, such as an execution environment (e.g., the browser or node) or a framework (such as React Native) generates events that your program “handles.” Since it’s hard to use node to investigate events, we are going to take a quick, no-frills detour into the browser. We won’t stay there long.

Let’s start with a very basic web page with some JavaScript embedded. 


    <head>
      <meta charset="utf-8">
      <title>Buttons</title>
    </head>
    <body>
      <script>
        function a() {
            document.getElementById("display").innerHTML = "A";
        }
        function b() {
            document.getElementById("display").innerHTML = "B";
        }
        console.log("JavaScript is alive."); // 
      </script>
      
      <h1 id="display"> &nbsp; </h1>
      <button type="button" onclick="a()">Display A</button>
      <button type="button" onclick="b()">Display B</button>
      
    </body>
    </html> 

Paste this into your editor and save it as ‘buttons.html,’ then save it an open it in your browser. Click some buttons. Fun! Open the JS console in your browser to see the message at the end of the `<script>`, this is just there so that there is some code to execute in the global context. 

`function a()` and `function b()` in this example are *event handlers.* As you probably can surmise, these don’t run until you click the associated button. Let’s take a closer look at what is happening here.

| We will be looking at three new elements of the JS runtime environment, along with one element we’ve seen before:<br><br>- CALL STACK: we’ve seen this before<br>- EVENT LOOP: runs continuously *whenever the call stack is empty.* It looks to see if there are any events in the *event queue* to process. If not, it does nothing. If yes, we’ll see shortly.<br>- EVENT QUEUE: when events are generated by different parts of the application, they are posted here. Posted events are processed in a First-in First-out (FIFO) order.<br>- EVENT TABLE: mappings between events and their *handlers* are stored in the Event Table. When an event appears in the Event Queue, the Event Loop looks up the event’s handler in the Event Table and executes it. | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568323699997_image.png) |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| When the browser’s JavaScript engine processes the JS code, it will make note of the two functions, but not execute them yet. The only line of code that executes in the global context is `console.log("JavaScript is alive.");` So it executes with the global context on the stack.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568323728967_image.png) |
| Once the JS is done executing, there’s nothing left to do, so the call stack is empty (along with everything else).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568323800142_image.png) |
| When the HTML is processed, the `onclick` handlers for the two buttons are found, and entered into the Event Table.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568323828952_image.png) |
| Once the handlers are entered into the Event Table, again nothing happens. The system is now waiting for an event to fire.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568323864158_image.png) |
| When the user clicks on `button1` (an arbitrary ID I’ve assigned to the first button that appears in the HTML), the “click” event for that button fires, and is posted to the Event Queue.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568323887570_image.png) |
| The Event Loop, as part of its continuous checking, sees that there is an event in the Event Queue. It looks in the Event Table to see if there is a handler registered for this event (note that many events fire that don’t have any handlers—they are just ignored).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568323926669_image.png) |
| The JavaScript Engine executes the handler. The handler function (in this case `a()`) is pushed onto the Call Stack and executed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568323961948_image.png) |
| Once the handler is done running, its execution context is popped off of the stack and again the call stack is empty. The application is once again just sitting around waiting for something to happen (i.e., for another event to be posted).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568323981997_image.png) |



| Pause and think                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------- |
| 1. Can the HTML element `<h1 id="display">…</h1>` ever display both “A” and “B” at the same time? Why or why not? |

## Timers and Events

Let’s take a closer look at the above example to unpack what happens when you call `setTimeout()`. Ordinarily you won’t need to pay nearly this much attention to the details of such things, but going through it once or twice can be very helpful for understanding how asynchronous execution works and more generally how *events* work in JavaScript. If nothing else, this information could help you track down some nasty bugs, as asynchronous bugs can be some of the nastiest bugs around.

Returning to our earlier example:

    setTimeout(() => console.log("inside the timeout function"), 2000); 
    console.log("the line after setTimeout()");

… let’s walk through what happens when this code executes. [Note: there is a syntax error in the code below. I realized it after I had generated all of the images and it was too much work to fix them all. Can you find the error? Answer after the example.]

|                                                                                                                                                                                                          | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568328495559_image.png) |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `setTimeout(…)` executes. One of the thing that it does is create a timer that is set to the specified number of milliseconds—in this case 2000ms (or 2 seconds).                                        | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568328993398_image.png) |
| The other thing that `setTimeout(…)`  does is register the callback for the event that will fire when the timer expires. It registers the function that is passed as the first argument as the callback. | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568329017531_image.png) |
| Now `setTimeout(…)` is done executing, so the setTimeout execution context is popped off the stack, and the next line executes in the global context.                                                    | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568329043509_image.png) |
| Once that line is done, there’s nothing left to do, so the call stack is empty. However, since there is still an active timer, the program does not exit.                                                | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568328606485_image.png) |
| When the timer goes off, it posts an event to the Event Queue.                                                                                                                                           | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568328632278_image.png) |
| The Event Loop detects that the event has been posted and looks in the Event Table for a handler. It executes the handler, and the rests unfolds as you would expect, based on the Event example above.  | ![](https://paper-attachments.dropbox.com/s_D8AFD527D2FDACB8DD9B289B674A2561C53A337AAF3E8F4FF254023C10E95035_1568328651378_image.png) |

Syntax error: the `;` after `console.log("inside the timeout function")` is an error. If you don’t use the `{}` you can’t use the `;` either! The correct syntax is

    setTimeout(() => console.log("inside the timeout function"), 2000); 
    console.log("the line after setTimeout()");

or 

    setTimeout(() => {console.log("inside the timeout function");}, 2000); 
    console.log("the line after setTimeout()");

Consider this example

    setTimeout(() => console.log("A"), 2000); // 2000ms = 2sec
    setTimeout(() => console.log("B"), 500); // 500ms = 1/2sec
    console.log("C");


| Now You Try #5                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------- |
| 1. What will the output of the program be?<br>2. What will the Event Queue and Call Stack look like immediately after line 3 executes? |
| [Answer on slido.](https://app.sli.do/event/6jj5lzie)                                                                                  |

# Conclusion

This lesson concludes our (initial) deep-dive into the internal workings of JavaScript. We’ve covered several low-level details in Lessons 01-02 and it’s not necessary that you have committed all of these details to memory. Hopefully after these lessons you have a more solid mental model of how key aspects of JavaScript work, and this mental model will help keep you steady as we jump into React Native. Asynchronous event-driven execution is going to be especially important in understanding how React Native (and, for that matter, virtually any modern application development framework) works. We’ll cover a few more JS concepts as we go along, but now we have enough to jump in and start building mobile apps!

# 



# 

