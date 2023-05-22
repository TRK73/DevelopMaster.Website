from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import random
from langdetect import detect
import re
from googlesearch import search
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

def is_ad_link(link):
    ad_patterns = [
        "googleadservices.com",
        "doubleclick.net",
        "adservice.google.com",
        "adclick",
        "adurl",
        "adclick.",
        "adserver",
        "ad-",
        "/ads/",
        "/ad/",
        "/ads?",
        "utm_medium=cpc",
        "utm_campaign=",
        "utm_source=google",
    ]
    for pattern in ad_patterns:
        if pattern in link:
            return True
    return False
welcome_answers = [
    "Hi, How are you today?",
    "Hello, How are you today?",
    "Hi, How are you today?"
]

happy_answers = [
    "I'm happy that you are feeling great.",
    "I'm glad that you are happy.",
    "I hope that you stay happy forever.",
    "Great! Feel free to ask about anything.",
    "Good! Start asking if you want."
]

confusion_answers = [
    "I know that you want me to answer you, but my information is limited because I am a limited AI. I will have more information soon.",
    "I didn't understand that.",
    "I'm sorry, I didn't understand that!"
]

sad_answers = [
    "Why? Don't be sad.",
    "What makes you feel that bad?",
    "No problem everybody can feel sad, but what makes you sad?"
]

solve_answers = [
    "That's okay, don't be sad.",
    "I'm sorry about that. Can I help you with something?",
    "No problem, everybody can feel sad."
]

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data['message']
    reply = process_message(message)
    return jsonify({'reply': reply})

def process_message(message):
    message = message.lower()

    if message == "hi" or message == "hello":
        return random.choice(welcome_answers)
    elif message == "fine, thanks" or message == "fine" or message == "thanks" or message == "thank you" or message == "happy" or message == "very happy" or message == "great" or message == "good":
        return random.choice(happy_answers)
    elif message == "what's your name" or message == "what is your name" or message == "how to change your name":
        return random.choice(confusion_answers)
    
    elif message == "i feel bad" or message == "i feel sad" or message == "sad" or message == "bad" or message == "very bad" or message == "very sad":
        return random.choice(sad_answers)
    elif message == "i got low marks" or message == "i got bad marks" or message == "my friend left me" or message == "my friends left me" or message == "i don't have friends" or message == "everyone hates me" or message == "nobody loves me":
        return random.choice(solve_answers)
    
    if message.startswith("calculate"):
        expression = message[10:]  # Extract the expression to be calculated
        try:
            result = eval(expression)  # Evaluate the expression
            return f"The result is: {result}"
        except Exception:
            return "Oops! Something went wrong. Please check your expression."

    else:
        # Perform a Google search based on the user's input
        query = message
        search_results = search(query, num_results=5, lang='en')

        # Filter out ads and unwanted links from the search results
        filtered_results = []
        for result in search_results:
            if not is_ad_link(result):
                filtered_results.append(result)

        if len(filtered_results) > 0:
            answers = []
            for result in filtered_results:
                try:
                    response = requests.get(result)
                    soup = BeautifulSoup(response.text, "html.parser")
                    answer = soup.get_text().strip()
                    answers.append(answer)
                except Exception:
                    pass

            if len(answers) > 0:
                return ' '.join(answers)
            else:
                return "Sorry, I couldn't find any relevant information."

        else:
            return "Sorry, I couldn't find any relevant information."

if __name__ == '__main__':
    app.run()
