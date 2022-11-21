from flask import Flask, request, render_template, redirect, url_for, session, jsonify
import mysql.connector
app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False
app.config["JSON_SORT_KEYS"] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True
db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="rootroot",
    database="taipei_day_trip"
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/attractions", methods=["GET"])
def api_attractions():
    try:
        mycursor = db.cursor()
        keyword = request.args.get("keyword")
        args = "%"+f"{keyword}"+"%"
        page = int(request.args.get("page", 0))
        nextPage = page + 1
        page_cul = page * 12
        page_cul2 = nextPage * 12
        if keyword == None:
            query1_1 = "SELECT * FROM attractions LIMIT 12 OFFSET %s"
            mycursor.execute(query1_1, (page_cul,))
            myresult1_1 = mycursor.fetchall()

            query1_2 = "SELECT * FROM attractions LIMIT 12 OFFSET %s"
            mycursor.execute(query1_2, (page_cul2,))
            myresult1_2 = mycursor.fetchall()

            if len(myresult1_2) != 0:
                data1_1 = {
                    "nextPage": nextPage,
                    "data": []
                }
                for i in range(len(myresult1_1)):
                    content1_1 = {
                        "id": myresult1_1[i][0],
                        "name": str(myresult1_1[i][1]),
                        "category": str(myresult1_1[i][2]),
                        "description": str(myresult1_1[i][3]),
                        "address": str(myresult1_1[i][4]),
                        "transport": str(myresult1_1[i][5]),
                        "mrt": str(myresult1_1[i][6]),
                        "lat": myresult1_1[i][7],
                        "lng": myresult1_1[i][8],
                        "images": myresult1_1[i][9].split(","),
                    }
                    data1_1["data"].append(content1_1)
                return jsonify(data1_1)

            elif len(myresult1_2) == 0:
                data1_2 = {
                    "nextPage": None,
                    "data": []
                }
                for i in range(len(myresult1_1)):
                    content1_2 = {
                        "id": myresult1_1[i][0],
                        "name": str(myresult1_1[i][1]),
                        "category": str(myresult1_1[i][2]),
                        "description": str(myresult1_1[i][3]),
                        "address": str(myresult1_1[i][4]),
                        "transport": str(myresult1_1[i][5]),
                        "mrt": str(myresult1_1[i][6]),
                        "lat": myresult1_1[i][7],
                        "lng": myresult1_1[i][8],
                        "images": myresult1_1[i][9].split(","),
                    }
                    data1_2["data"].append(content1_2)
                return jsonify(data1_2)

        elif keyword != None:
            query2 = "SELECT * FROM attractions WHERE category = %s LIMIT 12"
            mycursor.execute(query2, (keyword,))
            myresult2 = mycursor.fetchall()

            if len(myresult2) != 0:
                query2_1 = "SELECT * FROM attractions WHERE category = %s LIMIT 12 OFFSET %s"
                mycursor.execute(query2_1, (keyword, page_cul,))
                myresult2_1 = mycursor.fetchall()

                query2_2 = "SELECT * FROM attractions WHERE category = %s LIMIT 12 OFFSET %s"
                mycursor.execute(query2_2, (keyword, page_cul2,))
                myresult2_2 = mycursor.fetchall()

                if len(myresult2_2) != 0:
                    data2_1 = {
                        "nextPage": nextPage,
                        "data": []
                    }
                    for i in range(len(myresult2_1)):
                        content2_1 = {
                            "id": myresult2_1[i][0],
                            "name": str(myresult2_1[i][1]),
                            "category": str(myresult2_1[i][2]),
                            "description": str(myresult2_1[i][3]),
                            "address": str(myresult2_1[i][4]),
                            "transport": str(myresult2_1[i][5]),
                            "mrt": str(myresult2_1[i][6]),
                            "lat": myresult2_1[i][7],
                            "lng": myresult2_1[i][8],
                            "images": myresult2_1[i][9].split(","),
                        }
                        data2_1["data"].append(content2_1)
                    return jsonify(data2_1)

                elif len(myresult2_2) == 0:
                    data2_2 = {
                        "nextPage": None,
                        "data": []
                    }
                    for i in range(len(myresult2_1)):
                        content2_2 = {
                            "id": myresult2_1[i][0],
                            "name": str(myresult2_1[i][1]),
                            "category": str(myresult2_1[i][2]),
                            "description": str(myresult2_1[i][3]),
                            "address": str(myresult2_1[i][4]),
                            "transport": str(myresult2_1[i][5]),
                            "mrt": str(myresult2_1[i][6]),
                            "lat": myresult2_1[i][7],
                            "lng": myresult2_1[i][8],
                            "images": myresult2_1[i][9].split(","),
                        }
                        data2_2["data"].append(content2_2)
                    return jsonify(data2_2)

            elif len(myresult2) == 0:
                query2_3 = "SELECT * FROM attractions WHERE name like %s LIMIT 12 OFFSET %s"
                mycursor.execute(query2_3, (args, page_cul,))
                myresult2_3 = mycursor.fetchall()

                query2_4 = "SELECT * FROM attractions WHERE name like %s LIMIT 12 OFFSET %s"
                mycursor.execute(query2_4, (args, page_cul2,))
                myresult2_4 = mycursor.fetchall()

                if len(myresult2_4) != 0:
                    data2_3 = {
                        "nextPage": nextPage,
                        "data": []
                    }
                    for i in range(len(myresult2_3)):
                        content2_3 = {
                            "id": myresult2_3[i][0],
                            "name": str(myresult2_3[i][1]),
                            "category": str(myresult2_3[i][2]),
                            "description": str(myresult2_3[i][3]),
                            "address": str(myresult2_3[i][4]),
                            "transport": str(myresult2_3[i][5]),
                            "mrt": str(myresult2_3[i][6]),
                            "lat": myresult2_3[i][7],
                            "lng": myresult2_3[i][8],
                            "images": myresult2_3[i][9].split(","),
                        }

                        data2_3["data"].append(content2_3)
                    return jsonify(data2_3)

                elif len(myresult2_4) == 0:
                    data2_4 = {
                        "nextPage": None,
                        "data": []
                    }
                    for i in range(len(myresult2_3)):
                        content2_4 = {
                            "id": myresult2_3[i][0],
                            "name": str(myresult2_3[i][1]),
                            "category": str(myresult2_3[i][2]),
                            "description": str(myresult2_3[i][3]),
                            "address": str(myresult2_3[i][4]),
                            "transport": str(myresult2_3[i][5]),
                            "mrt": str(myresult2_3[i][6]),
                            "lat": myresult2_3[i][7],
                            "lng": myresult2_3[i][8],
                            "images": myresult2_3[i][9].split(","),
                        }

                        data2_4["data"].append(content2_4)
                    return jsonify(data2_4)

    except Exception:
        error = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
        return jsonify(error), 500


@ app.route("/api/attraction/<id>")
def attraction(id):
    error = {
        "error": True,
        "message": "請按照情境提供對應的錯誤訊息"
    }
    try:
        if bool(int(id)) == True:
            mycursor = db.cursor()
            query3 = "SELECT * FROM attractions WHERE id = %s"
            mycursor.execute(query3, (id,))
            myresult3 = mycursor.fetchall()
            data3 = {
                "data": {
                    "id": myresult3[0][0],
                    "name": str(myresult3[0][1]),
                    "category": str(myresult3[0][2]),
                    "description": str(myresult3[0][3]),
                    "address": str(myresult3[0][4]),
                    "transport": str(myresult3[0][5]),
                    "mrt": str(myresult3[0][6]),
                    "lat": myresult3[0][7],
                    "lng": myresult3[0][8],
                    "images": myresult3[0][9].split(","),
                }
            }
            return jsonify(data3)

    except ValueError:
        return jsonify(error), 400

    except Exception:
        return jsonify(error), 500


@app.route("/api/categories", methods=["GET"])
def api_categories():
    try:
        mycursor = db.cursor()
        query4 = "SELECT category from attractions GROUP BY category"
        mycursor.execute(query4)
        myresult4 = mycursor.fetchall()
        data4 = {"data": []}

        for i in range(9):
            data4["data"].append(myresult4[i][0])

        return jsonify(data4)
    except Exception:
        error = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
        return jsonify(error), 500


@ app.route("/booking")
def booking():
    return render_template("booking.html")


@ app.route("/thankyou")
def thankyou():
    return render_template("thankyou.html")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
