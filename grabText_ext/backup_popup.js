let scrapeTexts = document.getElementById('scrapeTexts');

scrapeTexts.addEventListener('click', async () => {
    // Get current active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    //Execute script to parse texts on page
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeTextFrompage,
    });
})
//Function
function scrapeTextFrompage() {
    // const tech = ['AI', 'ChatGPT', 'GPT'];
    const articleBody = document.querySelector('.article-body-commercial-selector');

    if (articleBody) {
        const paragraphs = articleBody.querySelectorAll('p');

        paragraphs.forEach((element) => {
            // Get the text content of the paragraph
            var textContent = element.textContent;
            console.log(textContent)
            chrome.runtime.sendMessage(
                { par: textContent },
                function (response) {
                    result = response.farewell;
                    console.log('ORG:', result.ORG);
                    console.log('PER:', result.PER);
                    console.log('LOC:', result.LOC);
                }
            )

            // // Create a regular expression pattern with alternatives from the tech array
            // var regexPattern = '\\b(' + tech.join('|') + ')\\b';
            // var regex = new RegExp(regexPattern, 'g');

            // // Replace the matched elements with the highlighted version
            // var highlightedText = textContent.replace(regex, '<span style="color: #ff0000;">$1</span>');

            // // Replace the original paragraph's content with the updated text
            // element.innerHTML = highlightedText;
        });
        // Function to process each paragraph
        // function processParagraph(element) {
        //     var textContent = element.textContent;
        //     //console.log(textContent);

        //     return new Promise((resolve, reject) => {
        //         chrome.runtime.sendMessage({ par: textContent }, function (response) {
        //             if (chrome.runtime.lastError) {
        //                 reject(new Error(chrome.runtime.lastError));
        //             } else {
        //                 resolve(response);
        //             }
        //         });
        //     });
        // }

        // // Process each paragraph sequentially
        // (async () => {
        //     for (const element of paragraphs) {
        //         try {
        //             const response = await processParagraph(element);
        //             if (response) {
        //                 const result = response.farewell;
        //                 console.log('ORG:', result.ORG);
        //                 console.log('PER:', result.PER);
        //                 console.log('LOC:', result.LOC);
        //             } else {
        //                 console.log('Response is undefined or null.');
        //             }
        //         } catch (error) {
        //             console.error('Error sending message:', error);
        //         }
        //     }
        // })();
    }

}