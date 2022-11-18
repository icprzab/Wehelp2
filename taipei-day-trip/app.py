from flask import Flask, request, render_template, redirect, url_for, session, jsonify
import mysql.connector
app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False
app.config["JSON_SORT_KEYS"] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True
db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="root",
    database="Taipei_day_trip"
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/attraction", methods=["GET"])
def api_attraction():
    try:
        mycursor = db.cursor()
        keyword = request.args.get("keyword")
        args = "%"+f"{keyword}"+"%"
        page = int(request.args.get("page", 0))
        nextPage = page + 1
        page_cul = page * 12
        page_cul2 = nextPage * 12
        query1 = "SELECT * FROM attractions WHERE category = %s"
        mycursor.execute(query1, (keyword,))
        myresult1 = mycursor.fetchall()
        if len(myresult1) != 0:
            query2 = "SELECT * FROM attractions WHERE category = %s LIMIT 12 OFFSET %s"
            mycursor.execute(query2, (keyword, page_cul,))
            myresult2 = mycursor.fetchall()

            query3 = "SELECT * FROM attractions WHERE category = %s LIMIT 12 OFFSET %s"
            mycursor.execute(query3, (keyword, page_cul2,))
            myresult3 = mycursor.fetchall()

            if len(myresult3) != 0:
                data1 = {
                    "nextPage": nextPage,
                    "data": []
                }
                for i in range(len(myresult2)):
                    content1 = {
                        "id": str(myresult2[i][0]),
                        "name": str(myresult2[i][1]),
                        "category": str(myresult2[i][2]),
                        "description": str(myresult2[i][3]),
                        "address": str(myresult2[i][4]),
                        "transport": str(myresult2[i][5]),
                        "mrt": str(myresult2[i][6]),
                        "lat": str(myresult2[i][7]),
                        "lng": str(myresult2[i][8]),
                        "images": myresult2[i][9].split(","),
                    }
                    data1["data"].append(content1)

                return jsonify(data1)

            elif len(myresult3) == 0:
                data2 = {
                    "nextPage": None,
                    "data": []
                }

                for i in range(len(myresult2)):
                    content2 = {
                        "id": str(myresult2[i][0]),
                        "name": str(myresult2[i][1]),
                        "category": str(myresult2[i][2]),
                        "description": str(myresult2[i][3]),
                        "address": str(myresult2[i][4]),
                        "transport": str(myresult2[i][5]),
                        "mrt": str(myresult2[i][6]),
                        "lat": str(myresult2[i][7]),
                        "lng": str(myresult2[i][8]),
                        "images": myresult2[i][9].split(","),
                    }
                    data2["data"].append(content2)
                return jsonify(data2)

        elif len(myresult1) == 0:  # 如果直接寫myresult==""/myresult is None都印不出來!!!!
            query4 = "SELECT * FROM attractions WHERE name like %s LIMIT 12 OFFSET %s"
            mycursor.execute(query4, (args, page_cul,))
            myresult4 = mycursor.fetchall()
            query5 = "SELECT * FROM attractions WHERE name like %s LIMIT 12 OFFSET %s"
            mycursor.execute(query5, (args, page_cul2,))
            myresult5 = mycursor.fetchall()
            if len(myresult5) == 0:
                data3 = {
                    "nextPage": None,
                    "data": []
                }
                for i in range(len(myresult4)):
                    content3 = {
                        "id": str(myresult4[i][0]),
                        "name": str(myresult4[i][1]),
                        "category": str(myresult4[i][2]),
                        "description": str(myresult4[i][3]),
                        "address": str(myresult4[i][4]),
                        "transport": str(myresult4[i][5]),
                        "mrt": str(myresult4[i][6]),
                        "lat": str(myresult4[i][7]),
                        "lng": str(myresult4[i][8]),
                        "images": myresult4[i][9].split(","),

                    }

                    data3["data"].append(content3)
                return jsonify(data3)

            elif len(myresult5) == 0:
                data4 = {
                    "nextPage": nextPage,
                    "data": []
                }
                for i in range(len(myresult4)):
                    content3 = {
                        "id": str(myresult4[i][0]),
                        "name": str(myresult4[i][1]),
                        "category": str(myresult4[i][2]),
                        "description": str(myresult4[i][3]),
                        "address": str(myresult4[i][4]),
                        "transport": str(myresult4[i][5]),
                        "mrt": str(myresult4[i][6]),
                        "lat": str(myresult4[i][7]),
                        "lng": str(myresult4[i][8]),
                        "images": myresult4[i][9].split(","),

                    }

                    data3["data"].append(content3)
                return jsonify(data4)

    except Exception:
        error = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
        return jsonify(error), 500


@ app.route("/attraction/<id>")
def attraction(id):
    error = {
        "error": True,
        "message": "請按照情境提供對應的錯誤訊息"
    }
    try:
        if bool(int(id)) == True:
            mycursor = db.cursor()
            query5 = "SELECT * FROM attractions WHERE id = %s"
            mycursor.execute(query5, (id,))
            myresult6 = mycursor.fetchall()
            data5 = {
                "data": {
                    "id": str(myresult6[0][0]),
                    "name": str(myresult6[0][1]),
                    "category": str(myresult6[0][2]),
                    "description": str(myresult6[0][3]),
                    "address": str(myresult6[0][4]),
                    "transport": str(myresult6[0][5]),
                    "mrt": str(myresult6[0][6]),
                    "lat": str(myresult6[0][7]),
                    "lng": str(myresult6[0][8]),
                    "images": myresult6[0][9].split(","),
                }
            }
            return jsonify(data5)

    except ValueError:
        return jsonify(error), 400

    except Exception:
        return jsonify(error), 500


@app.route("/api/categories", methods=["GET"])
def api_categories():
    try:
        mycursor = db.cursor()
        query6 = "SELECT category from attractions GROUP BY category"
        mycursor.execute(query6)
        myresult6 = mycursor.fetchall()
        print(myresult6)
        data6 = {"data": []}

        for i in range(9):
            data6["data"].append(myresult6[i][0])

        return jsonify(data6)
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
    app.run(port=3000, debug=True)
