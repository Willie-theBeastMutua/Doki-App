import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.indexes import VectorstoreIndexCreator
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import PyPDFLoader
from langchain.document_loaders import DirectoryLoader


app = Flask(__name__)
CORS(app)


# Set the OpenAI API key
os.environ["OPENAI_API_KEY"] = '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'

# Initialize the PDF loader and create the index
loader =DirectoryLoader ("C:/Users/Wilson Mutua/OneDrive - healthstrat.co.ke/Projects/Doki-App/Doki/docs")
index = VectorstoreIndexCreator().from_loaders([loader])

# Initialize the ChatOpenAI model
chat_model = ChatOpenAI(api_key=os.environ["OPENAI_API_KEY"])

@app.route('/query', methods=['POST'])
def query():
    try:
        # Get the user's question from the request
        data = request.get_json()
        user_question = data['question']
        print(data);

        # Execute the query using the index and ChatOpenAI model
        result = index.query(user_question, llm=chat_model)

        # Return the result as JSON
        return jsonify({'result': result})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True)
