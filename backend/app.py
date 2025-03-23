# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import random

app = Flask(__name__)
CORS(app)


@app.route('/call', methods=['POST'])
def make_call():
    data = request.get_json()

    name = data.get('name')
    phone = data.get('phone')

    # Print the name and phone number for debugging
    print(f"Name: {name}")
    print(f"Phone: {phone}")

    if not name or not phone:
        return jsonify({'message': 'Name and phone number are required'}), 400

#6e67c210-6e7a-4596-a9eb-3450614dcb20
    # Prepare payload for the external API
    payload = {
        "squadId": "6e67c210-6e7a-4596-a9eb-3450614dcb20",  # Fixed squadId
        "customer": {
            "number": phone  # The phone number passed from the user
        },
        "phoneNumberId": "acfe3a21-c30d-43a5-acbd-e9e2d8037f9f",  # Fixed phoneNumberId
        "assistantOverrides": {
            "variableValues": {
                "name": name  # Dynamically added name as per request
            }
        }
    }

    # Set the headers as provided
    headers = {
        "Authorization": "Bearer b8b9b221-d4c5-45c0-a95b-e0234f745e40",
        "Content-Type": "application/json",
    }

    # Send the POST request to the external API
    try:
        response = requests.post('https://api.vapi.ai/call/phone', json=payload, headers=headers)
        print(f"External API response: {response.status_code}, {response.text}")

        if response.status_code == 201:
            return jsonify({'message': 'Call initiated successfully!', 'data': response.json()}), 200
        else:
            return jsonify({'message': 'Failed to initiate call', 'error': response.text}), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({'message': 'Error making the external API request', 'error': str(e)}), 500


@app.route('/get_credit_score', methods=['POST'])
def get_credit_score():
    try:
        # Get the incoming JSON body
        body = request.get_json()

        # Extract customer PAN card number
        pan_card_number = body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["pancard_number"]
        print(pan_card_number)
        # Ensure the pan_card_number is provided
        if not pan_card_number:
            return jsonify({"message": "Missing required PAN card number."}), 400

        # Randomly generate a number between 700 and 900
        random_number = random.randint(700, 900)
        toolCallId = body["message"]["toolWithToolCallList"][0]["toolCall"]["id"]

        # Return the response with the random number
        return jsonify({
                "results": [
                    {
                        "toolCallId": toolCallId,
                        "result": random_number
                    }
                ]
            }), 200

    except Exception as error:
        print(f"Error: {error}")
        return jsonify({"message": "An error occurred."}), 500


@app.route('/get_loan_amount', methods=['POST'])
def get_loan_amount():
    try:
        # Get the incoming JSON body
        body = request.get_json()
        print(body)

        # Extract customer PAN card number
        multiplier = 0.4
        tenure_years = body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["tenure"]
        monthly_income = body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["income"]
        cibil_score = body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["cibil_score"]


        # Randomly generate a number between 700 and 900
        random_number = random.randint(700, 900)
    
        # Normalize CIBIL score factor
        cibil_factor = (cibil_score - 300) / 600  # Scales CIBIL from 0 to 1
    
        # Convert tenure to months
        tenure_months = tenure_years * 12
    
        # Calculate loan amount
        loanamount  = cibil_factor * (multiplier * monthly_income * tenure_months)
    
        loan_amount = round(loanamount, 2)  # Return rounded loan amount

        return jsonify({
             "results": [
                {
            "toolCallId": body["message"]["toolWithToolCallList"][0]["toolCall"]["id"],
            "result": loan_amount
        }
             ]

        }), 200

    except Exception as error:
        print(f"Error: {error}")
        return jsonify({"message": "An error occurred."}), 500


if __name__ == '__main__':
    app.run(debug=True ,  host='0.0.0.0', port=5000)
