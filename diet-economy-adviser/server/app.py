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
    (title, 
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
    vitaB12)
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
            )
    
    print(food)
    myNutritionTable = HandleNutritionTable()
    
    # Add the food to the database
    status = myNutritionTable.insert_data(data=[food])
    if status['status_code']  == myNutritionTable.status_code['success']:
        return {"message": "Food created successfully"}
    else:
        return {"message": f"Food could NOT be created: {status['data']}"}
    
@app.route('/api/foods', methods=['GET'])
def get_all_foods():
    myNutritionTable = HandleNutritionTable()
    data = myNutritionTable.get_foods()
    if data['status_code']  == myNutritionTable.status_code['success']:
        return {"data": data['data']}
    else:
        return {"message": f"Food could NOT be retrieved: {data['data']}"}

@app.route('/api/advise', methods=['POST'])
def get_financial_advise():
    '''
    x1 = solver.NumVar(0, solver.infinity(), "x1")
    x2 = solver.NumVar(0, solver.infinity(), "x2")
    x3 = solver.NumVar(0, solver.infinity(), "x3")

    solver.Add(x1 <= 20)
    solver.Add(x2 <= 10)
    solver.Add(x3 <= 35)
    solver.Add(x1 + x2 + x3 == 50)
    '''
    print(f"Request json: {request.json}")
    
    solver = pywraplp.Solver.CreateSolver("GLOP")
    if not solver:
        return {"error": 2}

    c = [float(source["interestrate"]) for source in request.json["funding"]]
    x = [solver.NumVar(0.0, solver.infinity(), f"{request.json['funding'][i]['name']}") for i in range(len(c))]
    b = [float(source["maxdebt"]) for source in request.json["funding"]]
    b.append(float(request.json["valuetopay"]))
    A = np.eye(len(c), dtype=float)
    A = np.append(A, np.ones((1, A.shape[1]), dtype=float), axis=0)

    constraints = []
    for i, bi in enumerate(b):
        if i == len(b) - 1:
            constraints.append(solver.Constraint(bi, bi))
        else:
            constraints.append(solver.Constraint(0, bi))
        for j, vari in enumerate(A.transpose()):
            constraints[i].SetCoefficient(x[j], vari[i])

    objective = solver.Objective()
    for cnt, var in enumerate(x):
        objective.SetCoefficient(var, c[cnt])
    objective.SetMinimization()

    status = solver.Solve()
    
    if status == pywraplp.Solver.OPTIMAL:
        print(f"Objective value = {solver.Objective().Value():0.1f}")
        
        solutions = []
        for cnt, var in enumerate(x):
            print(f"var {cnt+1} = {var.solution_value():0.1f}")
            solutions.append({"fundingsource": solver.variables()[cnt].name(), "optval": var.solution_value()})
        return {"error": 0, "optsolution": solutions}
    else:
        return {"error": 1}
    