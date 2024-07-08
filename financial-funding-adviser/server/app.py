import time
from flask import Flask, request, send_from_directory
from ortools.linear_solver import pywraplp
import numpy as np
import os

app = Flask(__name__)

dist_folder = os.path.join(os.getcwd(), "..", "dist")

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
    x = [solver.NumVar(0.0, solver.infinity(), f"{request.json["funding"][i]["name"]}") for i in range(len(c))]
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
    