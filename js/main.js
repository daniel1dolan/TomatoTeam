$(function() {
  var loading = $("#loadbar").hide();
  $(document)
    .ajaxStart(function() {
      loading.show();
    })
    .ajaxStop(function() {
      loading.hide();
    });

  $("#results").hide();
  $("#quizholder").hide();
  $("#refreshDiv").hide();

  $("#beginButton").on("click", function() {
    $("#quizholder").show();
    $("#refreshDiv").show();
    $("#beginDiv").hide();
    $("#pageDisplay").hide();
  });

  $(".navbar").css("margin-bottom", "0");

  class QTaker {
    constructor(drinkTree, innerTree) {
      this.age = false;
      this.drinkTree = drinkTree;
      this.innerTree = innerTree;
    }
    finCheck() {
      // Method that runs to check if a quiz tree is finished.
      if (parseInt(this.innerTree) > 0) {
        let fetchParam = 0;
        if (questions[this.drinkTree]["qs"][this.innerTree] == "Random") {
          // Checks if the choice on an inner drink tree is random.
          let randomSel = randomNum(
            1,
            questions[this.drinkTree]["qs"]["length"] - 1
          );
          // Generates a random choice in the chosen drink tree
          fetchParam = questions[this.drinkTree]["qs"][randomSel];
        } else {
          // The fetch becomes the choice of the user.
          fetchParam = questions[this.drinkTree]["qs"][this.innerTree];
        }
        // The results div is shown, so the results can fill it.
        $("#results").show();
        $(".navbar").css("margin-bottom", "20px");
        switch (this.drinkTree) {
          case "1":
            //Beer API
            let drinksforall = [];

            fetch(`https://api.punkapi.com/v2/beers?food=${fetchParam}`)
              .then(response => {
                return response.json();
              })
              .then(drinkArray => {
                console.log(drinkArray);
                drinksforall = [...drinksforall, ...drinkArray];
              })
              .then(() => {
                let drinkslist = drinksforall.map(array => {
                  return `<div class="card" style="width: 18rem;"><img class="card-img-top align-middle" style="height: auto; width: 100%" src=${array.image_url}><div class="card-body align-middle"><p class="card-text">${array.tagline}</p></div></div>`;
                });
                console.log(drinkslist);
                let drinknow = document.querySelector("#results-row");
                drinknow.innerHTML = drinkslist.join("");
                $("#quizholder").hide();
                $("#pageDisplay").hide();
              });
            break;
          case "2":
            //Wine API
            `WineAPI${fetchParam}`;

            fetch(
              `https://api.spoonacular.com/food/wine/pairing?apiKey=8c68b07724d1450abd164de9a4455132&food=${fetchParam}`
            )
              .then(response => {
                return response.json();
              })
              .then(array => {
                let newDis = `<div class="card" style="width: 500px;"><img class="card-img-top" src=${array.productMatches[0].imageUrl}><div class="card-body"><p class="card-text">${array.pairingText}</p></div></div>`;
                console.log(newDis);
                let drinknow = document.querySelector("#results-row");
                drinknow.innerHTML = newDis;
                $("#quizholder").hide();
                $("#pageDisplay").hide();
              });
            break;
          case "3":
            // Liquor API
            let drinksforLiquor = [];
            fetch(
              `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${fetchParam}`
            )
              .then(response => {
                return response.json();
              })
              .then(drinkArray => {
                console.log(drinkArray);
                drinksforLiquor = [...drinksforLiquor, ...drinkArray.drinks];
              })
              .then(() => {
                let drinkslist = drinksforLiquor.map(array => {
                  console.log(drinksforLiquor);
                  return `<div class="card" style="width: 18rem;"><img class="card-img-top" width="180px" src=${array.strDrinkThumb}><a class="card-body" href="https://www.thecocktaildb.com/drink/${array.idDrink}-${array.strDrink}">${array.strDrink}</a></div>`;
                });
                console.log(drinkslist);
                let drinknow = document.querySelector("#results-row");
                drinknow.innerHTML = drinkslist.join("");
                $("#quizholder").hide();
                $("#pageDisplay").hide();
                // case "4":
                //   pass
              });
            break;
        }
      }
    }
  }
  let randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // randomNum();

  const qBase = new QTaker(0, 0);

  let questions = [
    {
      name: "Aged",
      qs: {
        length: 4,
        heading: "What sort of libation are you looking for?",
        1: "Beer",
        2: "Wine",
        3: "Cocktail",
        4: "Suprise me!"
      }
    },
    {
      name: "Beer",
      qs: {
        length: 5,
        heading:
          "What type of food would you like your beer to pair well with?",
        1: "American",
        2: "Mexican",
        3: "Asian",
        4: "Italian",
        5: "Random"
      },
      image: "images/beer-vintage.jpeg",
      backgroundimage: "images/beerglass-unsplash.jpg",
      credits: "Background Credit: Timothy Dykes"
    },
    {
      name: "Wine",
      qs: {
        length: 7,
        heading:
          "What type of food would you like your wine to pair well with?",
        1: "French",
        2: "Mexican",
        3: "Asian",
        4: "Italian",
        5: "Spanish",
        6: "German",
        7: "Random"
      },
      image: "images/wine-vintage.jpeg",
      backgroundimage: "images/kelsey-knight-udj2tD3WKsY-unsplash.jpg",
      credits: "Background Credit: Kelsey Knight"
    },
    {
      name: "Cocktails",
      qs: {
        length: 7,
        heading: "What type of liquor would you prefer?",
        1: "Gin",
        2: "Vodka",
        3: "Rum",
        4: "Whiskey",
        5: "Tequila",
        6: "Brandy",
        7: "Random"
      },
      image: "images/monkey-liquor.jpeg",
      backgroundimage:
        "images/louis-hansel-shotsoflouis-Kix0S25vJEo-unsplash.jpg",
      credits: "Background Credit: Louis Hansel"
    },
    {
      backgroundimage: "images/bottles-on-shelf-unsplash.jpg",
      credits: "Background Credit: John Hernandez"
    }
  ];

  $("label.btn").on("click", function() {
    var choice = $(this)
      .find("input:radio")
      .val();
    console.log(choice);
    $("#loadbar").show();
    $("#quiz").fadeOut();
    setTimeout(function() {
      $("#answer").html($(this).checking(choice));
      $("#quiz").show();
      $("#loadbar").fadeOut();
      /* something else */
    }, 1500);
    qBase.Age = choice;
    if (choice == "false") {
      Non_Alcoholic();
      $("#quiz").hide();
      $("#results").show();
      $(".navbar").css("margin-bottom", "20px");
    } else {
      nextQ(questions[0]);
    }
  });

  $ans = 3;

  $.fn.checking = function() {
    console.log(qBase);
    // if (qBase.innerTree > 0){
    //fetch request
    // }
  };

  let nextQ = Qans => {
    if (qBase.drinkTree == "4") {
      let ranResult = randomNum(1, 3);
      console.log(ranResult);
      $("#results").show();
      $(".navbar").css("margin-bottom", "20px");
      if (ranResult == 1) {
        fetch(`https://api.punkapi.com/v2/beers/random`)
          .then(response => {
            return response.json();
          })
          .then(array => {
            console.log(array);
            let newDis = `<div class="card" style="width: 18rem;"><img class="card-img-top align-middle" width="18rem" src=${array[0].image_url}><div class="card-body align-middle"><p class="card-text">${array[0].tagline}</p></div></div>`;
            let drinknow = document.querySelector("#results-row");
            drinknow.innerHTML = newDis;
            $("#quizholder").hide();
            $("#pageDisplay").hide();
          });
      } else if (ranResult == 2) {
        let wines = [
          "merlot",
          "cabernet sauvignon",
          "prosecco",
          "chardonnay",
          "moscato",
          "pinot noir",
          "pinot grigio",
          "riesling",
          "bordeaux",
          "malbec",
          "syrah",
          "zinfandel",
          "grenache",
          "chianti",
          "champagne"
        ];
        let wineNum = randomNum(0, wines.length - 1);
        console.log(wines[wineNum]);
        fetch(
          `https://api.spoonacular.com/food/wine/recommendation?wine=${wines[wineNum]}&apiKey=8c68b07724d1450abd164de9a4455132&maxPrice=150`
        )
          .then(response => {
            return response.json();
          })
          .then(array => {
            console.log(array);
            let newDis = `<div class="card" style="width: 500px;"><img class="card-img-top" width="200px" src=${array.recommendedWines[0].imageUrl}><div class="card-body"><p class="card-text">${array.recommendedWines[0].title}: ${array.recommendedWines[0].description} It is priced at ${array.recommendedWines[0].price}</p></div></div>`;
            console.log(newDis);
            let wineRandom = document.querySelector("#results-row");
            wineRandom.innerHTML = newDis;
            $("#quizholder").hide();
            $("#pageDisplay").hide();
          });
      } else if (ranResult == 3) {
        let drinksforLiquor = [];
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
          .then(response => {
            return response.json();
          })
          .then(drinkArray => {
            console.log(drinkArray);
            drinksforLiquor = [...drinksforLiquor, ...drinkArray.drinks];
          })
          .then(() => {
            let drinkslist = drinksforLiquor.map(array => {
              console.log(drinksforLiquor);
              return `<div class="card" style="width: 18rem;"><img class="card-img-top" width="180px" src=${array.strDrinkThumb}><a class="card-body" href="https://www.thecocktaildb.com/drink/${array.idDrink}-${array.strDrink}">${array.strDrink}</a></div>`;
            });
            console.log(drinkslist);
            let drinknow = document.querySelector("#results-row");
            drinknow.innerHTML = drinkslist.join("");
            $("#quizholder").hide();
            $("#pageDisplay").hide();
          });
      }
    } else {
      $("#heading").text(Qans["qs"]["heading"]);
      // Changes the question for the next part of the quiz tree based on choice.
      let quiz = $("#quiz");
      // The quiz display is selected and emptied.
      quiz.empty();
      if (Qans["name"] != "Aged") {
        //Checks if the quiz questions being called are not the initial drink tree questions and appends the drink trees corresponding picture.
        quiz.append(`<img width="300px" src=${Qans["image"]}></img>`);
      }
      for (let i = 1; i <= Qans["qs"]["length"]; i++) {
        //Appends the questions that are in the chosen drink tree based on how many questions there are.
        quiz.append(`<label
        id="q${i}"
        class="element-animation1 btn btn-lg btn-primary btn-block"
        ><span class="btn-label"
          ><i class="glyphicon glyphicon-chevron-right"></i
        ></span>
        <input type="radio" name="q_answer" value="${i}" />${Qans["qs"][i]}</label
      >`);
      }
      if (qBase.drinkTree < 1) {
        //Checks if there has been a drink tree chosen yet.
        $("label.btn").on("click", function() {
          var choice = $(this)
            .find("input:radio")
            .val();
          $("#loadbar").show();
          $("#quiz").fadeOut();
          // Animation with a loading bar and hides the quiz while this occurs.
          setTimeout(function() {
            $("#answer").html($(this).checking(choice));
            $("#quiz").show();
            $("#loadbar").fadeOut();
          }, 1500);
          qBase.drinkTree = choice;
          // Changes the drinkTree to what the quiz taker has chosen.
          $("#bg").attr("src", questions[qBase.drinkTree]["backgroundimage"]);
          // Changes the background of the quiz based on the drinkTree chosen. I.e. beer, wine, or liquor.
          $("#credits").html(questions[qBase.drinkTree]["credits"]);
          //Photo credits.
          nextQ(questions[qBase.drinkTree]);
          //Calls the next questions based on the drinkTree chosen.
        });
      } else {
        $("label.btn").on("click", function() {
          var choice = $(this)
            .find("input:radio")
            .val();
          console.log("the choice:", choice);
          $("#loadbar").show();
          $("#quiz").fadeOut();
          setTimeout(function() {
            $("#answer").html($(this).checking(choice));
            $("#quiz").show();
            $("#loadbar").fadeOut();
            /* something else */
          }, 1500);
          qBase.innerTree = choice;
          qBase.finCheck();
        });
      }
    }
  };

  let Non_Alcoholic = () => {
    let drinksforall = [];

    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`
    )
      .then(response => {
        return response.json();
      })
      .then(drinkArray => {
        console.log(drinkArray);
        drinksforall = [...drinksforall, ...drinkArray.drinks];
      })
      .then(() => {
        let drinkslist = drinksforall.map(array => {
          //   let drinkMulti = array.strDrink.join("-");
          //   console.log(drinkMulti);
          return `<div class="card" style="width: 18rem;"><img class="card-img-top" width="200px" src=${array.strDrinkThumb}><a class="card-body" href="https://www.thecocktaildb.com/drink/${array.idDrink}-${array.strDrink}">${array.strDrink}</a></div>`;
        });
        console.log(drinkslist);
        let drinknow = document.querySelector("#results-row");
        drinknow.innerHTML = drinkslist.join("");
        $("#results").show();
        $("#quizholder").hide();
        $("#pageDisplay").hide();
      });
  };

  $("#restartButton").on("click", function() {
    location.reload();
  });
});
