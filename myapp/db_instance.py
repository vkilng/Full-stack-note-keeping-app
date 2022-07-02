"""
Connecting to local My SQL database instance/server
"""
import mysql.connector

class MySQLConnector():
    """Connection class to be used in flask application server
    """

    def __init__(self):
        self.conn=mysql.connector.connect(
            host="localhost",
            user="root",
            password="Root",
            database="srvrdb"
        )
        self.crsor=self.conn.cursor()
