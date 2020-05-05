from flask import Blueprint
from server import mysql
from flask import request,jsonify
import json
import jwt


tlist = Blueprint("tlist",__name__,static_url_path="/static")

@tlist.route("/createtlist",methods=["POST"])
def cretetlist():
    title = request.json["title"]
    token = request.headers.get("Authorization")
    token_encoded = token.split(' ')[0]
    try:
        decode_data = jwt.decode(token_encoded,'users',algorithms=['HS256'])
        # print(decode_data)
        cursor = mysql.connection.cursor()
        cursor.execute(
            """INSERT INTO tasklist (user_id,title) VALUES (%s,%s)""",(decode_data["id"],title)
         )
        cursor.connection.commit()
        cursor.close()
        return "created"
    except:
        return "error"
    

@tlist.route('/gettlists')
def gettlist():
    token = request.headers.get('Authorization')
    token_encoded= token.split(' ')[0]
    try:
        decode_data = jwt.decode(token_encoded,'users',algorithms=['HS256'])
        print(decode_data['id'])
        cursor= mysql.connection.cursor()
        cursor.execute(
            """select * from (select tasklist.user_id as user_id,tasklist.id as tasklist_id,tasklist.title as tasklist_title,count(tasks.id) as count  from tasklist left join tasks on tasks.tasklist_id = tasklist.id group by tasklist.id)as newtable where user_id = %s""",(decode_data['id'],)
        )
        results = cursor.fetchall()
        cursor.close()
        print(results)
        items = []
        for item in results:
            items.append(item)
        return jsonify(items)
    except:
        return json.dumps({"message":"error"})
    
@tlist.route('/singletasklist/<id>',methods=["GET","POST","DELETE"])
def getsingletasklist(id):
    if request.method == "GET":
        token = request.headers.get('Authorization')
        token_encoded= token.split(' ')[0]
        try:
            decode_data = jwt.decode(token_encoded,'users',algorithms=['HS256'])
            print(decode_data['id'])
            cursor= mysql.connection.cursor()
            cursor.execute(
                """SELECT * FROM tasklist WHERE user_id = %s AND id = %s """,(decode_data['id'],id)
            )
            results = cursor.fetchall()
            cursor.close()
            print(results)
            items = []
            for item in results:
                items.append(item)
            return jsonify(items)
        except:
            return json.dumps({"message":"error"})
    elif request.method == "POST":
        content = request.json['content']
        token = request.headers.get('Authorization')
        token_encoded= token.split(' ')[0]
        try:
            decode_data = jwt.decode(token_encoded,'users',algorithms=['HS256'])
            cursor= mysql.connection.cursor()
            cursor.execute(
                """UPDATE tasklist set title = %s WHERE id = %s""",(content,id)
            )
            cursor.connection.commit()
            cursor.close()
            return json.dumps({"message":"success"})
        except:
            return json.dumps({"message":"error"})
    else:
        
        token = request.headers.get('Authorization')
        token_encoded= token.split(' ')[0]
        try:
            decode_data = jwt.decode(token_encoded,'users',algorithms=['HS256'])
            cursor= mysql.connection.cursor()
            cursor.execute(
                """DELETE FROM tasks WHERE tasklist_id = %s""",(id,)
            )
            cursor.connection.commit()
            cursor.close()
            cursor= mysql.connection.cursor()
            cursor.execute(
                """DELETE FROM tasklist WHERE id = %s""",(id,)
            )
            cursor.connection.commit()
            cursor.close()
            return json.dumps({"message":"Deleted"})
        except:
            return json.dumps({"message":"error"})