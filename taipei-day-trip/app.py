from flask import *
from route.user import user_api
from route.attractions import attractions_api
from route.booking import booking_api
from route.order import order_api

app = Flask(__name__)

app.register_blueprint(user_api)
app.register_blueprint(attractions_api)
app.register_blueprint(booking_api)
app.register_blueprint(order_api)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
