from flask import Blueprint
from flask import request
import os
import json
import base64
import jwt
import hashlib
from server import mysql


auth = Blueprint("auth",__name__,static_url_path="/static")

@auth.route("/signup" ,methods=["POST"])
def register():
    username = request.json["username"]
    email= request.json["email"]
    mobile = request.json["mobile"]
    password = request.json["password"]
    salt = generate_salt()
    password_hash = hasing(password + str(salt))
    cursor = mysql.connection.cursor()
    cursor.execute(
        """INSERT INTO users (username, email, salt, password_hash,mobile)
        VALUES (%s, %s, %s, %s,%s )""", (username, email, salt, password_hash,mobile)
    )
    mysql.connection.commit()
    cursor.close()
    return json.dumps({"message":"updated"})

@auth.route("/login" ,methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """select * from users where username= %s""",(username,)
    )
    results = cursor.fetchall()
    user = results[0]
    salt = user["salt"]
    new_password = password+salt
    password_hash = hasing(new_password)
    if password_hash == user["password_hash"]:
        encode_Data = jwt.encode({"id":user["id"]},'users',algorithm= 'HS256')
        return json.dumps({"token":str(encode_Data),"profileimg":user["image"]})
    else:
        return json.dumps({"message":"inavlid input"})

    

def generate_salt():
    salt = os.urandom(16)
    return base64.b64encode(salt)

def hasing(string):
    hash= hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()
    
