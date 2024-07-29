var currentTab = 0;
showTab(currentTab);

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";

  document.getElementById("prevBtn").style.display =
    n === 0 ? "none" : "inline";

  var nextBtn = document.getElementById("nextBtn");
  if (n === x.length - 1) {
    nextBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i>`;
  } else {
    nextBtn.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;
  }

  fixStepIndicator(n);
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");

  if (n === 1 && !validateForm()) return false;

  if (n === 1 && !confirm("Você tem certeza que deseja avançar?")) return false;

  x[currentTab].style.display = "none";
  currentTab += n;

  if (currentTab >= x.length) {
    document.getElementById("regForm").submit();
    return false;
  }

  showTab(currentTab);
}

function validateForm() {
  var x = document.getElementsByClassName("tab");
  var y = x[currentTab].getElementsByTagName("input");
  var valid = true;

  for (var i = 0; i < y.length; i++) {
    if (y[i].value === "") {
      y[i].className += " invalid";
      valid = false;
    }
  }

  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }

  return valid;
}

function fixStepIndicator(n) {
  var x = document.getElementsByClassName("step");

  for (var i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }

  x[n].className += " active";
}

document
  .querySelector(".fa-camera")
  .addEventListener("click", async function () {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      const video = document.createElement("video");
      video.srcObject = stream;
      video.style.width = "100%"; // Faz o vídeo ocupar o tamanho do form
      video.style.height = "100%"; // Faz o vídeo ocupar o tamanho do form
      video.play();

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      video.addEventListener("canplay", function () {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Aguarda o vídeo começar a tocar para ajustar o canvas
        setTimeout(() => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          stream.getTracks().forEach((track) => track.stop());

          document.querySelector(
            ".photo"
          ).innerHTML = `<img src="${canvas.toDataURL()}" alt="Captured Photo" />`;
          document.querySelector(
            ".photo"
          ).innerHTML += `<button id="retakeBtn">Tirar outra foto</button>`;

          document
            .getElementById("retakeBtn")
            .addEventListener("click", function () {
              document.querySelector(".photo").innerHTML =
                '<h3>Tire uma foto do seu desenho</h3><i class="fa-solid fa-camera"></i>';
            });
        }, 100); // Delay para garantir que o vídeo está carregado
      });
    } catch (err) {
      console.error("Erro ao acessar a câmera: ", err);
    }
  });
