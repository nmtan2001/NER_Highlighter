# NER Highlighter extension for The Guardan
#### Video Demo and Walkthrough: [Link](https://drive.google.com/file/d/1Gh8qJB390toqCRl9i7FI9p8Wl8rduNCn/view)
## Description: 
A server-side Chrome extension that highlights the entities (*Person, Location, Organization*) on the e-newspaper [The Guardian](https://www.theguardian.com/) using Machine Learning. The frontend was built using ***Javascript, HTML and CSS***. The backend was powered by ***Django***. The choice for JS is based on *browser compability*, *web technology intergration* and *Chrome Extension APIs*. The frontend was intentionally designed with simplicity in mind, as the primary focus of the implementation was to showcase the underlying logic. Django was selected for the backend due to its compatibility with the ML model.

Training of ML model was done using Google Colab. The train model is based on spaCy's ***"en_core_web_lg"*** with modifications. The data for training was CoNLL 2003 English data, which is a collection of news wire articles from the Reuters Corpus. The annotation has been done by people of the University of Antwerp. Data preprocessing and training was done through spaCy's CLI. The selection of spaCy is attributed to its efficiency in both training the model and deploying it to production.

The extension operates by scraping text from the article through **popup.js** and transmitting it to **background.js** via *GET* requests to the backend server. Subsequently, the server processes the text using the trained ML model to extract entities, which are *PER* (person), *LOC* (location), *MISC* (miscellaneous) and *ORG* (organization). Only *PER, LOC and ORG* are then sent back to the frontend. **background.js** receives the results and relays them to **popup.js**. Following this, **popup.js** is responsible for applying color highlights to the corresponding entities in the text (**BROWN** for *PER*,   **RED** for *ORG* and **BLUE** for *LOC*)


I encountered significant challenges while working on this task due to my limited experience with the assignment, compounded by the recent update to manifest V3. Moreover, the existing tutorials and resources predominantly focus on manifest V2, exacerbating the difficulty of navigating the learning curve for the updated version. This marks my inaugural attempt at constructing a comprehensive extension, and as such, it is inherently basic with some noticeable flaws. Future iterations aim to enhance the model's capabilities by training it to recognize a broader range of entities, prioritizing accuracy improvement. Additionally, expanding the extension's compatibility with a wider array of websites is a feature that should be easily incorporable. Your understanding and patience as I navigate this learning process are greatly appreciated.

## Install project
Clone the whole project through Github and running in Visual Studio Code or any other IDE. 
run pip install -r requirements.txt
#### Run backend server: 
To initiate the backend server, start by changing the directory to the "mysite" folder. Subsequently, run the server using the following commands: `python3 manage.py runserver`
#### Load extension to browser:
Open the extension section in your browser, then select ***Developer mode***. Subsequently, click on ***Load unpacked*** and navigate to the folder named ***grabText_ext***

## Use the extension
Open any article on The Guardian ([Example](https://www.theguardian.com/commentisfree/2023/dec/23/ai-chat-gpt-environmental-impact-energy-carbon-intensive-technology)) and click **Scrape text** button on the extension. 





