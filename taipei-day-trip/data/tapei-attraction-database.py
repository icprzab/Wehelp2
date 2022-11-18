import mysql.connector
import json

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="root",
    database="Taipei_day_trip"
)

with open("taipei-attractions.json", encoding="utf-8") as f:
    data = json.load(f)
    data2 = data["result"]["results"]


# for i in data2:
#     mycursor = db.cursor()
#     query = "INSERT INTO attractions(name, category, description, address, transport, mrt, lat, lng) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
#     mycursor.execute(query, (i["name"], i["CAT"], i["description"], i["address"],
#                      i["direction"], i["MRT"], i["latitude"], i["longitude"],))
#     db.commit()

image3 = []
for i in range(58):
    image1 = data2[i]["file"].split("https")
    len_image = len(image1)
    image2 = []
    for t in range(1, len_image):
        if "png" in image1[t].lower() or "jpg" in image1[t].lower():
            x = "https" + image1[t]
            image2.append(x)
    link = ",".join(image2)
    image3.append(link)
    image2.clear()


for i in range(58):
    mycursor = db.cursor()
    query = "INSERT INTO attractions(name, category, description, address, transport, mrt, lat, lng , images) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    mycursor.execute(query, (data2[i]["name"], data2[i]["CAT"], data2[i]["description"], data2[i]["address"],
                     data2[i]["direction"], data2[i]["MRT"], data2[i]["latitude"], data2[i]["longitude"], image3[i],))
    db.commit()
