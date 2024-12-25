const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let devices = []; // لتخزين الأجهزة المتصلة

// إعداد مسار لواجهة المستخدم
app.use(express.static('public'));

// الاتصال بالجهاز
io.on('connection', (socket) => {
  console.log('جهاز متصل: ' + socket.id);

  // إضافة الجهاز إلى القائمة
  devices.push(socket.id);
  io.emit('device-list', devices); // إرسال قائمة الأجهزة إلى العميل

  // عندما يختار المستخدم جهازًا
  socket.on('select-device', (deviceId) => {
    io.to(deviceId).emit('approve-connection', socket.id); // إرسال طلب للموافقة
  });

  // عند الموافقة من الجهاز الآخر
  socket.on('approve-connection-response', (deviceId) => {
    io.to(deviceId).emit('connection-approved', socket.id); // تأكيد الاتصال
  });

  // عند فصل الاتصال
  socket.on('disconnect', () => {
    console.log('جهاز مفصول: ' + socket.id);
    devices = devices.filter(id => id !== socket.id);
    io.emit('device-list', devices); // تحديث قائمة الأجهزة
  });
});

// تشغيل الخادم على المنفذ 3000
server.listen(3000, () => {
  console.log('الخادم يعمل على http://localhost:3000');
});