function handleForwardClick() {
    setTimeout(() => {
        const firstScreen = document.querySelector('.first-screen');
        const secondScreen = document.querySelector('.second-screen');
        const titleText = document.querySelector('.title-text');
        const inputBox = document.querySelector('.input-box');
        const shipMark = document.querySelector('.ship-mark');
        const inputValue = Number(inputBox.value);

        if (!isNaN(inputValue) && inputValue >= 10 && inputValue <= 50) {
            shipMark.textContent = `#${inputValue}`;
            firstScreen.style.display = 'none';
            secondScreen.style.display = 'flex';
            titleText.style.animation = 'none';
            setTimeout(() => startTypingAnimation(currentMessageIndex), 0);
        } else {
            alert("Invalid Ship!");
            inputBox.value = '';
        }
    }, 100);
}


// ------------------------------------------------------------------------------------------------



const messages = [
    "Welcome to the itachi island..land of the greatest mathematician itachi",
    "all we know is...when he died, he put the treasure piece in the unbreakable box",
    "you can only open the box with a 4 digit pincode with non repeating digits",
    "don't worry, you are allowed to make infinite guesses",
    "and with each guess, you get a hint....best luck"
];

let currentMessageIndex = 0;
let typingTimeout;


function disableButtons(disable) {
    const forwardButton = document.querySelector('.forward-button');    
    forwardButton.disabled = disable;
}


function typeMessage(message, element, delay) {
    clearTimeout(typingTimeout);
    element.textContent = '';
    let index = 0;

    disableButtons(true);

    function typing() {
        if (index < message.length) {
            element.textContent += message.charAt(index);
            index++;
            typingTimeout = setTimeout(typing, delay);
        } else {
            disableButtons(false);
        }
    }
    typing();
}

function startTypingAnimation(index, typingDelay = 30) {
    const messageElement = document.getElementById('animated-message');
    const backwardButton = document.querySelector('.backward-button');

    typeMessage(messages[index], messageElement, typingDelay);
    backwardButton.style.display = currentMessageIndex === 0 ? 'none' : 'block';
}

function handleNextClick() {
    setTimeout(() => {
        if (currentMessageIndex < messages.length - 1) {
            currentMessageIndex++;
            startTypingAnimation(currentMessageIndex);
        } else {
            const inputBox = document.querySelector('.input-box');
            const inputValue = Number(inputBox.value);
            window.location.href = `puzzle1.html?ship=${inputValue}`;
        } 
      }, 100);
}

function handleBackwardClick() {
    setTimeout(() => {
        if (currentMessageIndex > 0) {
            currentMessageIndex--;
            startTypingAnimation(currentMessageIndex, 10);
        }
    }, 100);
}