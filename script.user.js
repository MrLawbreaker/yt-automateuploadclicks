// ==UserScript==
// @name         Youtube Upload Button Automation
// @namespace    http://tampermonkey.net/
// @version      2024-07-08
// @description  add button to automate clicking NO AI & Hide From Subs
// @author       Marco
// @match        https://studio.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/MrLawbreaker/yt-automateuploadclicks/main/script.user.js
// @downloadURL  https://raw.githubusercontent.com/MrLawbreaker/yt-automateuploadclicks/main/script.user.js

// ==/UserScript==

(function() {
    'use strict';

    // Function to check for the element and add the button
    function addButtonToElement() {
        // Check if button already exists
        const lButton = document.querySelector('#wwbutton');

        // Replace '#title.ytcp-uploads-dialog' with the correct selector of your element
        const lTitle = document.querySelector('#title.ytcp-uploads-dialog');

        if (!lButton && lTitle) {
            // Create a new button
            const button = document.createElement('button');
            button.id = 'wwbutton';
            button.innerHTML = 'Click me';
            button.style = 'color:red';
            // Define what happens when the button is clicked
            button.addEventListener('click', () => {
                
                const lShowMoreButton = document.querySelector('#toggle-button.ytcp-video-metadata-editor');
                if (lShowMoreButton) {
                    button.disabled = true;
                    lShowMoreButton.click();

                    setTimeout(setBoxes, 1000);
                }
            });

            // Append the button to the element
            lTitle.parentElement.appendChild(button);
        }

        setTimeout(addButtonToElement, 1000);
    }

    function setBoxes() {
        const lAICheckbox = document.querySelector('tp-yt-paper-radio-button[name="VIDEO_HAS_ALTERED_CONTENT_NO"]');
        const lShowSubsCheckbox = document.querySelector('#notify-subscribers');

        const lButton = document.querySelector('#wwbutton');

        var lWorked = 0;

        if (lAICheckbox && !lAICheckbox.checked) {
            lAICheckbox.click();
            lWorked++;
        }

        if (lShowSubsCheckbox && lShowSubsCheckbox.checked) {
            lShowSubsCheckbox.click();
            lWorked++;
        }

        lButton.style = 'color:green';
        lButton.disabled = false;
        lButton.textContent += ' ' + lWorked + 'x geklickt!'
    }

    // Start the function
    addButtonToElement();
})();
