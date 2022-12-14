from flask import Flask, jsonify, request
import smtplib
from email import message
from flask_cors import CORS

from os.path import exists
from os.path import basename
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from email.mime.base import MIMEBase
from email import encoders

app = Flask(__name__)
CORS(app)


@app.route("/", methods=['POST', 'GET'])
def home():

    body = request.get_json()
    from_address = 'fishgang.ihc@gmail.com'
    to_addr = body['email']

    subject = '[FishGang] - Gravação de música'
    content = 'Olá!\nSomos o FishGang e fizemos este projeto no decorrer da cadeira de Interação Humana-Computador.\nEnviamos-te assim a música criada por ti!\nObrigada,\nOs membros do FishGang\n'

    # Anexar ficheiro
    msg = MIMEMultipart()
    msg['To'] = to_addr
    msg['Subject'] = subject
    body = MIMEText(content, 'plain')
    msg.attach(body)

    filename = 'Ficheiro/mySound.wav'

    part = MIMEBase('application', "octet-stream")
    with open(filename, 'rb') as file:
        part.set_payload(file.read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment; filename={}'.format(filename))
    msg.attach(part)

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()

    server.login(from_address, 'eygmvrufgctrkuwi')
    server.send_message(msg, from_addr=from_address, to_addrs=[to_addr])

    return jsonify({'Code': 200, 'message': 'email sent'})
