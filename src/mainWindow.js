import generatePDF from "./utils/generatePDF.js";

const form = document.querySelector("form");
const inputDate = document.querySelector("#date");
const newReportButton = document.querySelector("#new-report");

const addPostButton = document.querySelector("#addPost");
const addGroupButton = document.querySelector("#addGroup");
const addConclusionButton = document.querySelector("#addConclusion");
const addTopicButton = document.querySelector("#addTopic");
const addReservationButton = document.querySelector("#addReservation");
const addDevelopmentButton = document.querySelector("#addDevelopment");

const currentDate = new Date();
inputDate.value = `${currentDate.getFullYear()}-${
  currentDate.getMonth() + 1 < 10 && "0"
}${currentDate.getMonth() + 1}`;

let inputsObject = {};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputs = [
    ...form.querySelectorAll("input"),
    ...form.querySelectorAll("textarea"),
  ];

  inputs.forEach((input) => {
    if (input.id === "date") {
      const date = input.value.split("-");

      inputsObject["year"] = date[0];
      inputsObject["month"] = months[date[1]];
      return;
    }

    if (input.name === "file") {
      inputsObject[input.id] = input.files[0].path;
      return;
    }

    if (
      /(post|group|conclusion|topic|reservation|development)/.test(input.name)
    ) {
      if (inputsObject[input.name] === undefined) {
        inputsObject[input.name] = [input.value];
      } else {
        inputsObject[input.name] = [...inputsObject[input.name], input.value];
      }
      return;
    }

    inputsObject[input.id] = input.value;
  });

  console.log(inputsObject);

  generatePDF(inputsObject);

  inputsObject = {};
});

const removeInput = (event) => {
  event.path[1].remove();
};

const addInput = (event, type = "input", rows = 10) => {
  const element = event.target;
  const formGroup = event.path[1];
  element.dataset.inputNumber++;
  const { inputNumber, name } = element.dataset;

  const html =
    type === "input"
      ? ` <div class="input-group">
            <button type="button" id="button-${name}${inputNumber}"></button>
            <input type="text" id="${name}${inputNumber}" name="${name}" />
          </div>
    `
      : ` <div class="input-group">
            <button type="button" id="button-${name}${inputNumber}"></button>
            <textarea
              name="${name}"
              id="${name}${inputNumber}"
              rows="${rows}"
            ></textarea>
          </div>
          `;

  element.insertAdjacentHTML("beforebegin", html);
  formGroup.querySelector(`#${name}${inputNumber}`).focus();
  formGroup
    .querySelector(`#button-${name}${inputNumber}`)
    .addEventListener("click", removeInput);
};

addPostButton.addEventListener("click", addInput);
addGroupButton.addEventListener("click", addInput);
addConclusionButton.addEventListener("click", (event) =>
  addInput(event, "textarea")
);
addTopicButton.addEventListener("click", (event) =>
  addInput(event, "textarea")
);
addReservationButton.addEventListener("click", (event) =>
  addInput(event, "textarea", 5)
);
addDevelopmentButton.addEventListener("click", (event) =>
  addInput(event, "textarea", 5)
);

const resetForm = () => {
  const inputs = [
    ...form.querySelectorAll("input"),
    ...form.querySelectorAll("textarea"),
  ];
  inputs.forEach((input) => {
    input.value = "";
  });
  inputDate.value = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1 < 10 && "0"
  }${currentDate.getMonth() + 1}`;
  inputsObject = {};
};

newReportButton.addEventListener("click", resetForm);

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
