from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__);

# CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
CORS(app, supports_credentials=True)

# Configurar la conexión a MongoDB
client = MongoClient('mongodb+srv://sofiamesaparra:hEKyhEhO3faORBx5@cluster0.ogcq0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client.animales_zoo
animalitos_collection = db.animalitos

# Ruta para obtener todos los animales
@app.route('/animals', methods=['GET'])
def get_animals():
    animals = list(animalitos_collection.find())
    for animal in animals:
        animal['_id'] = str(animal['_id'])
    return jsonify(animals)

# Ruta para obtener un animal por ID
@app.route('/animals/<id>', methods=['GET'])
def get_animal(id):
    animal = animalitos_collection.find_one({"_id": ObjectId(id)})
    if animal:
        animal['_id'] = str(animal['_id'])
        return jsonify(animal)
    else:
        return jsonify({"error": "Animal not found"}), 404

# Ruta para crear un nuevo animal
@app.route('/animals', methods=['POST'])
def create_animal():
    data = request.json
    animal_id = animalitos_collection.insert_one(data).inserted_id
    return jsonify(str(animal_id)), 201

# Ruta para actualizar un animal
@app.route('/animals/<id>', methods=['PUT'])
def update_animal(id):
    try:
        data = request.json

        # Asegúrate de que el campo _id no esté presente
        if '_id' in data:
            del data['_id']

        print(f"Datos recibidos: {data}")
        result = animalitos_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.modified_count:
            return jsonify({"msg": "Animal updated"}), 200
        else:
            return jsonify({"error": "Animal not found"}), 404
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500





# Ruta para eliminar un animal
@app.route('/animals/<id>', methods=['DELETE'])
def delete_animal(id):
    result = animalitos_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count:
        return jsonify({"msg": "Animal deleted"}), 200
    else:
        return jsonify({"error": "Animal not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')