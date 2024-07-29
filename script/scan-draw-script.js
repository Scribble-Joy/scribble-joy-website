var currentTab = 0;
showTab(currentTab);

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById(
      "nextBtn"
    ).innerHTML = `<i class="fa-solid fa-paper-plane"></i>`;
  } else {
    document.getElementById(
      "nextBtn"
    ).innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;
  }
  fixStepIndicator(n);
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("regForm").submit();
    return false;
  }
  showTab(currentTab);
}

function validateForm() {
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  
  if (currentTab === 0) { 
    var photoAdded = document.querySelector('.photo img') !== null; 
    if (!photoAdded) {
      alert('Por favor, adicione uma foto antes de continuar.');
      valid = false;
    }
  }

  for (i = 0; i < y.length; i++) {
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
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}

document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    var file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector(
          ".photo"
        ).innerHTML = `<img src="${e.target.result}" alt="Selected Photo" />`;
        document.querySelector(
          ".photo"
        ).innerHTML += `<button id="addPhotoBtn">Adicionar outra foto</button>`;

        document
          .getElementById("addPhotoBtn")
          .addEventListener("click", function () {
            document.getElementById("fileInput").click();
          });
      };
      reader.readAsDataURL(file);
    }
  });
