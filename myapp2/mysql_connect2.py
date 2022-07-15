"""
Connecting to local My SQL database instance/server
"""
import mysql.connector
from mysql.connector import errorcode

class MySQLConnector():
    """Connection class to be used in flask application server
    """

    def __init__(self):
        config = {
            'host':'localhost',
            'user':'root',
            'password':'Root',
            'database':'srvrdb',
            #'client_flags': [mysql.connector.ClientFlag.SSL],
            #'ssl_ca': 'E:/ImgAPI/Project1/DigiCertGlobalRootCA.crt.pem'
        }

        try:
            self.conn = mysql.connector.connect(**config)
            print("Connection established")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with the user name or password")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist")
            else:
                print(err)
        else:
            self.crsor = self.conn.cursor()
