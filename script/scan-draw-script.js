document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  const cameraIcon = document.querySelector(".fa-camera");
  const photoSection = document.querySelector(".photo");
  const repeatIcon = document.createElement("i");
  repeatIcon.className = "fa-solid fa-repeat";

  repeatIcon.addEventListener("click", () => {
    fileInput.click();
  });

  cameraIcon.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        localStorage.setItem("photo", e.target.result); 
        photoSection.innerHTML = ""; 
        photoSection.appendChild(img);
        photoSection.appendChild(repeatIcon); 
        repeatIcon.style.display = "block"; 
      };
      reader.readAsDataURL(file);
    }
  });

  const storedPhoto = localStorage.getItem("photo");
  if (storedPhoto) {
    const img = document.createElement("img");
    img.src = storedPhoto;
    photoSection.innerHTML = "";
    photoSection.appendChild(img);
    photoSection.appendChild(repeatIcon);
    repeatIcon.style.display = "block";
  }

  let currentTab = 0;
  showTab(currentTab);

  function showTab(n) {
    const tabs = document.querySelectorAll(".tab");
    tabs[n].style.display = "flex";
    if (n === 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
    if (n === tabs.length - 1) {
      document.getElementById(
        "nextBtn"
      ).innerHTML = `<i class="fa-solid fa-paper-plane"></i>`;
    } else {
      document.getElementById("nextBtn").innerHTML =
        '<i class="fa-solid fa-arrow-right"></i>';
    }
    fixStepIndicator(n);
  }

  function nextPrev(n) {
    const tabs = document.querySelectorAll(".tab");
    if (n === 1 && !validateForm()) return false;
    tabs[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= tabs.length) {
      document.getElementById("regForm").submit();
      return false;
    }
    showTab(currentTab);
  }

  function validateForm() {
    let valid = true;
    const tab = document.querySelectorAll(".tab")[currentTab];
    const inputs = tab.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value === "") {
        inputs[i].className += " invalid";
        valid = false;
      }
    }
    if (valid) {
      document.getElementsByClassName("step")[currentTab].className +=
        " finish";
    }
    return valid;
  }

  function fixStepIndicator(n) {
    const steps = document.querySelectorAll(".step");
    for (let i = 0; i < steps.length; i++) {
      steps[i].className = steps[i].className.replace(" active", "");
    }
    steps[n].className += " active";
  }

  document.getElementById("nextBtn").addEventListener("click", function () {
    nextPrev(1);
  });

  document.getElementById("prevBtn").addEventListener("click", function () {
    nextPrev(-1);
  });
});
