import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.indexes import VectorstoreIndexCreator
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import PyPDFLoader
from langchain.document_loaders import DirectoryLoader
# import sys
from openai import OpenAI
__import__('pysqlite3')
import sys
sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')

import subprocess




app = Flask(__name__)
CORS(app)


# Set the OpenAI API key
os.environ["OPENAI_API_KEY"] = ''

# Initialize the PDF loader and create the index
loader =DirectoryLoader ("C:/Users/Wilson Mutua/Documents/chatgpt")
index = VectorstoreIndexCreator().from_loaders([loader])

# Initialize the ChatOpenAI model
chat_model = ChatOpenAI(api_key=os.environ["OPENAI_API_KEY"])

chat_history = []
def truncate_text(text, max_tokens):
    # Truncate or omit content to fit within the max_tokens limit
    tokens = text.split()
    truncated_tokens = tokens[:max_tokens]
    truncated_text = ' '.join(truncated_tokens)
    return truncated_text

@app.route('/', methods=['GET'])
def home():
    return "<p>Chatgpt Api</p>"

@app.route('/query', methods=['POST'])
def query():


    
        # Get the user's question from the request
       
        data = request.get_json()
        # print(request)
        user_question = data['question']
        # print(user_question);
        # chat_history.append({"role": "user", "content": user_question})
        # chat_history_string = '\n'.join(msg['content'] for msg in chat_history)

        # print(chat_history_string);
        # max_tokens_limit = 4096
        # chat_history_string = truncate_text(chat_history_string, max_tokens_limit)


        # Execute the query using the index and ChatOpenAI model
        result = index.query(user_question, llm=chat_model)
        # print(result)
        # specific_texts = ["I don't have information", "I don't have that information", "i don't know", "I'm sorry", "does not", "i don't",""]
        # count_of_specific_texts = any(text.lower() in result.lower() for text in specific_texts)
        # # print(count_of_specific_texts)
        # if(count_of_specific_texts or   not result):
        #     try:
        #         client = OpenAI(
        # # This is the default and can be omitted
        #         api_key=os.environ.get("OPENAI_API_KEY"),
        #         )
            
        #         result = client.chat.completions.create(
        #         messages=[{
        #              "role": "user",
        #              "content": user_question,
        #         }],
        #         model="gpt-3.5-turbo",
        #         # max_tokens=1000
        #     )
        #         # result = result['choices'][0]['message']['content']
        #         # chat_history.append({"role": "assistant", "content": result})
        #         result = result.choices[0].message.content
        #         # print(result)
        #         # return result
        #         return jsonify({'result': result})
        #     except Exception as e:
        #         # print(f"API Call Error: {e}")
        #         return jsonify({'error': str(e)})
        # result = chat_model.default_query(user_question)

        # print(result)
        # check chatgpt for unknown questions
       
            # print("We run")
            # result = chat_model.query(user_question)
            # print(result)
        # Return the result as JSON
        # chat_history.append({"role": "assistant", "content": result})

        return jsonify({'result': result})



def restart_server():
    python = sys.executable
    script = sys.argv[0]
    try:
        os.execv(sys.executable, ['python'] + sys.argv)        

    except Exception as e:
        print(f"Error restarting server: {e}")
    


def stop_server():
    # print("Stopping server...")
    sys.exit(0)

@app.route('/stop', methods=['POST'])
def stop():
    # Stop the server and restart
    # stop_server()
    # print("restart started....")
    restart_server()
    return jsonify(message="Error reading response file"), 500

    # return jsonify(message="Server stopped and restarted")

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True)
