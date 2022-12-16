from flask import *
from model.Information import Information
attractions_api = Blueprint("attractions_api", __name__)


@attractions_api.route("/api/attractions", methods=["GET"])
def api_attractions():
    try:
        keyword = request.args.get("keyword")
        name = "%"+f"{keyword}"+"%"
        page = int(request.args.get("page", 0))
        nextPage = page + 1
        page_cul = page * 12
        page_cul2 = nextPage * 12
        if keyword == None:
            attractions_all = Information.search_attractions_all(page_cul)
            attractions_all_next = Information.search_attractions_all(
                page_cul2)
            if len(attractions_all_next) != 0:
                data_attractions_all = {
                    "nextPage": nextPage,
                    "data": []
                }
                for i in range(len(attractions_all)):
                    content_attractions_all = {
                        "id": attractions_all[i][0],
                        "name": str(attractions_all[i][1]),
                        "category": str(attractions_all[i][2]),
                        "description": str(attractions_all[i][3]),
                        "address": str(attractions_all[i][4]),
                        "transport": str(attractions_all[i][5]),
                        "mrt": str(attractions_all[i][6]),
                        "lat": attractions_all[i][7],
                        "lng": attractions_all[i][8],
                        "images": attractions_all[i][9].split(","),
                    }
                    data_attractions_all["data"].append(
                        content_attractions_all)
                return jsonify(data_attractions_all)

            elif len(attractions_all_next) == 0:
                data_attractions_all_none = {
                    "nextPage": None,
                    "data": []
                }
                for i in range(len(attractions_all)):
                    content_attractions_all_none = {
                        "id": attractions_all[i][0],
                        "name": str(attractions_all[i][1]),
                        "category": str(attractions_all[i][2]),
                        "description": str(attractions_all[i][3]),
                        "address": str(attractions_all[i][4]),
                        "transport": str(attractions_all[i][5]),
                        "mrt": str(attractions_all[i][6]),
                        "lat": attractions_all[i][7],
                        "lng": attractions_all[i][8],
                        "images": attractions_all[i][9].split(","),
                    }
                    data_attractions_all_none["data"].append(
                        content_attractions_all_none)
                return jsonify(data_attractions_all_none)

        elif keyword != None:
            attractions_category = Information.search_attractions_category(keyword,
                                                                           page_cul)
            attractions_category_next = Information.search_attractions_category(keyword,
                                                                                page_cul2)
            if len(attractions_category) != 0:
                if len(attractions_category_next) != 0:
                    data_attractions_category = {
                        "nextPage": nextPage,
                        "data": []
                    }
                    for i in range(len(attractions_category)):
                        content_attractions_category = {
                            "id": attractions_category[i][0],
                            "name": str(attractions_category[i][1]),
                            "category": str(attractions_category[i][2]),
                            "description": str(attractions_category[i][3]),
                            "address": str(attractions_category[i][4]),
                            "transport": str(attractions_category[i][5]),
                            "mrt": str(attractions_category[i][6]),
                            "lat": attractions_category[i][7],
                            "lng": attractions_category[i][8],
                            "images": attractions_category[i][9].split(","),
                        }
                        data_attractions_category["data"].append(
                            content_attractions_category)
                    return jsonify(data_attractions_category)

                elif len(attractions_category_next) == 0:
                    data_attractions_category_none = {
                        "nextPage": None,
                        "data": []
                    }
                    for i in range(len(attractions_category)):
                        content_attractions_category_none = {
                            "id": attractions_category[i][0],
                            "name": str(attractions_category[i][1]),
                            "category": str(attractions_category[i][2]),
                            "description": str(attractions_category[i][3]),
                            "address": str(attractions_category[i][4]),
                            "transport": str(attractions_category[i][5]),
                            "mrt": str(attractions_category[i][6]),
                            "lat": attractions_category[i][7],
                            "lng": attractions_category[i][8],
                            "images": attractions_category[i][9].split(","),
                        }
                        data_attractions_category_none["data"].append(
                            content_attractions_category_none)
                    return jsonify(data_attractions_category_none)

            elif len(attractions_category) == 0:
                attractions_name = Information.search_attractions_name(name,
                                                                       page_cul)
                attractions_name_next = Information.search_attractions_name(name,
                                                                            page_cul2)

                if len(attractions_name_next) != 0:
                    data_attractions_name = {
                        "nextPage": nextPage,
                        "data": []
                    }
                    for i in range(len(attractions_name)):
                        content_attractions_name = {
                            "id": attractions_name[i][0],
                            "name": str(attractions_name[i][1]),
                            "category": str(attractions_name[i][2]),
                            "description": str(attractions_name[i][3]),
                            "address": str(attractions_name[i][4]),
                            "transport": str(attractions_name[i][5]),
                            "mrt": str(attractions_name[i][6]),
                            "lat": attractions_name[i][7],
                            "lng": attractions_name[i][8],
                            "images": attractions_name[i][9].split(","),
                        }

                        data_attractions_name["data"].append(
                            content_attractions_name)
                    return jsonify(data_attractions_name)

                elif len(attractions_name_next) == 0:
                    data_attractions_name_none = {
                        "nextPage": None,
                        "data": []
                    }
                    for i in range(len(attractions_name)):
                        content_attractions_name_none = {
                            "id": attractions_name[i][0],
                            "name": str(attractions_name[i][1]),
                            "category": str(attractions_name[i][2]),
                            "description": str(attractions_name[i][3]),
                            "address": str(attractions_name[i][4]),
                            "transport": str(attractions_name[i][5]),
                            "mrt": str(attractions_name[i][6]),
                            "lat": attractions_name[i][7],
                            "lng": attractions_name[i][8],
                            "images": attractions_name[i][9].split(","),
                        }
                        data_attractions_name_none["data"].append(
                            content_attractions_name_none)
                    return jsonify(data_attractions_name_none)

    except Exception:
        error = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
        return jsonify(error), 500


@attractions_api.route("/attraction/<id>")
def attraction(id):
    return render_template("attraction.html", id=id)


@attractions_api.route("/api/attraction/<id>")
def api_attraction(id):
    error = {
        "error": True,
        "message": "請按照情境提供對應的錯誤訊息"
    }
    try:
        if bool(int(id)) == True:
            attractions_id = Information.search_attractions_id(id)
            data_attractions_id = {
                "data": {
                    "id": attractions_id[0][0],
                    "name": str(attractions_id[0][1]),
                    "category": str(attractions_id[0][2]),
                    "description": str(attractions_id[0][3]),
                    "address": str(attractions_id[0][4]),
                    "transport": str(attractions_id[0][5]),
                    "mrt": str(attractions_id[0][6]),
                    "lat": attractions_id[0][7],
                    "lng": attractions_id[0][8],
                    "images": attractions_id[0][9].split(","),
                }
            }
            return jsonify(data_attractions_id)

    except ValueError:
        return jsonify(error), 400

    except Exception:
        return jsonify(error), 500


@attractions_api.route("/api/categories", methods=["GET"])
def api_categories():
    try:
        attractions_categories = Information.search_categories()
        data_categories = {"data": []}
        for i in range(9):
            data_categories["data"].append(attractions_categories[i][0])
        return jsonify(data_categories)
    except Exception:
        error = {
            "error": True,
            "message": "請按照情境提供對應的錯誤訊息"
        }
        return jsonify(error), 500
