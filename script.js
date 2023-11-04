const ipAdd = document.getElementsByClassName("ip")[0];
const startBtn = document.getElementById("get-started");

var userLocation; // Change "location" to a different variable name

async function fetchIP() {
  try {
    const response = await fetch(`https://api.ipify.org/?format=json`);
    const data = await response.json();
    ipAdd.innerText = data.ip;
    storeIp(data);
  } catch (error) {
    console.log(error);
  }
}

fetchIP();

startBtn.addEventListener("click", async () => {
  try {
    await navigator.geolocation.getCurrentPosition(success, fail);
  } catch (error) {
    console.error(error);
    fail();
  }
});

function storeIp(data) {
  localStorage.setItem("ip", data.ip);
}

function success(position) {
  localStorage.setItem("lat", position.coords.latitude);
  localStorage.setItem("long", position.coords.longitude);
  window.location.href = "./main.html";
}

function fail() {
  alert("Please provide location access to continue.");
}
