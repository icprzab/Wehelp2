import mysql.connector
from datetime import datetime, timedelta, time
import jwt

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="rootroot",
    database="taipei_day_trip"
)


class Information:
    def search_email(email):
        try:
            mycursor = db.cursor()
            query_email = "SELECT * FROM member WHERE email = %s"
            mycursor.execute(query_email, (email,))
            myresult_email = mycursor.fetchone()
            return myresult_email
        except:
            return None

    def insert_account_info(res_input_name, res_input_email, res_input_password):
        try:
            mycursor = db.cursor()
            query_account_info = "INSERT INTO member(name, email, password) VALUES(%s,%s,%s)"
            mycursor.execute(query_account_info,
                             (res_input_name, res_input_email, res_input_password,))
            db.commit()
            return True
        except:
            return False

    def search_attractions_all(page_cul):
        try:
            mycursor = db.cursor()
            query_attractions_all = "SELECT * FROM attractions LIMIT 12 OFFSET %s"
            mycursor.execute(query_attractions_all, (page_cul,))
            myresult_attractions_all = mycursor.fetchall()
            return myresult_attractions_all
        except:
            return None

    def search_attractions_category(keyword, page):
        try:
            mycursor = db.cursor()
            query_attractions_category = "SELECT * FROM attractions WHERE category = %s LIMIT 12 OFFSET %s"
            mycursor.execute(query_attractions_category, (keyword, page,))
            myresult_attractions_category = mycursor.fetchall()
            return myresult_attractions_category
        except:
            return None

    def search_attractions_name(name, page):
        try:
            mycursor = db.cursor()
            query_attractions_name = "SELECT * FROM attractions WHERE name like %s LIMIT 12 OFFSET %s"
            mycursor.execute(query_attractions_name, (name, page,))
            myresult_attractions_name = mycursor.fetchall()
            return myresult_attractions_name
        except:
            return None

    def search_attractions_id(id):
        try:
            mycursor = db.cursor()
            query_attractions_id = "SELECT * FROM attractions WHERE id = %s"
            mycursor.execute(query_attractions_id, (id,))
            myresult_attractions_id = mycursor.fetchall()
            return myresult_attractions_id
        except:
            return None

    def search_categories():
        try:
            mycursor = db.cursor()
            query_categories = "SELECT category from attractions GROUP BY category"
            mycursor.execute(query_categories)
            myresult_categories = mycursor.fetchall()
            return myresult_categories
        except:
            return None
