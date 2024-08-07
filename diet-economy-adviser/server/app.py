import time
from flask import Flask, request, send_from_directory
from ortools.linear_solver import pywraplp
import numpy as np
import os
from db import HandleNutritionTable

app = Flask(__name__)

dist_folder = os.path.join(os.getcwd(), "..", "frontend", "dist")

# Serve static files
@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/create-food', methods=['POST'])
def create_food():
    '''
    Correct order to populate the table
    title, 
    carbs, 
    fat, 
    protein, 
    calories, 
    sodium, 
    fiber, 
    vitaA, 
    vitaC, 
    folic, 
    calcium, 
    iron, 
    price, 
    description, 
    personalrating, 
    potasium, 
    magnesium, 
    city, 
    vitaB12, 
    maxquantity
    '''
    print(f"Request json: {request.json}")
    food = (request.json['food']['title'], 
            float(request.json['food']['carbs']), 
            float(request.json['food']['fat']), 
            float(request.json['food']['protein']), 
            float(request.json['food']['calories']), 
            float(request.json['food']['sodium']),
            float(request.json['food']['fiber']),
            float(request.json['food']['vitaA']),
            float(request.json['food']['vitaC']),
            float(request.json['food']['folic']),
            float(request.json['food']['calcium']),
            float(request.json['food']['iron']),
            float(request.json['food']['price']),
            request.json['food']['description'],
            float(request.json['food']['personalrating']),
            float(request.json['food']['potasium']),
            float(request.json['food']['magnesium']),
            request.json['food']['city'],
            float(request.json['food']['vitaB12']),
            float(request.json['food']['maxquantity'])
            )
    
    print(food)
    myNutritionTable = HandleNutritionTable()
    
    # Add the food to the database
    status = myNutritionTable.insert_data(data=[food])
    if status['status_code']  == myNutritionTable.status_code['success']:
        return {"message": "Food created successfully"}
    else:
        return {"message": f"Food could NOT be created: {status['data']}"}
    
@app.route('/api/update-food-by-id', methods=['POST'])
def update_food_by_id():
    id = request.json['id']
    column_name = request.json['column']
    new_value = request.json['value']

    myNutritionTable = HandleNutritionTable()
    data = myNutritionTable.update_column_value(id, column_name, new_value)
    if data['status_code']  == myNutritionTable.status_code['success']:
        return {"message": "updated successfully"}
    else:
        return {"message": f"Food could NOT be update"}

@app.route('/api/foods', methods=['GET'])
def get_all_foods():
    myNutritionTable = HandleNutritionTable()
    data = myNutritionTable.get_foods()
    if data['status_code']  == myNutritionTable.status_code['success']:
        return {"data": data['data']}
    else:
        return {"message": f"Food could NOT be retrieved: {data['data']}"}

@app.route('/api/advise', methods=['POST'])
def get_food_advise():

    myNutritionTable = HandleNutritionTable()
    foods_available = myNutritionTable.get_foods()
    if foods_available['status_code']  == myNutritionTable.status_code['success']:
        
        print("Received list of foods and requirements")
        #print(f"Request json: {request.json}")
        #print(f"Foods available: {foods_available['data']}")
    
        solver = pywraplp.Solver.CreateSolver("GLOP")
        if not solver:
            return {"error": 2}

        # Costs
        c = [float(food["price"]) for food in foods_available["data"]]
        print(f"Built vector of costs of len: {len(c)}")
        print(f"Vector c:\n {c}")

        # Variables
        x = [solver.NumVar(0.0, solver.infinity(), f"{foods_available['data'][i]['title']}") for i in range(len(c))]
        print(f"Built vector of variables of len: {len(x)}")

        # Requirements
        nutrition_strings_ordered = [
            "carbs",
            "fat",
            "protein",
            "calories",
            "fiber",
            "vitaa",
            "vitac",
            "vitab12",
            "folic",
            "calcium",
            "iron",
            "potasium",
            "magnesium"
        ]

        b = [0]*len(nutrition_strings_ordered)
        for idx, name_nutrient in enumerate(nutrition_strings_ordered):
            b[idx] = (float(request.json["nutritionreq"][name_nutrient]))
        #b.append(float(request.json["personalpreference"]))

        for idx, food in enumerate(foods_available['data']):
            b.append(float(food['maxquantity'])) # we should not eat more than 5 *100g of each food a day
        print(f"Vector b:\n {b}")

        print(f"Built vector of requirements of len: {len(b)}")

        # Matrix of coefficients
        A = np.zeros((len(nutrition_strings_ordered), len(foods_available['data'])), dtype=float)

        for i in range(A.shape[0]):
            for j in range(A.shape[1]):
                A[i,j] = foods_available['data'][j][nutrition_strings_ordered[i]]

        A = np.concatenate((A, np.eye(len(foods_available['data']), dtype=float)), axis=0)

        print(f"Built matix of shape: ({A.shape[0]}, {A.shape[1]})")
        #print(f"Matrix A:\n {A}")

        # Constraints
        constraints = []
        for i, bi in enumerate(b):
            if i < len(nutrition_strings_ordered):
                constraints.append(solver.Constraint(bi, solver.infinity()))
            else:
                constraints.append(solver.Constraint(0, bi))
            for j, vari in enumerate(A.transpose()):
                constraints[i].SetCoefficient(x[j], vari[i])

        print(f"Created constraints from matrix")

        objective = solver.Objective()
        for cnt, var in enumerate(x):
            objective.SetCoefficient(var, c[cnt])
        objective.SetMinimization()

        status = solver.Solve()
        
        if status == pywraplp.Solver.OPTIMAL:
            print("There is an optimal solution")
            print(f"Objective value = {solver.Objective().Value():0.1f}")
            
            solutions = []
            for cnt, var in enumerate(x):
                print(f"{solver.variables()[cnt].name()} = {var.solution_value():0.1f}")
                solutions.append({"foodname": solver.variables()[cnt].name(), "optval": var.solution_value()})
            return {"error": 0, "optsolution": solutions}
        else:
            print(f"It was not possible to find an optimal")
            if status == solver.FEASIBLE:
                print("A potentially suboptimal solution was found.")
            else:
                print("The solver could not solve the problem.")
            
            return {"error": 1}

    else:
        return {"message": f"Food could NOT be retrieved: {foods_available['data']}"}
    