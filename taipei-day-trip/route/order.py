from flask import *
from model.Information import Information
import time
import jwt
import requests
order_api = Blueprint("order_api", __name__)


@order_api.route("/api/orders", methods=["POST"])
def api_orders_post():
    try:
        decoded = request.cookies.get("encoded_jwt")
        decoded_jwt = jwt.decode(decoded, "secret", algorithms="HS256")
        res_order = request.get_json()

        memberID = int(decoded_jwt["id"])
        attractionName = res_order["order"]["trip"]["attraction"]["name"]
        attraction_date = res_order["order"]["trip"]["date"]
        attraction_time = res_order["order"]["trip"]["time"]
        price = int(res_order["order"]["price"])
        order_number = str(time.strftime("%Y%m%d%H%M%S", time.localtime(
            time.time())) + str(time.time()).replace('.', '')[-7:])
        unpaid = "未付款"

        insert_order = Information.insert_order(
            memberID, attractionName, attraction_date, attraction_time, price, order_number, unpaid)

        if insert_order == True:
            order_request = {
                "prime": res_order["prime"],
                "partner_key": ,
                "merchant_id": ,
                "details": attractionName,
                "amount": price,
                "cardholder": {
                    "phone_number": res_order["order"]["contact"]["phone"],
                    "name": res_order["order"]["contact"]["name"],
                    "email": res_order["order"]["contact"]["email"],
                },
                "remember": True
            }

            Headers = {"Content-Type": "application/json",
                       "x-api-key": }
            order_response = requests.post(
                "https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime", json=order_request, headers=Headers)

            if (order_response.json())["status"] == 0:
                paid = "已付款"
                Information.update_order(paid, order_number)
                data_order1 = {
                    "number": order_number,
                    "ok": True
                }
                return jsonify(data_order1)

            else:
                data_order2 = {
                    "number": order_number,
                    "ok": False
                }
                return jsonify(data_order2)

    except Exception:
        error = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
        return jsonify(error), 403


@ order_api.route("/api/order/<orderNumber>", methods=["GET"])
def api_order_get():
    return jsonify(error), 403


@ order_api.route("/thankyou")
def thankyou():
    return render_template("thankyou.html")
