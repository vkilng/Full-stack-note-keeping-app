"""
A python backend server developed using Flask micro-web framework,
to facilitate data processing and transfer between a client browser and a database
"""
import os
from datetime import timedelta
from flask import Flask, request, jsonify, session
from flask_session import Session
from flask_cors import CORS,cross_origin
from mysql_connect2 import MySQLConnector

app=Flask(__name__)

SECRET_KEY = os.urandom(12)
SESSION_TYPE = 'filesystem'
SESSION_COOKIE_SAMESITE="None"
SESSION_COOKIE_SECURE=True
app.config['PERMANENT_SESSION_LIFETIME'] =  timedelta(minutes=15)
app.config.from_object(__name__)
Session(app)
CORS(app)

@app.route("/signup",methods=['POST'])
def add_user():
    """POST method to process data from html sign up form,
    and write to mysql database

    Returns:
        _JSON Response_: returns JSON object if connection at "/signup" endpoint successful,
        otherwise, returns error message
    """
    if request.method=='POST':
        print("--> User signup process initiated !")
        name=request.form["suname"]
        age=request.form["suage"]
        pswd=request.form["supsw"]
        print(name,age)
        cn_obj=MySQLConnector()
        crsr=cn_obj.crsor
        crsr.execute("INSERT INTO srvrdb.userinfo(name,age,password) VALUES(%s,%s,%s)",(name,age,pswd))
        cn_obj.conn.commit()
        crsr.close()
        cn_obj.conn.close()
        print("Commit done !!!")
        print("Connection closed...")
        return jsonify({"message":"done"}),301

    return {"Error":'Error, Please try after a while !'},404

@app.route("/login",methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    """POST method to send data of user to '/login' endpoint

    Returns:
        _JSON Response_: returns JSON object
    """
    if request.method=='POST':
        print("--> User login initiated !")
        name=request.form["name"]
        pswd=request.form["psw"]
        cn_obj=MySQLConnector()
        crsr=cn_obj.crsor
        crsr.execute("SELECT * FROM srvrdb.userinfo WHERE name=%s and password=%s",(name,pswd))
        data=crsr.fetchone()
        print("User : ",data)
        print(session)
        if data:
            session['logged in']=True
            session['username']=data[1]
            print("Session : ",session)
            crsr.close()
            cn_obj.conn.close()
            return jsonify({"Success":"done"})
    return jsonify({"Error":"User Account not found, Sign Up !"})

@app.route("/getuserdata",methods=['GET'])
@cross_origin(supports_credentials=True)
def get_user():
    """GET method to send user data to session.html
    Returns:
        _type_: JSON object with logout messsage
    """
    print("Getting user session data : ",session)
    if session['logged in'] is True:
        userdata = {"name":session['username']}
        return jsonify(userdata)
    return jsonify({"logged_in":"False"})

@app.route("/logout",methods=['GET'])
@cross_origin(supports_credentials=True)
def logout_user():
    """GET method to clear session on server-side and logout user

    Returns:
        _type_: JSON object with logout messsage
    """
    if session['logged in'] is True:
        session.pop('username')
        session['logged in']=False
        print("Logout --> session state :",session)
        return jsonify({"message":"You'll be redirected to the login page"})
    return jsonify({"logged_in":"False"})

if __name__ == "__main__":
    #app.secret_key='LotMislongwinded'
    app.run()
