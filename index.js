// analog clock script
setInterval(() => {
  date = new Date();
  hTime = date.getHours();
  mTime = date.getMinutes();
  sTime = date.getSeconds();
  msTime = date.getMilliseconds();

  hRotation = 30 * hTime + mTime / 2 + sTime / 120;
  mRotation = 6 * mTime + sTime / 10;
  sRotation = 6 * sTime + 0.006 * msTime;

  hour.style.transform = `rotate(${hRotation}deg)`;
  minute.style.transform = `rotate(${mRotation}deg)`;
  second.style.transform = `rotate(${sRotation}deg)`;
}, 10);

// digital clock script
let date;
let localDate;
let time;
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
setInterval(() => {
  date = new Date();
  localDate = date.toLocaleDateString(undefined, options);
  time = date.toLocaleTimeString();

  document.getElementById("time").innerHTML = time + "<br>" + localDate;
}, 100);

// alarm clock
let sound = new Audio();
sound.src = "alarm.wav";
let timer;

function setAlarm(el) {
  let time = document.getElementById("alarmTime").valueAsNumber;
  if (isNaN(time)) {
    alert("Invalid DateTime");
    return;
  }

  let alarm = new Date(time);
  let alarmTime = new Date(
    alarm.getUTCFullYear(),
    alarm.getUTCMonth(),
    alarm.getUTCDate(),
    alarm.getUTCHours(),
    alarm.getUTCMinutes(),
    alarm.getUTCSeconds()
  );
  let duration = alarmTime.getTime() - new Date().getTime();

  if (duration < 0) {
    alert("Time is already passed");
    return;
  }

  timer = setTimeout(initAlarm, duration);
  el.innerHTML = `<span class='glyphicon glyphicon-remove btn btn-danger'>Cancel Alarm</span>`;
  el.setAttribute("onclick", "cancelAlarm(this);");
}

function cancelAlarm(el) {
  el.innerHTML = `<span class='glyphicon glyphicon-time btn btn-outline-dark'>Set Alarm</span>`;
  el.setAttribute("onclick", "setAlarm(this);");
  clearTimeout(timer);
}

function initAlarm() {
  sound.loop = true;
  sound.play();
  document.getElementById("alarmButton").style.display = "none";
  document.getElementById("selectButton").style.display = "";
}

function stopAlarm() {
  sound.pause();
  sound.currentTime = 0;
  document.getElementById("selectButton").style.display = "none";
  cancelAlarm(document.getElementById("alarmButton"));
  document.getElementById("alarmButton").style.display = "";
}

function snoozeAlarm() {
  stopAlarm();
  setTimeout(initAlarm, 300);
  button.innerText = "Cancel Alarm";
  button.setAttribute("onclick", "cancelAlarm(this);");
}
