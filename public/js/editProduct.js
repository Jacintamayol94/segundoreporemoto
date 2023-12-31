//alert('Estas en la validacion del edit front');

// Checkbox validation (incompleto)

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const modesCheckboxes = form.querySelectorAll("#modes");
  const hiddenModeInput = document.createElement("input");
  hiddenModeInput.type = "hidden";
  hiddenModeInput.name = "modesString";

  //console.log(modesCheckboxes)

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedModes = Array.from(modesCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    const modesString = selectedModes.join(", ");

    // console.log(modesString)

    hiddenModeInput.value = modesString;

    form.appendChild(hiddenModeInput);

    form.submit();
  });
});

// Validation front edit

const submitBtn = document.querySelector("#submit-btn");

const checkErrors = () => {
  // Agarramos todos los p de error
  let errorsHtml = Array.from(document.querySelectorAll(".error"));
  // console.log(errorsHtml)

  let errors = [];

  // Hacemos un for each de cada p

  errorsHtml.forEach((error) => {
    // Si el p contiene un innerHTML => existe un error
    //console.log(error.innerHTML)
    if (error.innerHTML !== "") {
      errors.push(error.innerHTML);
    }
  });
  if (errors.length > 0) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
};

const nameEditInput = document.querySelector("#name");

nameEditInput.oninput = (e) => {
  const value = e.target.value;
  const length = e.target.value.length;

  if (length < 4) {
    e.target.nextElementSibling.innerHTML = "El título es inválido";
  } else {
    e.target.nextElementSibling.innerHTML = "";
  }
  checkErrors();
};

const descriptionEditInput = document.querySelector("#description");

descriptionEditInput.oninput = (e) => {
  const value = e.target.value;
  const length = e.target.value.length;

  if (length < 20) {
    e.target.nextElementSibling.innerHTML =
      "La descripción debe tener al menos 20 caracteres";
  } else {
    e.target.nextElementSibling.innerHTML = "";
  }
  checkErrors();
};

// Cropped

const inputImage = document.getElementById("inputImage");
const image = document.getElementById("image");
const cropButton = document.getElementById("cropButton");

const cropper = new Cropper(image, {
  aspectRatio: 9 / 16, // Proporciones deseadas (ejemplo: 16:9)
  viewMode: 2, // Permite que el usuario recorte toda la imagen
});

inputImage.addEventListener("change", (e) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.src = e.target.result;
      cropper.replace(e.target.result);
    };
    reader.readAsDataURL(files[0]);
  }
});

cropButton.addEventListener("click", () => {
  const croppedImageData = cropper.getCroppedCanvas().toDataURL("image/jpeg"); // Obtén la imagen recortada
  // Envía croppedImageData al servidor y guárdala
});
