# from flask import Flask, request, render_template, redirect, url_for, session, jsonify, request, make_response
from flask import *
from model.Information import Information
from datetime import datetime, timedelta, time
import jwt
user_api = Blueprint("user_api", __name__)


@user_api.route("/")
def index():
    return render_template("index.html")


@user_api.route("/api/user", methods=["POST"])
def api_user():
    try:
        res_input = request.get_json()
        res_input_name = res_input["name"]
        res_input_email = res_input["email"]
        res_input_password = res_input["password"]

        if res_input_email != "" and res_input_name != "" and res_input_password != "":
            if Information.search_email(res_input_email) == None:
                account_info = Information.insert_account_info(
                    res_input_name, res_input_email, res_input_password)
                if account_info == True:
                    data_signup = {"ok": True}
                    return jsonify(data_signup), 200
                else:
                    error = {
                        "error": True,
                        "message": "註冊失敗"}
                    return jsonify(error), 500

            elif Information.search_email(res_input_email) != None:
                error = {
                    "error": True,
                    "message": "email已經註冊帳戶"
                }
                return jsonify(error), 400

        else:
            error = {
                "error": True,
                "message": "註冊失敗"
            }
            return jsonify(error), 500

    except Exception:
        error = {
            "error": True,
            "message": "註冊失敗"
        }
        return jsonify(error), 500


@user_api.route("/api/user/auth", methods=["GET"])
def api_user_auth_get():
    try:
        decoded = request.cookies.get("encoded_jwt")
        if decoded != None:
            decoded_jwt = jwt.decode(decoded, "secret", algorithms="HS256")
            data_decoded = {"data": decoded_jwt}
            return jsonify(data_decoded)

        elif decoded == None:
            data_undecoded = {"data": None}
            return jsonify(data_undecoded)

    except Exception:
        error = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
        return jsonify(error), 500


@user_api.route("/api/user/auth", methods=["PUT"])
def api_user_auth_put():
    try:
        res_account = request.get_json()
        res_account_email = res_account["email"]
        res_account_password = res_account["password"]
        search_email = Information.search_email(res_account_email)

        if res_account_email == str(search_email[2]) and res_account_password == str(search_email[3]):

            payload = {
                "id": str(search_email[0]),
                "name": str(search_email[1]),
                "email": str(search_email[2]),
                "exp": datetime.utcnow() + timedelta(days=7)
            }
            encoded_jwt = jwt.encode(payload, "secret", algorithm="HS256")
            data_login = {"ok": True}
            myResponse_login = jsonify(data_login)
            myResponse_login.set_cookie("encoded_jwt", encoded_jwt,
                                        expires=datetime.utcnow() + timedelta(days=7))
            return myResponse_login

        else:
            error = {
                "error": True,
                "message": "電子郵件或密碼錯誤"
            }
            return jsonify(error), 400

    except Exception:
        error = {
            "error": True,
            "message": "登入失敗"
        }
        return jsonify(error), 500


@user_api.route("/api/user/auth", methods=["DELETE"])
def api_user_auth_delete():
    try:
        data_logout = {"ok": True}
        myResponse_logout = jsonify(data_logout)
        myResponse_logout.set_cookie("encoded_jwt", value="", expires=0)
        return myResponse_logout

    except Exception:
        error = {
            "error": True,
            "message": "登出失敗"
        }
        return jsonify(error), 500


@user_api.route("/booking")
def booking():
    return render_template("booking.html")


@user_api.route("/thankyou")
def thankyou():
    return render_template("thankyou.html")
