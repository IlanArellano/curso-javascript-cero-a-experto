const form = document.querySelector("#form_suma");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const numero_1 = +form.numero_1.value;
  const numero_2 = +form.numero_2.value;
  const suma = numero_1 + numero_2;
  const etiqueta_resultado = document.querySelector("#resultado");
  etiqueta_resultado.innerHTML = "El resultado es: " + suma;
});
