# from flask import Flask, request, render_template, redirect, url_for, session, jsonify, request, make_response
from flask import *
from model.Information import Information
from datetime import datetime, timedelta, time
import jwt
booking_api = Blueprint("booking_api", __name__)


@booking_api.route("/booking")
def booking():
    return render_template("booking.html")


@booking_api.route("/api/booking", methods=["GET"])
def api_booking_get():
    try:
        decoded = request.cookies.get("encoded_jwt")
        decoded_jwt = jwt.decode(decoded, "secret", algorithms="HS256")
        member_email = decoded_jwt["email"]
        search_booking = Information.search_booking(member_email)
        search_booking_id = search_booking[0]
        search_booking_attraction = Information.search_booking_attraction(
            search_booking_id)
        data = {
            "attraction": {
                "id": search_booking_attraction[0],
                "name": search_booking_attraction[1],
                "address": search_booking_attraction[2],
                "image": search_booking_attraction[3].split(","),
            },
            "date": search_booking[1],
            "time": search_booking[2],
            "price": search_booking[3]
        }

        data_booking_attraction = {"data": data}

        return jsonify(data_booking_attraction), 200

    except Exception:
        error = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
        return jsonify(error), 403


@booking_api.route("/api/booking", methods=["POST"])
def api_booking_post():
    try:
        decoded = request.cookies.get("encoded_jwt")
        decoded_jwt = jwt.decode(decoded, "secret", algorithms="HS256")
        data_undecoded = {"data": None}
        data_booking = {"ok": True}
        if decoded != None:
            if decoded_jwt != None:
                member_email = decoded_jwt["email"]
                res_booking = request.get_json()
                res_booking_attractionID = res_booking["attractionID"]
                res_booking_date = res_booking["bookingDate"]
                res_booking_time = res_booking["time"]
                res_booking_price = int(res_booking["price"])
                update_booking = Information.update_booking(
                    res_booking_attractionID, res_booking_date, res_booking_time, res_booking_price, member_email)
                if update_booking == True:
                    return jsonify(data_booking), 200
                else:
                    return jsonify(data_undecoded), 400

    except Exception:
        error = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
        return jsonify(error), 403


@booking_api.route("/api/booking", methods=["DELETE"])
def api_booking_delete():
    try:
        decoded = request.cookies.get("encoded_jwt")
        data_undecoded = {"data": None}
        data_booking = {"ok": True}
        decoded_jwt = jwt.decode(decoded, "secret", algorithms="HS256")
        member_email = decoded_jwt["email"]
        delete_booking = Information.delete_booking(member_email)
        if delete_booking == True:
            data_booking = {"ok": True}
            return jsonify(data_booking), 200
        else:
            return jsonify(data_undecoded), 403

    except Exception:
        error = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
        return jsonify(error), 500


@booking_api.route("/thankyou")
def thankyou():
    return render_template("thankyou.html")
