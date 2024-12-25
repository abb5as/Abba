const socket = io();

// اختيار النظام
document.getElementById('select-iphone').addEventListener('click', () => {
    socket.emit('select-device', 'iphone');
    showDeviceList();
});

document.getElementById('select-android').addEventListener('click', () => {
    socket.emit('select-device', 'android');
    showDeviceList();
});

// عرض قائمة الأجهزة
function showDeviceList() {
    document.getElementById('device-selection').style.display = 'none';
    document.getElementById('device-list').style.display = 'block';
}

socket.on('device-list', (devices) => {
    const devicesList = document.getElementById('devices');
    devicesList.innerHTML = '';
    devices.forEach(device => {
        const li = document.createElement('li');
        li.textContent = device;
        li.addEventListener('click', () => {
            socket.emit('select-device', device);
        });
        devicesList.appendChild(li);
    });
});

// عندما يوافق الجهاز الآخر
socket.on('connection-approved', (deviceId) => {
    document.getElementById('device-list').style.display = 'none';
    document.getElementById('control-panel').style.display = 'block';
});

// التحكم بالصوت والإضاءة
document.getElementById('volume').addEventListener('input', (event) => {
    const volume = event.target.value;
    socket.emit('volume-change', volume);
});

document.getElementById('brightness').addEventListener('input', (event) => {
    const brightness = event.target.value;
    socket.emit('brightness-change', brightness);
});

// التحكم في الماوس
document.getElementById('mouse-control').addEventListener('click', () => {
    // هنا يمكنك إضافة التحكم في الماوس
});