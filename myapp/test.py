"""
Fucntional Testing of Flask application using unittest package
"""
import unittest
from server import app

class FlasktesTest(unittest.TestCase):
    """Testing test() method of app.server.py at "/"

    Args:
        unittest (_type_): Inheriting Testcase instance from unittest
    """
    def test_index_status(self):
        """Checking for response status 200
        """
        tester = app.test_client(self)
        response = tester.get("/")
        #self.assertEqual(response.status_code,200)
        assert response.status_code == 200

    def test_index_content(self):
        """Checking for response content-type: application/json
        """
        tester = app.test_client(self)
        response = tester.get("/")
        assert response.content_type == "application/json"

    def test_index_data(self):
        """Checking for data sent in response
        """
        tester = app.test_client(self)
        response = tester.get("/")
        self.assertTrue(b'Test Successful' in response.data)


class FlasktestAdduser(unittest.TestCase):
    """Testing add_user() method of app.server.py at "/tkinpt"

    Args:
        unittest (_type_): Inheriting Testcase instance from unittest
    """

    def test_index_status(self):
        """Checking for response status and data
        """
        tester = app.test_client(self)
        sent='{"name":"Carter","age":78}'.encode()
        response = tester.post("/tkinpt",data=sent)
        assert response.status_code == 301
        assert response.content_type == "application/json"
        assert response.data == b'{"metadata":{"Age":78,"Name":"Carter"}}\n'



if __name__=="__main__":
    unittest.main()
