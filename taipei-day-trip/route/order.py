# from flask import Flask, request, render_template, redirect, url_for, session, jsonify, request, make_response
from flask import *
from model.Information import Information
import time
order_api = Blueprint("order_api", __name__)


@order_api.route("/api/orders", methods=["POST"])
def api_orders_post():
    try:
        res_order = request.get_json()
        order_number = order_number = str(time.strftime("%Y%m%d%H%M%S", time.localtime(
            time.time())) + str(time.time()).replace('.', '')[-7:])
        # unpaid = "unpaid"
        # insert_order = Information.insert_order(unpaid)
        order_request = {
            "prime": order_number,
            "partner_key": "",
            "merchant_id": "",
            "details": res_order["order"]["trip"]["attraction"]["name"],
            "amount": res_order["order"]["price"],
            "cardholder": {
                "phone_number": res_order["order"]["contact"]["phone"],
                "name": res_order["order"]["contact"]["name"],
                "email": res_order["order"]["contact"]["email"],
            },
            "remember": True
        }

        return jsonify(order_request), 200

    except Exception:
        error = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
        return jsonify(error), 403


@order_api.route("/api/order/<orderNumber>", methods=["GET"])
def api_order_get():
    return jsonify(error), 403


@order_api.route("/thankyou")
def thankyou():
    return render_template("thankyou.html")
