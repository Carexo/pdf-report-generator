import generatePDF from "./utils/generatePDF.js";

const form = document.querySelector("form");
const inputDate = document.querySelector("#date");

const currentDate = new Date();
inputDate.value = `${currentDate.getFullYear()}-${
  currentDate.getMonth() + 1 < 10 && "0"
}${currentDate.getMonth() + 1}`;

const inputsObject = {};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputs = [...form.querySelectorAll("input")];

  inputs.forEach((input) => {
    if (input.id === "date") {
      const date = input.value.split("-");

      inputsObject["year"] = date[0];
      inputsObject["month"] = months[date[1]];
    }
    inputsObject[input.id] = input.value;
  });

  console.log(inputsObject);

  generatePDF(inputsObject);
  inputs.forEach((input) => {
    input.value = "";
  });
});

const months = {
  "01": "STYCZEŃ",
  "02": "LUTY",
  "03": "MARZEC",
  "04": "KWIECIEŃ",
  "05": "MAJ",
  "06": "CZERWIEC",
  "07": "LIPIEC",
  "08": "SIERPIEŃ",
  "09": "WRZESIEŃ",
  10: "PAŹDZIERNIK",
  11: "LISTOPAD",
  12: "GRUDZIEŃ",
};
