<!-- @format -->

- runBE: clone github, after download xampp if you haven't it, start apache and mysql, onPress admin line MySQL
- open command line at folder and type command: sequelize-cli db:migrate to create database
- Now test api you want with postmand

---

- errCode =0: successfull
- errCode= 1: missing parameters
- errCode = 2: does not exist
- errCode =3: wrong password
- errCode: 4 : new password alike old password
- errCode: 5: confirm password failed

---

- v1: temperature sensor
- v2: air humidity sensor
- v3: soil moisture sensor
- v4: light sensor

---

- admin crud user with roleId ADMIN, user is created with roleId CUSTOME Location: crud location, when delete location
  will delete all equipment(sensor, device) as idLoaction
- sensor: crud sensor, update sensor: name, minLimited, maxLimited through idSensor. Unfinished api notification for
  user through email when value bigger or less than minLimited, maxLimited. Value sensor display average value include
  10 id nearest in table history.
- device: crud device, update device: name through idDevice
- history: unfinished, idea: get adafruit take value real time, type(sensor, device), from data get adafruit we save to
  sensor or device. Value at hisroty display on website

   
