<!-- <template>
  <h2>Simple Nest Chat</h2>
  <div>
    <h2>채팅방 목록</h2>
    <ul id="rooms"></ul>
  </div>

  <input type="text" id="message" placeholder="메시지를 입력해주세요." />
  <button onclick=sendMessage()>전송</button>
  <button onclick="createRoom()">방 만들기</button>

  <div>
    <h2>공지</h2>
    <div id="notice"></div>

    <h2>채팅</h2>
    <div id="chat"></div>
  </div>
  <script src = "https://code.jquery.com/jquery-3.6.1.slim.js"></script>

  <script src = "http://localhost:3000/socket.io/socket.io.js"></script>

</template>

<script>
export default {
  name: 'Chat_talk',
  
}
const socket = io('http://localhost:3000/chat');
const roomSocket = io('http://localhost:3000/room');
const nickname = prompt('닉네임을 입력해주세요.');
let currentRoom = "";

function sendMessage() {
  if (currentRoom === '') {
    alert("방을 선택해주세요.");
    return;
  }

  const message = $('#message').val();
  const data = { message, nickname, room: currentRoom };
  $('#chat').append(`<div>나 : ${message}<div>`);
  socket.emit('message', { message, nickname });
  return false;
}

function createRoom() {
  const room = prompt('생성할 방의 이름을 입력해주세요.');
  roomSocket.emit('createRoom', { room, nickname });
}

socket.on('connect', () => {
  console.log('connected');
});

socket.on('notice', (data) => {
  $('#notice').append(`<div>${data.message}</div>`);
})

roomSocket.on('rooms', (data) => {
  console.log(data);
  $('#rooms').empty();
  data.forEach((room) => {
    $('#rooms').append(`<li>${room} <button onclick="JoinRoom('${room}')">join</button></li>`);
  });
});

roomSocket.on('message', (data) => {
  console.log(data);
  $('#chat').append(`<div>${data.message}</div>`);
})

socket.on('message', (message) => {
  $('#chat').append(`<div>${message}</div>`);
});

function JoinRoom(room) {
  roomSocket.emit('joinRoom', { room, nickname, toLeaveRoom: currentRoom });
  $('#chat').html('');
  currentRoom = room;
}
</script> -->