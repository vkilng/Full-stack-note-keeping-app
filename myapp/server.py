"""
A python backend server developed using Flask micro-web framework,
to facilitate data processing and transfer between a client browser and a database
"""
from flask import Flask, request, jsonify, json
from db_instance import MySQLConnector

app=Flask(__name__)

@app.route("/", methods=['GET'])
def test():
    """GET method to test 'connection to server'

    Returns:
        __JSON Response__: returns JSON object at "/" endpoint,
        if connection successful
    """
    return jsonify({"message":"GET Test Successful !!!"})

@app.route("/tkinpt",methods=['POST'])
def add_user():
    """POST method to process data from html form,
    and write to mysql database

    Returns:
        _JSON Response_: returns JSON object if connection at "/tkinpt" endpoint successful,
        otherwise, returns error message
    """
    if request.method=='POST':
        print("--> It's in !")
        data=request.data.decode('UTF-8')
        data1=json.loads(data)
        name=data1["name"]
        age=data1["age"]
        print(name,age)
        cn_db=MySQLConnector()
        crsr=cn_db.crsor
        crsr.execute("INSERT INTO pplinfo(name,age) VALUES(%s,%s)",(name,age))
        cn_db.conn.commit()
        crsr.close()
        print("Commit done !!!")
        alldata={"metadata":{"Name":name,"Age":age}}
        return jsonify(alldata),301
        #I decided against using Flask's render_template method
        #because I do not wish for the server to handle frontend services

    return {"Error":"Check for error"},404

@app.route("/lst",methods=['GET'])
def get_lst():
    """GET method to send data of users to '/lst' endpoint

    Returns:
        _JSON Response_: returns JSON object converted from python dictionary
    """
    if request.method=='GET':
        lst_dict={}
        cn_db=MySQLConnector()
        crsr=cn_db.crsor
        crsr.execute("SELECT * FROM pplinfo")
        for user in crsr:
            lst_dict[str(user[2])]={}
            lst_dict[str(user[2])]["name"]=user[0]
            lst_dict[str(user[2])]["age"]=str(user[1])
        crsr.close()
        lst_dict["length"]=str(len(lst_dict))
        return jsonify(lst_dict),200

@app.after_request
def after_method(resp):
    """Sends headers to browser to allow cross-domain references

    Args:
        resp: response of method()

    Returns:
        resp: Headers corresponding to the response sent by methods above
    """
    resp.headers["Access-Control-Allow-Origin"]="*"
    return resp

if __name__ == "__main__":
    app.run()
    