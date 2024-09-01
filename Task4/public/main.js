const socket = io();

const clients = document.getElementById('cltotal')
const msgcontainer = document.getElementById('messagecontainer');
const nameinput = document.getElementById('nameinput');
const msgform = document.getElementById('msgform');
const msginput = document.getElementById('messageinput');

function sendMsg(){
    console.log(msginput.value);
    if (msginput.value === '') return
    const data = {
        name: nameinput.value,
        message: msginput.value,
        datetime: new Date()

    }
    socket.emit('message', data);
    addMessageToUI(true, data)
    msginput.value = ''
}

msgform.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMsg();
})

socket.on('cltotal', (data) =>{
    console.log(data);
    clients.innerText = `Chatters online: ${data}`;
})

socket.on('message', (data) => {
    console.log(data);
    addMessageToUI(false, data)
})



function addMessageToUI(isOwnMessage, data) {
    clearFeedback()
    const element = `
        <li class="${isOwnMessage ? 'messageright' : 'messageleft'}">
            <p class="message">
              ${data.message}
              <span>${data.name} | ${moment(data.datetime).fromNow()}</span>
            </p>
          </li>
          `
          msgcontainer.innerHTML += element
          msgcontainer.scrollTo(0, msgcontainer.scrollHeight)
   
  }

  msginput.addEventListener('focus', (e) => {
    socket.emit('feedback', {
      feedback: `${nameinput.value} is typing...`,
    })
  })
  
  msginput.addEventListener('keypress', (e) => {
    socket.emit('feedback', {
      feedback: `${nameinput.value} is typing...`,
    })
  })
  msginput.addEventListener('blur', (e) => {
    socket.emit('feedback', {
      feedback: '',
    })
  })

  socket.on('feedback', (data) => {
    clearFeedback()
    const element = `
          <li class="feedback">
            <p class="msgfeedback" id="msgfeedback">${data.feedback}</p>
          </li>
    `
    msgcontainer.innerHTML += element
  })

  function clearFeedback() {
    document.querySelectorAll('li.feedback').forEach((element) => {
      element.parentNode.removeChild(element)
    })
  }