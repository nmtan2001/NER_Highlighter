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
            // console.log(textContent)
            chrome.runtime.sendMessage(
                { par: textContent },
                function (response) {
                    result = response.farewell;
                    var combinedArray = [];
                    if (result.ORG !== undefined) {
                        //console.log('ORG:', result.ORG, typeof result.ORG);
                        var orgArray = Array.isArray(result.ORG) ? result.ORG : [result.ORG];
                        combinedArray = combinedArray.concat(orgArray);
                    }

                    if (result.PER !== undefined) {
                        //console.log('PER:', result.PER, typeof result.PER);
                        var perArray = Array.isArray(result.PER) ? result.PER : [result.PER];
                        combinedArray = combinedArray.concat(perArray);
                    }

                    if (result.LOC !== undefined) {
                        //console.log('LOC:', result.LOC, typeof result.LOC);
                        var locArray = Array.isArray(result.LOC) ? result.LOC : [result.LOC];
                        combinedArray = combinedArray.concat(locArray);
                    }
                    if (combinedArray.length > 0) {
                        // Create a regular expression pattern with alternatives from the combined array
                        var regexPattern = '\\b(' + combinedArray.join('|') + ')\\b';
                        var regex = new RegExp(regexPattern, 'g');

                        // Replace the matched elements with the highlighted version
                        var highlightedText = textContent.replace(regex, function (match) {
                            if (orgArray && orgArray.includes && orgArray.includes(match)) {
                                console.log('color org')
                                return '<span style="color: #ff0000;">' + match + '</span>'; //red
                            }
                            else if (perArray && perArray.includes && perArray.includes(match)) {
                                console.log('color per')
                                return '<span style="color: #cc7722;">' + match + '</span>'; //brown
                            } else if (locArray && locArray.includes && locArray.includes(match)) {
                                console.log('color loc')
                                return '<span style="color: #0000ff;">' + match + '</span>'; //blue
                            }
                            return match;
                        });

                        // Replace the original paragraph's content with the updated text
                        element.innerHTML = highlightedText;
                    }

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
    }

}