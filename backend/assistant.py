


from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import random

app = Flask(__name__)
CORS(app)


headers = {
    "Authorization": f"Bearer 6e67c210-6e7a-4596-a9eb-3450614dcb20 "
    "Content-Type": "application/json"

}
assistants = [
    {
        "name": "Auto Loan Agent",
        "description": "Helps customers with auto loan inquiries.",
        "voice": "Elliot",  # Name of the assistant voice
        "model": "gpt-4",   # Choose the desired model
        "assistantId": None
    },
    {
        "name": "Personal Loan Assistant",
        "description": "Helps customers with personal loan inquiries.",
        "voice": "Neha",  # Name of the assistant voice
        "model": "gpt-4",  # Choose the desired model
        "assistantId": None
    },
    {
        "name": "Home Loan Assistant",
        "description": "Helps customers with home loan inquiries.",
        "voice": "vYENaCJHl4vFKNDYPr8y",  # Given assistant ID for Home Loan Assistant
        "model": "gpt-4",
        "assistantId": "vYENaCJHl4vFKNDYPr8y"  # Predefined ID
    },
    {
        "name": "Receptionist",
        "description": "Handles reception-related inquiries.",
        "voice": "vYENaCJHl4vFKNDYPr8",  # Given assistant ID for Receptionist
        "model": "gpt-4",
        "assistantId": "vYENaCJHl4vFKNDYPr8"  # Predefined ID
    }
]

for assistant in assistants:
    # For already existing assistant IDs, skip creation and just print confirmation
    if assistant["assistantId"]:
        print(f"[✅] Assistant with ID: {assistant['assistantId']} already exists.")
        continue

    payload = {
        "name": assistant["name"],
        "description": assistant["description"],
        "voice": assistant["voice"],
        "model": assistant["model"],
        "tools": []  # Empty tool list or populate with relevant tools for each assistant
    }

    response = requests.post("https://api.vapi.ai/assistant", headers=headers, json=payload)
    if response.status_code == 201:
        data = response.json()
        assistant["assistantId"] = data.get("id")
        print(f"[✅] Created: {assistant['name']} | ID: {data.get('id')}")
    else:
        print(f"[❌] Failed to create {assistant['name']}: {response.status_code} - {response.text}")


@app.route('/trigger_assistant', methods=['POST'])
def trigger_assistant():
    data = request.get_json()

    # Extract data from the request
    assistant_id = data.get('assistant_id')  # ID of the assistant you want to trigger
    name = data.get('name')
    phone = data.get('phone')

    if not assistant_id or not name or not phone:
        return jsonify({"message": "Assistant ID, name, and phone are required."}), 400

    # Prepare the payload for the Vapi API
    payload = {
        "assistant_id": assistant_id,
        "customer": {
            "name": name,
            "phone": phone
        }
    }

    # Make a POST request to Vapi API to trigger the assistant
    try:
        response = requests.post(VAPI_API_URL, headers=HEADERS, json=payload)
        if response.status_code == 201:
            return jsonify({"message": "Assistant triggered successfully", "data": response.json()}), 200
        else:
            return jsonify({"message": "Failed to trigger assistant", "error": response.text}), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"message": "Error triggering the assistant", "error": str(e)}), 500

@app.route('/create_squad', methods=['POST'])
def create_squad():
    # Extract data from the incoming request to create a squad
    data = request.get_json()
    squad_name = data.get('squad_name')
    squad_description = data.get('squad_description')
    assistant_ids = data.get('assistant_ids')  # List of assistant IDs to add to the squad

    if not squad_name or not assistant_ids:
        return jsonify({"message": "Squad name and assistant IDs are required."}), 400

    payload = {
        "name": squad_name,
        "description": squad_description,
        "assistants": assistant_ids
    }

    try:
        # Make a POST request to create the squad
        response = requests.post(VAPI_API_URL, headers=HEADERS, json=payload)
        if response.status_code == 201:
            squad_data = response.json()
            squad_id = squad_data.get("id")
            return jsonify({"message": "Squad created successfully", "squad_id": squad_id}), 200
        else:
            return jsonify({"message": "Failed to create squad", "error": response.text}), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"message": "Error creating the squad", "error": str(e)}), 500

@app.route('/trigger_squad', methods=['POST'])
def trigger_squad():
    data = request.get_json()

    squad_id = data.get('squad_id')
    name = data.get('name')
    phone = data.get('phone')

    if not squad_id or not name or not phone:
        return jsonify({"message": "Squad ID, name, and phone are required."}), 400

    payload = {
        "squad_id": squad_id,
        "customer": {
            "name": name,
            "phone": phone
        }
    }

    try:
        # Make the POST request to trigger the squad
        response = requests.post(f"{VAPI_API_URL}/{squad_id}/trigger", headers=HEADERS, json=payload)
        if response.status_code == 200:
            return jsonify({"message": "Squad triggered successfully", "data": response.json()}), 200
        else:
            return jsonify({"message": "Failed to trigger squad", "error": response.text}), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"message": "Error triggering the squad", "error": str(e)}), 500


@app.route('/delete_assistant', methods=['DELETE'])
def delete_assistant():
    data = request.get_json()
    assistant_id = data.get('assistant_id')

    if not assistant_id:
        return jsonify({"message": "Assistant ID is required."}), 400

    # Send DELETE request to the Vapi API to delete the assistant
    try:
        response = requests.delete(f"https://api.vapi.ai/assistant/{assistant_id}", headers=HEADERS)
        if response.status_code == 200:
            return jsonify({"message": "Assistant deleted successfully"}), 200
        else:
            return jsonify({"message": "Failed to delete assistant", "error": response.text}), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"message": "Error deleting the assistant", "error": str(e)}), 500


@app.route('/delete_squad', methods=['DELETE'])
def delete_squad():
    data = request.get_json()
    squad_id = data.get('squad_id')

    if not squad_id:
        return jsonify({"message": "Squad ID is required."}), 400

    # Send DELETE request to the Vapi API to delete the squad
    try:
        response = requests.delete(f"https://api.vapi.ai/squad/{squad_id}", headers=HEADERS)
        if response.status_code == 200:
            return jsonify({"message": "Squad deleted successfully"}), 200
        else:
            return jsonify({"message": "Failed to delete squad", "error": response.text}), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"message": "Error deleting the squad", "error": str(e)}), 500
