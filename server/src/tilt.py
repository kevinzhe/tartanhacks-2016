#!/usr/bin/env python

# monkey patching is necessary because this application uses a background
# thread
from gevent import monkey
monkey.patch_all()


import time
from threading import Thread
from flask import Flask, render_template, session, request, send_from_directory
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect

app = Flask(__name__)
app.config['SECRET_KEY'] = 'bnaosig4i483ddsajf20uf'
socketio = SocketIO(app, async_mode='gevent')
thread = None


def background_thread():
    """Example of how to send server generated events to clients."""
    count = 0
    while True:
        time.sleep(10)
        count += 1
        socketio.emit('my response',
                      {'data': 'Server generated event', 'count': count},
                      namespace='/test')

##############################
# Socket endpoints
##############################

@socketio.on('sensor input', namespace='/controller')
def sensor_input(message):
    emit('game move', {'data': message['data']}, broadcast = True)


##############################
# Regular endpoints
##############################

@app.route('/')
def index():
    global thread
    if thread is None:
        print("hello")
        thread = Thread(target=background_thread)
        thread.daemon = True
        thread.start()
    return render_template('index.html')

@app.route('/controller')
def mobileController():
    return render_template('controller.html')


# The fastest way to serve static files
@app.route('/static/<path:path>')
def serve_static():
    return send_from_directory('static', path)

if __name__ == '__main__':
    socketio.run(app, debug=True)
