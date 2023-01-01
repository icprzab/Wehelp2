from datetime import datetime, timedelta, time
from mysql.connector import pooling
import os
from dotenv import load_dotenv
load_dotenv()
sqluser = os.getenv("sqluser")
sqlpasswd = os.getenv("sqlpasswd")

connection_pool = pooling.MySQLConnectionPool(pool_name="pynative_pool",
                                              pool_size=5,
                                              pool_reset_session=True,
                                              host="localhost",
                                              database="taipei_day_trip",
                                              user=sqluser,
                                              password=sqlpasswd)


class Information:
    def search_email(email):
        try:
            connection_object = connection_pool.get_connection()
            mycursor = connection_object.cursor()
            query_email = "SELECT * FROM member WHERE email = %s"
            mycursor.execute(query_email, (email,))
            myresult_email = mycursor.fetchone()
            mycursor.close()
            connection_object.close()
            return myresult_email
        except:
            return None

    def insert_account_info(res_input_name, res_input_email, res_input_password):
        try:
            connection_object = connection_pool.get_connection()
            mycursor = connection_object.cursor()
            query_account_info = "INSERT INTO member(name, email, password) VALUES(%s,%s,%s)"
            mycursor.execute(query_account_info,
                             (res_input_name, res_input_email, res_input_password,))
            connection_object.commit()
            mycursor.close()
            connection_object.close()
            return True
        except:
            return False

    def search_attractions_all(page_cul):
        try:
            connection_object = connection_pool.get_connection()
            mycursor = connection_object.cursor()
            query_attractions_all = "SELECT * FROM attractions LIMIT 12 OFFSET %s"
            mycursor.execute(query_attractions_all, (page_cul,))
            myresult_attractions_all = mycursor.fetchall()
            mycursor.close()
            connection_object.close()
            return myresult_attractions_all
        except:
            return None

    def search_attractions_category(keyword, page):
        try:
            connection_object = connection_pool.get_connection()
            mycursor = connection_object.cursor()
            query_attractions_category = "SELECT * FROM attractions WHERE category = %s LIMIT 12 OFFSET %s"
            mycursor.execute(query_attractions_category, (keyword, page,))
            myresult_attractions_category = mycursor.fetchall()
            mycursor.close()
            connection_object.close()
            return myresult_attractions_category
        except:
            return None

    def search_attractions_name(name, page):
        try:
            connection_object = connection_pool.get_connection()
            mycursor = connection_object.cursor()
            query_attractions_name = "SELECT * FROM attractions WHERE name like %s LIMIT 12 OFFSET %s"
            mycursor.execute(query_attractions_name, (name, page,))
            myresult_attractions_name = mycursor.fetchall()
            mycursor.close()
            connection_object.close()
            return myresult_attractions_name
        except:
            return None

    def search_attractions_id(id):
        try:
            connection_object = connection_pool.get_connection()
            mycursor = connection_object.cursor()
            query_attractions_id = "SELECT * FROM attractions WHERE id = %s"
            mycursor.execute(query_attractions_id, (id,))
            myresult_attractions_id = mycursor.fetchall()
            mycursor.close()
            connection_object.close()
            return myresult_attractions_id
        except:
            return None

    def search_categories():
        try:
            connection_object = connection_pool.get_connection()
            mycursor = connection_object.cursor()
            query_categories = "SELECT category from attractions GROUP BY category"
            mycursor.execute(query_categories)
            myresult_categories = mycursor.fetchall()
            mycursor.close()
            connection_object.close()
            return myresult_categories
        except:
            return False

    def update_booking(attractionId, bookingDate, time, price, email):
        try:
            connection_object = connection_pool.get_connection()
            mycursor = connection_object.cursor()
            query_update_booking = "UPDATE member SET attractionId= %s, bookingDate= %s, time= %s, price=%s WHERE email= %s;"
            mycursor.execute(query_update_booking,
                             (attractionId, bookingDate, time, price, email,))
            connection_object.commit()
            mycursor.close()
            connection_object.close()
            return True
        except:
            return False

    def search_booking(email):
        try:
            connection_object = connection_pool.get_connection()
            mycursor = connection_object.cursor()
            query_search_booking = "SELECT attractionID, bookingDate, time, price from member WHERE email = %s"
            mycursor.execute(query_search_booking, (email,))
            myresult_booking = mycursor.fetchone()
            mycursor.close()
            connection_object.close()
            return myresult_booking
        except:
            return False

    def search_booking_attraction(id):
        try:
            connection_object = connection_pool.get_connection()
            mycursor = connection_object.cursor()
            query_search_booking_attraction = "SELECT id, name, address, images from attractions WHERE id = %s"
            mycursor.execute(query_search_booking_attraction,
                             (id,))
            myresult_booking_attraction = mycursor.fetchone()
            mycursor.close()
            connection_object.close()
            return myresult_booking_attraction
        except:
            return False

    def delete_booking(email):
        try:
            connection_object = connection_pool.get_connection()
            mycursor = connection_object.cursor()
            query_update_booking = "UPDATE member SET attractionID=null, bookingDate=null, time=null, price=null WHERE email= %s;"
            mycursor.execute(query_update_booking,
                             (email,))
            connection_object.commit()
            return True
        except:
            return False

    def insert_order(memberID, attractionName, attraction_date, attraction_time, price, order_number, unpaid):
        try:
            connection_object = connection_pool.get_connection()
            mycursor = connection_object.cursor()
            query_insert_orders = "INSERT INTO orders(memberID, attractionName, date, time, price, orderNumber, status) VALUES(%s,%s,%s,%s,%s,%s,%s)"
            mycursor.execute(query_insert_orders,
                             (memberID, attractionName, attraction_date, attraction_time, price, order_number, unpaid,))
            connection_object.commit()
            mycursor.close()
            connection_object.close()
            return True
        except:
            return False

    def update_order(paid, orderNumber):
        try:
            connection_object = connection_pool.get_connection()
            mycursor = connection_object.cursor()
            query_update_orders = "UPDATE orders SET status=%s WHERE orderNumber= %s"
            mycursor.execute(query_update_orders,
                             (paid, orderNumber,))
            connection_object.commit()
            mycursor.close()
            connection_object.close()
            return True
        except:
            return False
