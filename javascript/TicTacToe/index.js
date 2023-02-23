/*################################################################################*/
/*# **JavaScript for Gender Reveal Animation**                                   #*/
/*#     Description: This is the primary code for the gender reveal animation    #*/
/*#     and is what makes and runs all the images.                               #*/
/*#                                                                              #*/
/*#     File: script.js                                                          #*/
/*#     Author : Kyle Murphy                                                     #*/
/*#     Notes and Assistance: Brian Hart, GitHub, YouTube, & JavaScript Academy  #*/
/*#                                                                              #*/
/*################################################################################*/


/*################################################################################*/
/*#                                  Variables                                   #*/
/*################################################################################*/

// Allows for the instance of a button click with the mouse so that
// nothings is executed before is should be. Also utilizes the DOM api
// queryselector in order to return the specific element using the selector.
window.addEventListener('DOMContentLoaded', () => {
    // Sets tiles to an array.from in order to create a solid array from 
    // an array like object that is caused by calling .tile using queryselectorall.
    const tiles = Array.from(document.querySelectorAll('.tile'));
    // Returns the first element that matches the player.
    const display_player = document.querySelector('.display-player');
    // Returns the first element that matches reset id for the reset button.
    const reset_button = document.querySelector('#reset');
    // Returns the first element that matches the announcment at hand.
    const announcement_display = document.querySelector('.game_announcements');

    // Creates an array of 9 empty strings for the gameboard to allow for
    // X and O inputs onto the board.
    let grid_input = ['', '', '', '', '', '', '', '', ''];
    // Creates a variable to set the current player X or O.
    let curr_player = 'X';
    // Checks to see if the game is running still or someone has won or tied.
    let game_running = true;

    // Creates a variable for each end game situation.
    const X_Won = 'X_Won';
    const O_Won = 'O_Won';
    const tie = "tie";

    // Creates a variable to set all the possible winning conditions.
    // Imagine this grid:
    //                    0 1 3
    //                    3 4 6
    //                    6 7 8
    // Now just plug in the indexes below and it covers the win combos.
    const win_combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    /*################################################################################*/
    /*#                                  Functions                                   #*/
    /*################################################################################*/

    // Function to check to see if the game is over or not.
    function result_check() {
        // Set the game over to be false so that we can check first.
        let game_over = false;
        // Loop to go through the grid and compare each of the index values
        // to the winninng combinations. 
        for (let i = 0; i <= 7; i++) {
            const game_won = win_combos[i];
            // Sets three variables to check all the win combos.
            const a = grid_input[game_won[0]];
            const b = grid_input[game_won[1]];
            const c = grid_input[game_won[2]];
            // Continues to next index if a tile is blank.
            if (a === '' || b === '' || c === '') {
                continue;
            }
            // Check to see if there is a winning combination and then
            // sets the the game to over, breaks out of loop and then
            // it is up to the announcement function.
            if (a === b && b === c) {
                game_over = true;
                break;
            }
        }
        // If the game is won then an announcement is made.
        if (game_over) {
            announcement(curr_player === 'X' ? X_Won : O_Won);
            game_running = false;
            return;
        }

        // If the grid has no more empty spaces then the game is a tie.
        if (!grid_input.includes('')) {
            announcement(tie);
        }
    }

    // Makes the game announcment for the result.
    const announcement = (type) => {
    // Uses switch case to determine which announcment to be made.
    switch (type) {
        case X_Won:
            announcement_display.innerHTML = 'Player <span class="X">X</span> Won! Congrats!!';
            break;
        case O_Won:
            announcement_display.innerHTML = 'Player <span class="O">O</span> Won! Congrats!!';
            break;
        case tie:
            announcement_display.innerText = 'It is a tie! What a bunch of Shenanigans!!';
        }
    };


    // Checks to see if a move checks out so as not too cause an error on
    // an already marked space by checking what is there.
    const move_is_valid = (tile) => {
        // If tile has an x or o then return false.
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }
        // If tile is empty then return true.
        return true;
    };

    // Updates the board for current player and index.
    const update_game = (index) => {
        grid_input[index] = curr_player;
    }

    // If the game is still active then this will switch the player.
    // It removes the current player and then add the next player.
    const switch_player = () => {
        display_player.classList.remove(`player${curr_player}`);
        curr_player = curr_player === 'X' ? 'O' : 'X';
        display_player.innerText = curr_player;
        display_player.classList.add(`player${curr_player}`);
    }

    // This is now setting the user input and the action the code takes.
    const user_input = (tile, index) => {
        console.log(tile, index)
        // Checks to see if the tile is valid and clickable and the game is still going.
        if (move_is_valid(tile) && game_running) {
            // Assigns the current player.
            tile.innerText = curr_player;
            // Uses classList DOM element to return class attributes.
            // Also uses literals to display current player better.
            tile.classList.add(`player${curr_player}`);
            // Updates the game board.
            update_game(index);
            // Checks to see if the games is over.
            result_check();
            // If the game is still going, it switches the player.
            switch_player();
        }
    }

    // Resets the board to blank utilizing the reset button.
    const reset_game = () => {
        // Sets the gameboard back to blanks.
        grid_input = ['', '', '', '', '', '', '', '', ''];
        // Checks to see if game is currently running.
        game_running = true;
        // Clears the announcement
        announcement_display.textContent = '';
        // If the player is currently set to O then reset it X.
        if (curr_player === 'O') {
            switch_player();
        }
        // loops through all the tiles and removes all the X's and O's.
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('X');
            tile.classList.remove('O');
        });
    }

    // Utilizes the user input function and allows the clicking of the mouse.
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => user_input(tile, index));
    });

    // Utilizes the reset game function and allows it to be accomplished
    // by pressing the reset button with the mouse.
    reset_button.addEventListener('click', reset_game);
});

// Used sources from W3Schools and JavaScript Acamdemy