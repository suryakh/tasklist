from flask  import Blueprint
from flask import request,jsonify
from server import mysql
import jwt
import json

task = Blueprint("task",__name__,static_url_path='/static')

@task.route('/addtask/<id>',methods=["POST"])
def addtask(id):
    content = request.json["content"]
    token = request.headers.get("Authorization")
    encoded_data = token.split(' ')[0]
    try:
        decode_data = jwt.decode(encoded_data,'users',algorithms=['HS256'])
        cursor = mysql.connection.cursor()
        cursor.execute(
        """INSERT INTO tasks (user_id,tasklist_id,content) values(%s,%s,%s)""",(decode_data['id'],id,content)
        )
        cursor.connection.commit()
        cursor.close()
        return "gasdfasd"
    except:
        return "error"

@task.route('/gettasks/<id>',methods=["GET"])
def gettasks(id):
    token = request.headers.get("Authorization")
    encoded_data = token.split(' ')[0]
    try:
        decode_data = jwt.decode(encoded_data,'users',algorithms=['HS256'])
        cursor = mysql.connection.cursor()
        cursor.execute(
        """SELECT * FROM tasks WHERE user_id = %s AND tasklist_id =%s""",(decode_data['id'],id)
        )
        results = cursor.fetchall()
        cursor.close()
        items = []
        for item in results:
            items.append(item)
        return jsonify(items)
    except:
        return "error"
    
@task.route('/getsingletask/<id>',methods=["GET","POST","DELETE"])
def getsingletask(id):
    if request.method == "GET":
        token = request.headers.get("Authorization")
        encoded_data = token.split(' ')[0]
        try:
            decode_data = jwt.decode(encoded_data,'users',algorithms=['HS256'])
            cursor = mysql.connection.cursor()
            cursor.execute(
            """SELECT * FROM tasks WHERE id = %s""",(id,)
            )
            results = cursor.fetchall()
            cursor.close()
            items = []
            for item in results:
                items.append(item)
            return jsonify(items)
        except:
            return "error"
    elif request.method == "POST":
        content = request.json['content']
        token = request.headers.get("Authorization")
        encoded_data = token.split(' ')[0]
        try:
            decode_data = jwt.decode(encoded_data,'users',algorithms=['HS256'])
            cursor = mysql.connection.cursor()
            cursor.execute(
            """UPDATE tasks SET content= %s WHERE id = %s """,(content,id)
            )
            cursor.connection.commit()
            cursor.close()
            return "success"
        except:
            return "error"
    else:
        token = request.headers.get("Authorization")
        encoded_data = token.split(' ')[0]
        try:
            decode_data = jwt.decode(encoded_data,'users',algorithms=['HS256'])
            cursor = mysql.connection.cursor()
            cursor.execute(
            """DELETE FROM tasks WHERE id = %s""",(id,)
            )
            cursor.connection.commit()
            cursor.close()
            return "success Dleted"
        except:
            return "error"
        