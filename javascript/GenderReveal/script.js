/*################################################################################*/
/*# **JavaScript for Gender Reveal Animation**                                   #*/
/*#     Description: This is the primary code for the gender reveal animation    #*/
/*#     and is what makes and runs all the images.                               #*/
/*#                                                                              #*/
/*#     File: script.js                                                          #*/
/*#     Author : Kyle Murphy                                                     #*/
/*#     Notes and Assistance: W3Schools, Brian Hart, GitHub - jaysonhaddon       #*/
/*#                                                                              #*/
/*################################################################################*/


/*################################################################################*/
/*#                                  Variables                                   #*/
/*################################################################################*/

/* Creates a reference to body, main, picture, picture_screen, reveal_button, and main_banner, and then a balloons
 * and create_balloon_list empty lists, so that they can be accessed in the document using query selector or etc. */
const body = document.querySelector("body");
const main = document.querySelector(".main");
const picture = document.querySelector("#picture");
const picture_screen = document.querySelector("#pic-source");
const reveal_button = document.querySelector(".reveal-btn");
const main_banner = document.querySelector("#main-banner");
const balloons = ["./img/1.png", "./img/2.png", "./img/3.png", "./img/4.png"];
const create_balloon_list = [];

/* Function to that is called to reveal the image, balloons, and banner when the reveal button is clicked. */
reveal_button.addEventListener("click", () => {
    create_reveal_image();
    create_balloons();
    main_banner.remove();
    reveal_button.remove();
});

/*################################################################################*/
/*#                                  Functions                                   #*/
/*################################################################################*/

/* Function that creates the revealed image for the reveal button event listener. */
function create_reveal_image() {
    /* Creates and adds all the attributes and data for image and banner creation */
    picture_screen.setAttribute("srcset", "./img/reveal.png");
    const reveal_image = document.createElement("img");
    reveal_image.setAttribute("src", "./img/reveal_small.png");
    reveal_image.classList.add("reveal-img");
    reveal_image.classList.add("banner");
    picture.appendChild(reveal_image);
    body.classList.add("active");
    /* Simple function to set the interval for the reveal animation. */
    let interval = setInterval(() => {
    let opacity = +reveal_image.style.opacity;
    if (opacity < 1) {
        opacity += 0.1;
        reveal_image.style.opacity = `${opacity}`;
    } else {
        clearInterval(interval);
    }
    }, 100);
}

/* Function that creates the balloons for the reveal button event listener. */
function create_balloons() {
    /* Sets the size and number of balloons. */
    let max = 15;
    let width = 300;
    /* Simple loop that takes one of the balloon images at random and then
     * creates it and sets its attributes. */
    for (let i = 0; i < max; i++) {
    const new_balloon = document.createElement("img");
    let random_image = Math.floor(Math.random() * balloons.length);
    let random_sign = Math.floor(Math.random() * 2);
    if (random_sign == 1) {
        width *= -1;
    }
    /* Simple loop to set the position and the speed of the balloons randomly. */
    let random_position = Math.floor(Math.random() * width);
    let random_speed = Math.floor(Math.random() * 15);
    if (random_speed < 8) {
        random_speed = 8;
    }
    /* Creates and adds all the attributes and data for the balloons to a list. */
    new_balloon.classList.add("balloon");
    new_balloon.setAttribute("src", balloons[random_image]);
    new_balloon.style.transform = `translate(${random_position}px, 800px)`;
    body.appendChild(new_balloon);
    create_balloon_list.push(new_balloon);
    /* Uses the interval function to create the balloon animation for the reveal. */
    let interval = setInterval(() => {
        new_balloon.style.transform = `translate(${random_position}px, -1000px)`;
        new_balloon.style.transition = `transform ${random_speed}s`;
        clearInterval(interval);
    }, 100);
    }
}
