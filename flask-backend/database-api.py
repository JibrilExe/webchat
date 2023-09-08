from flask import Flask, request, jsonify,current_app
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)
# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

# Define the User model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False,unique=True)
    password = db.Column(db.String(100), nullable=False)

#The friendship model
class Friends(db.Model):
    __tablename__ = 'friends'
    id = db.Column(db.Integer,primary_key=True)
    user1 = db.Column(db.String(100),nullable =False)
    user2 = db.Column(db.String(100),nullable=False)
    since = db.Column(db.DateTime, default=datetime.now(), nullable=False)

#The chat model!
class Chat(db.Model): 
    __tablename__ = 'chats'
    id = db.Column(db.Integer,primary_key=True)
    sender = db.Column(db.String(100),nullable =False)
    receiver = db.Column(db.String(100),nullable =False)
    message = db.Column(db.String(100),nullable = False)
    date = db.Column(db.Integer, default=datetime.utcnow, nullable=False)

# Create the database tables
with app.app_context():
    db.create_all()




#chat functionality
@app.route('/api/users/<string:sender>/chat/<string:receiver>',methods=['POST'])
def sendMessage(sender,receiver):
    u1 = User.query.filter_by(username=sender).first()
    u2 = User.query.filter_by(username=receiver).first()
    if (u1 is not None) and (u2 is not None):
        data = request.get_json()
        if "message" in data:
            new_chat = Chat(sender=sender,receiver=receiver,message=data['message'])
            db.session.add(new_chat)
            db.session.commit()
            return jsonify({"succes":"succesfully saved chat in sqlite"})
        return jsonify({"error":"no message sent"})
    return jsonify({"error":"1 or both users doesnt exist"})

@app.route('/api/users/<string:sender>/chat/<string:receiver>',methods=['GET'])
def getMessages(sender,receiver):
    u1 = User.query.filter_by(username=sender).first()
    u2 = User.query.filter_by(username=receiver).first()
    if (u1 is not None) and (u2 is not None):
        chats = Chat.query.filter(((Chat.sender == sender) & (Chat.receiver == receiver)) | ((Chat.sender == receiver) & (Chat.receiver == sender))).all()
        chat_list = []
        for chat in chats:
            print(chat)
            chat_dict = {
                'sender': chat.sender,
                'receiver': chat.receiver,
                'message' : chat.message,
                'date': chat.date 
            }
            chat_list.append(chat_dict)

        return jsonify({"chats":chat_list})
    return jsonify({"error":"1 or both users doesnt exist"})




#friendship functionality
@app.route('/api/users/<string:user1>/friends',methods=['GET'])
def getFriends(user1):
    u1 = User.query.filter_by(username=user1).first()
    if u1 is not None:
        id1 = u1.username
        query1 = Friends.query.filter_by(user1=id1)
        query2 = Friends.query.filter_by(user2=id1)

        result = query1.union(query2)
        friends = result.all()
        
        friends_list = []
        for friend in friends:
            friend_dict = {
                'user1': friend.user1,
                'user2': friend.user2,
                'since': friend.since
            }
            friends_list.append(friend_dict)
        return jsonify({"friends":friends_list})
    return jsonify({"error":"user doesnt exist"})

@app.route('/api/users/<string:user1>/friends/add/<string:user2>', methods=['POST'])
def add_friend(user1,user2):
    u1 = User.query.filter_by(username=user1).first()
    u2 = User.query.filter_by(username=user2).first()
    if (u1 is not None) and (u2 is not None):
        
        xx = Friends.query.filter_by(user1=u1.username)
        for fren in xx:
            if fren.user2 == u2.username:
                return jsonify({"error":"already friends"})
        yy = Friends.query.filter_by(user1=u2.username)
        for fren in yy:
            if fren.user2 == u1.username:
                return jsonify({"error":"already friends"})

        #if (id2 not in Friends.query.filter_by(user1=id1)) and (id1 not in Friends.query.filter_by(user1=id2)):
        new_friends = Friends(user1=u1.username,user2=u2.username)
        db.session.add(new_friends)
        db.session.commit()
        return jsonify({"succes":"succes"})
        #return jsonify({"error":"already friends"})
    return jsonify({"error":"1 or both users doesnt/dont exist"})





#basic user functionality
# Route to retrieve user by name
@app.route('/api/users/<string:username>', methods=['GET'])
def get_user(username):
    user = User.query.filter_by(username=username).first()
    if user is not None:
        return jsonify({'password': user.password, 'username': user.username})
    else:
        return jsonify({'error': 'Item not found'}), 404

#Route to get all usernames
@app.route('/api/users',methods=['GET'])
def get_usernames():
    usernames = User.query.with_entities(User.username).all()
    # The above query fetches all usernames from the 'users' table
    usernames_list = [username[0] for username in usernames]  # Extract usernames from the result
    return jsonify({'usernames': usernames_list})

# Route to add users
@app.route('/api/addUser', methods=['POST'])
def add_user():
    data = request.get_json()
    if 'username' in data and 'password' in data:
        existing_user = User.query.filter_by(username=data['username']).first()
        if existing_user is None:
            new_user = User(username=data['username'], password=data['password'])
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'message': 'User added successfully'})
        return jsonify({'error': 'Username already taken'}), 400
    return jsonify({'error': 'Username or password missing'}), 400

#starts the app/server
if __name__ == '__main__':
    with app.app_context():
        app.run(debug=True)