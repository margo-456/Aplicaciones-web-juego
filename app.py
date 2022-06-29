
# Importacion de las librerias glob, io, os, uuid.
import glob
import io
import os
import uuid
#importar la libreia numpy 
import numpy as np
# Importar la libreria flask y los componentes de renderizar la carpeta de trabajo
from flask import Flask, jsonify, make_response, render_template, request
# Importacion de la libreria matplotlib y canvas para crear la figura
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure

app = Flask(__name__)
app.secret_key = "s3cr3t"
app.debug = False
# Especificacion de la ruta de la carpeta de trabajo
app._static_folder = os.path.abspath("templates/static/")

"""
Funcion que vincula la ruta de la pagina con el metodo GET
Parametros
----------
return
------
retorna  a la pagina de inicio
"""
#vincula una URL a una función. Con el metodo GET
@app.route("/")
#funcion inicio
def juego():
    #titulo de la pagina
    title = "Create the input image"
    #retorno hacia la pagina inicio
    return render_template("layouts/juego.html")

#metodo main del programa

if __name__ == '__main__':
    #debug = True, para reiniciar automáticamente el servidor
    app.run(debug=True)
    