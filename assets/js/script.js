const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  convertir();
  form.reset();
});

const convertir = async function () {
  try {
    const valor = Number(document.querySelector("#valor").value);
    const moneda = document.querySelector("#moneda").value;
    if (valor >0 && moneda != "no ha seleccionado") {
      const response = await obtenerDatos(moneda);
      const apiValue = response.serie[0].valor;
      await resultadoConvertido(valor, apiValue);

    } else {
     alert("debe ingresar un valor");
    }
  } catch (error) {
     alert("error al obtener los datos");
  }
};

//conseguir info de la api
async function obtenerDatos(moneda) {
  const res = await fetch(`https://mindicador.cl/api/${moneda}`);
  if (!res.ok) {
    throw new Error("error al obtener datos desde la api");
  } else {
    return await res.json();
  }
}

//operacion aritmetica para transformar
function resultadoConvertido(userValue, apiValue) {
  const valorConvertido = userValue / apiValue;
  document.querySelector(
    "#resultado"
  ).textContent = `El valor convertido es: ${valorConvertido.toFixed(2)}`;
}
