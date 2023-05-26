from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import random
import wikipediaapi
from bs4 import BeautifulSoup
import requests
import json

app = Flask(__name__, static_folder='static')
CORS(app, origins='*')


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
what_is_you_name_answers = [
    "My name is (Chatbot AI).",
    "I am an AI i don't have a special name but you can call me (Chatbot AI).",
]

@app.route('/')
def index():
    return render_template('aichatbot.html')


def search_on_google(query):
    search_results = []
    url = f"https://www.google.com/search?q={query}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract search results
    search_results = soup.find_all("div", class_="tF2Cxc")

    return search_results


def process_message(message):
    message = message.lower()

    if message == "hi" or message == "hello":
        return random.choice(welcome_answers)
    elif message == "fine, thanks" or message == "fine" or message == "thanks" or message == "thank you" or message == "happy" or message == "very happy" or message == "great" or message == "good":
        return random.choice(happy_answers)
    elif message == "what's your name" or message == "what is your name" or message == "how to change your name":
        return random.choice(what_is_you_name_answers)

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
        # Search Wikipedia for the user's input
        wiki_wiki = wikipediaapi.Wikipedia('en')
        page = wiki_wiki.page(message)

        if page.exists():
            return page.summary

        else:
            # Search on Google using the user's input
            search_results = search_on_google(message)

            if search_results:
                # Extract relevant information from the search results using BeautifulSoup
                info_list = []
                for result in search_results:
                    title = result.find('h3').get_text()
                    snippet_element = result.find('span', class_='aCOpRe')

                    if snippet_element:
                        snippet = snippet_element.get_text()
                    else:
                        snippet = ""

                    info_list.append({
                        'title': title,
                        'snippet': snippet
                    })

                # Generate response with larger snippets
                response_text = ""
                for info in info_list:
                    title = info['title']
                    snippet = info['snippet']

                    # Adjust the number of characters to display from the snippet
                    max_characters = 2500
                    if len(snippet) > max_characters:
                        snippet = snippet[:max_characters] + '...'

                    response_text += f"{title}\n{snippet}\n\n"

                return response_text

            else:
                return random.choice(confusion_answers)


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data['message']
    ai_message = process_message(user_message)
    response = {'message': ai_message}
    return jsonify(response)


if __name__ == '__main__':
    app.run()
