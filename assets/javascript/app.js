$(document).ready(function() {

    /// RUN THE RESET FUNCTION WHEN THE PAGE LOADS 
    reset();

    /// TRIVIA QUESTIONS
        var trivia = [{
            question: "When was the Cavaliers first season in the NBA?",
            answers: ["1970-1971", "1978-1979", "1980-1981", "1972-1973"],
            position: "0",
        }, {
            question: "What was Austin Carr's number?",
            answers: ["18", "22", "34", "43"],
            position: "2",
        }, {
            question: "Whose number was 22 and was the sixth jersey to be retired on the Cleveland Cavaliers?",
            answers: ["Bingo Smith", "Mark Price", "Austin Carr", "Larry Nance"],
            position: "3",
        }, {
            question: "Who was the first coach of the Cleveland Cavaliers??",
            answers: ["Bill Fitch", "Stan Albeck", "Don Delaney", "George Karl"],
            position: "0",
        }, {
            question: "What was the Cleveland Cavaliers motto for the 2007 Playoffs",
            answers: ["All Together", "Rise Up!", "Defend the Land", "All For One"],
            position: "1",
        }, {
            question: "What year did they make their first appearance in the NBA Finals?",
            answers: ["2005", "2006", "2008", "2007"],
            position: "3",
        }];

    /// RESET FUNCTION 
        function reset() {
            correct = 0;
            incorrect = 0;
            incomplete = 0;
            maxTime = 15;
            $("#correct").html("<p>CORRECT: " + correct + "</p>");
            $("#incorrect").html("<p>INCORRECT: " + incorrect + "</p>");
            $("#incomplete").html("<p>INCOMPLETE: " + incomplete + "</p>");
            $("#show-number").html("<p>" + maxTime + "</p>");
            $("#trivia-panel-q").html("<h2>Press Start to begin!</h2>");
            $("#trivia-panel-a").hide();
            $("#submit").hide();
        }

    /// STOP WATCH

        // Variables
        var maxTime = 15; //time allowed per question 
        var intervalId; //the count down holder variable

        //  The run function sets an interval that runs the decrement function once per second.
        function run() {
            intervalId = setInterval(decrement, 1000);
        }

        //  The decrement function
        function decrement() {
            maxTime--; //  Decreases the max time by one.
            $("#show-number").html("<p>" + maxTime + "</p>");
            if (maxTime === 0) {
                stop();
                score();
            }
        }

        //  The stop function
        function stop() {
            clearInterval(intervalId);
        }

    /// TRIVIA GAME

        // Counter variables
        var correct = 0;
        var incorrect = 0;
        var incomplete = 0;
        var numQues = trivia.length;
        var queNum = 0;


        // Hide start button and show submit button
        // When start button is clicked, run game function
        $("#start").click(function() {
            $("#start").hide();
            $("#submit").show();
            $("#trivia-panel-a").show();
            game();
        });

        // Load the game board 

        function game() {

            // Print question 
            var question = trivia[queNum].question; // write to: $("#trivia-panel-q")
            $("#trivia-panel-q").html("<h2>" + question + "</h2>");

            // Print answers[i] in radio buttons
            $(".radio-inline").each(function(index) {
                $(this).find("p").html(trivia[queNum].answers[index]);
            });

            // Store correct answer to compare against radio button chosen
            correctAns = trivia[queNum].position;

            // Begin timer
            run();

        };


        // Register submit button click
        $("#submit").click(function() {
            score();
        });

        var userGuess;

        // Score Function

        function score() {
            //Check to see which radio button has "checked" = "true"        
            $(".radio-inline").each(function(index) {
                if ($(this).find('input')[0].checked == true) {
                    userGuess = $(this).find('input')[0].id;
                }
            });

            // Compare userGuess to correctAns
            if (userGuess === correctAns) {
                correct++;
                alert("Correct!");
                $("#correct").html("<p>CORRECT: " + correct + "</p");
            } else {
                incorrect++;
                alert("Incorrect! The answer is " + trivia[queNum].answers[correctAns] +".");
                $("#incorrect").html("<p>INCORRECT: " + incorrect + "</p");
            }

            // Score has been counted so move to next question in the trivia array
            queNum++;

            // Set up the next game
            maxTime = 16;
            stop();

            if (queNum < numQues) {
                game();
            } else {
                summary();
            }
        };

        // Summary page function 

        function summary() {
            // If user scored over 50% - they're a Cavs fan
            if (correct > 3) {
                $("#trivia-panel-q").html("<h2>You're a pro!</h2><br><p>You correctly guessed " + correct + " out of " + numQues + " questions.");
                $("#imgHolder").html("<img src= ./assets/images/lebron-cavs.jpg>");
            } 
            // If user scored less than 50%, they're a loser
            else {
                $("#trivia-panel-q").html("<h2>You must be a Warriors fan!</h2><br><p>You incorrectly guessed " + incorrect + " out of " + numQues + " questions.");
                $("#imgHolder").html("<img src= ./assets/images/kyrie-cavs.jpg>");
            }
            $("#trivia-panel-a").hide(); // Hides radio button panel
            $("#submit").hide(); // Hides submit button
            $("#timer").hide(); //Hides timer
            $("#counter").hide(); //Hides timer
        };

}); //closing document ready function
