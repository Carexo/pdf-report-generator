const fs = require("fs");
const PdfPrinter = require("pdfmake");

const fonts = {
  Roboto: {
    normal: "src/fonts/Roboto/Roboto-Regular.ttf",
    bold: "src/fonts/Roboto/Roboto-Bold.ttf",
  },
  RedHatText: {
    normal: "src/fonts/RedHatText/RedHatText-Regular.ttf",
    bold: "src/fonts/RedHatText/RedHatText-Bold.ttf",
  },
  RobotoSlab: {
    normal: "src/fonts/RobotoSlab/RobotoSlab-Regular.ttf",
    bold: "src/fonts/RobotoSlab/RobotoSlab-Bold.ttf",
  },
};

const printer = new PdfPrinter(fonts);

const generatePDF = (data) => {
  const docDefinition = {
    background: (currentPage, pageSize) => {
      if (currentPage === 1) {
        return {
          image: "src/images/background.jpg",
        };
      }
      return {
        image: "src/images/background-image.jpg",
      };
    },
    pageMargins: 0,
    pageSize: "A4",
    content: [
      // First Page
      {
        text: `INWESTYCJA DEWELOPERSKA ${data.city.toUpperCase()}\n UL. ${data.street.toUpperCase()}`,
        font: "RedHatText",
        bold: true,
        style: ["firstPage"],
        fontSize: 45,
        characterSpacing: 4,
        lineHeight: 0.85,
        margin: [60, 60, 60, 160],
      },
      {
        text: "RAPORT PRZYGOTOWANY\n PRZEZ M2",
        bold: true,
        style: ["firstPage", "author"],
      },
      {
        text: `${data.month}  II  ${data.year}`,
        pageBreak: "after",
        style: ["firstPage", "author"],
      },

      // Second Page
      {
        layout: "noBorders",
        table: {
          headerRows: 1,
          widths: ["100%"],
          body: [
            [
              {
                text: `Raport nr ${data.raportId}/${data.year}`,
                lineHeight: 1.1,
                margin: [0, 5, 0, 0],
                font: "RedHatText",
                fillColor: "#404040",
                bold: true,
                alignment: "center",
                fontSize: 35,
                color: "#FFFFFF",
              },
            ],
          ],
        },
      },

      // First Row
      {
        columns: [
          {
            canvas: [
              {
                type: "ellipse",
                x: 222,
                y: 110,
                color: "#ded497",
                r1: 45,
                r2: 45,
              },
            ],
          },
          {
            canvas: [
              {
                type: "ellipse",
                x: 68,
                y: 110,
                color: "#c5b67e",
                r1: 45,
                r2: 45,
              },
            ],
          },
        ],
      },
      {
        columns: [
          {
            width: "50%",
            text: "340",
            alignment: "right",
            style: ["circle", "mediumCircle"],
          },
          {
            width: "50%",
            text: "68",
            alignment: "left",
            style: ["circle", "mediumCircle"],
          },
        ],
        margin: [0, -65, 0, 0],
        columnGap: 100,
      },
      {
        columns: [
          {
            width: "50%",
            text: "Wysłane\n oferty",
            alignment: "center",
            margin: [180, 0, 0, 0],
            style: ["circleDescription"],
          },
          {
            width: "50%",
            text: "Spotkanie\n i prezentacje",
            alignment: "center",
            margin: [0, 0, 190, 0],
            style: ["circleDescription"],
          },
        ],
        margin: [0, 30, 0, 0],
        columnGap: 70,
      },

      // Second Row
      {
        columns: [
          {
            canvas: [
              {
                type: "ellipse",
                x: 115,
                y: 110,
                color: "#bbb290",
                r1: 45,
                r2: 45,
              },
            ],
          },
          {
            canvas: [
              {
                type: "ellipse",
                x: 97,
                y: 110,
                color: "#9e9b8e",
                r1: 45,
                r2: 45,
              },
            ],
          },
          {
            canvas: [
              {
                type: "ellipse",
                x: 72,
                y: 110,
                color: "#404040",
                r1: 45,
                r2: 45,
              },
            ],
          },
        ],
      },
      {
        columns: [
          {
            width: "33%",
            text: "26",
            alignment: "right",
            style: ["circle", "mediumCircle"],
          },
          {
            width: "33%",
            text: "11",
            alignment: "center",
            style: ["circle", "mediumCircle"],
          },
          {
            width: "33%",
            text: "0",
            alignment: "left",
            style: ["circle", "mediumCircle"],
          },
        ],
        margin: [0, -65, 0, 0],
        columnGap: 100,
      },
      {
        columns: [
          {
            width: "33%",
            text: "Umowy\n rezerwacyjne",
            alignment: "center",
            margin: [33, 0, 0, 0],
            style: ["circleDescription"],
          },
          {
            width: "33%",
            text: "Umowy\n deweloperskie",
            alignment: "center",
            style: ["circleDescription"],
          },
          {
            width: "33%",
            text: "Umowy\n przenoszące",
            alignment: "center",
            margin: [0, 0, 42, 0],
            style: ["circleDescription"],
          },
        ],
        margin: [0, 30, 0, 0],
      },

      {
        layout: "noBorders",
        margin: [0, 80, 0, 0],
        table: {
          headerRows: 1,
          widths: ["100%"],
          body: [
            [
              {
                text: "Aktywne ogłoszenia",
                lineHeight: 1.1,
                margin: [0, 5, 0, 0],
                font: "RedHatText",
                fillColor: "#404040",
                bold: true,
                alignment: "center",
                fontSize: 30,
                color: "#FFFFFF",
              },
            ],
          ],
        },
      },

      // Active announcements

      {
        columns: [
          {
            canvas: [
              {
                type: "ellipse",
                x: 108,
                y: 80,
                color: "#9e9b8e",
                r1: 53,
                r2: 53,
              },
            ],
          },
          {
            canvas: [
              {
                type: "ellipse",
                x: 97,
                y: 80,
                color: "#bbb290",
                r1: 53,
                r2: 53,
              },
            ],
          },
          {
            canvas: [
              {
                type: "ellipse",
                x: 85,
                y: 80,
                color: "#bbb290",
                r1: 53,
                r2: 53,
              },
            ],
          },
        ],
      },
      {
        columns: [
          {
            width: "33%",
            text: "96",
            alignment: "right",
            style: ["circle", "largeCircle"],
          },
          {
            width: "33%",
            text: "97",
            alignment: "center",
            style: ["circle", "largeCircle"],
          },
          {
            width: "33%",
            text: "25",
            alignment: "left",
            style: ["circle", "largeCircle"],
          },
        ],
        margin: [0, -80, 0, 0],
        columnGap: 100,
      },
      {
        columns: [
          {
            width: "33%",
            text: "Otodom.pl",
            alignment: "center",
            margin: [23, 0, 0, 0],
            style: ["circleDescription", "largeDescription"],
          },
          {
            width: "33%",
            text: "gratka.pl",
            alignment: "center",
            margin: [5, 0, 0, 0],
            style: ["circleDescription", "largeDescription"],
          },
          {
            width: "33%",
            text: "olx.pl",
            alignment: "center",
            margin: [0, 0, 12, 0],
            style: ["circleDescription", "largeDescription"],
          },
        ],
        margin: [0, 55, 0, 0],
        pageBreak: "after",
      },

      // Third page
      {
        layout: "noBorders",
        table: {
          headerRows: 1,
          widths: ["100%"],
          body: [
            [
              {
                text: "Google Analytics",
                lineHeight: 1.1,
                margin: [0, 5, 0, 0],
                font: "RedHatText",
                fillColor: "#404040",
                bold: true,
                alignment: "center",
                fontSize: 30,
                color: "#FFFFFF",
              },
            ],
          ],
        },
      },

      {
        columns: [
          [
            {
              text: "Ostatnie 28 dni na\n stronie zweika.pl",
              fontSize: 14,
              bold: true,
            },
            {
              columns: [
                {
                  text: "Zapytania\n o ofertę\n (suma total)",
                  fontSize: 18,
                  alignment: "center",
                  margin: [-20, 0, 0, 0],
                  style: ["circleDescription"],
                },

                [
                  {
                    canvas: [
                      {
                        type: "ellipse",
                        x: 40,
                        y: 18,
                        color: "#bbb290",
                        r1: 45,
                        r2: 45,
                      },
                    ],
                  },
                  {
                    text: "162",
                    margin: [25, -60, 0, 0],
                    style: ["circle", "smallCircle"],
                  },
                ],
              ],
              margin: [0, 70, 0, 0],
            },
          ],
          {
            image: "src/images/plot.png",
            width: 320,
          },
        ],
        margin: [20, 30, 20, 0],
      },

      // Row
      {
        layout: "noBorders",
        margin: [0, 80, 0, 0],
        table: {
          headerRows: 1,
          widths: ["100%"],
          body: [
            [
              {
                text: "Facebook",
                lineHeight: 1.1,
                margin: [0, 5, 0, 0],
                font: "RedHatText",
                fillColor: "#404040",
                bold: true,
                alignment: "center",
                fontSize: 30,
                color: "#FFFFFF",
              },
            ],
          ],
        },
      },
      {
        columns: [
          {
            columns: [
              {
                text: "Zasięg\n Fanpage\n (total)",
                fontSize: 18,
                alignment: "center",
                margin: [0, 0, 0, 0],
                style: ["circleDescription"],
              },

              [
                {
                  canvas: [
                    {
                      type: "ellipse",
                      x: 40,
                      y: 18,
                      color: "#bbb290",
                      r1: 45,
                      r2: 45,
                    },
                  ],
                },
                {
                  text: "162",
                  margin: [25, -60, 0, 0],
                  style: ["circle", "smallCircle"],
                },
              ],
            ],
            margin: [0, 70, 0, 0],
          },

          {
            columns: [
              {
                text: "Zapytania\n o ofertę\n (total)",
                fontSize: 18,
                alignment: "center",
                margin: [0, 0, 0, 0],
                style: ["circleDescription"],
              },

              [
                {
                  canvas: [
                    {
                      type: "ellipse",
                      x: 40,
                      y: 18,
                      color: "#bbb290",
                      r1: 45,
                      r2: 45,
                    },
                  ],
                },
                {
                  text: "162",
                  margin: [25, -60, 0, 0],
                  style: ["circle", "smallCircle"],
                },
              ],
            ],
            margin: [0, 70, 0, 0],
          },
        ],
      },
    ],

    styles: {
      firstPage: {
        color: "#FFFFFF",
        font: "RedHatText",
        margin: [60, 0, 60, 0],
      },
      author: {
        fontSize: 15,
        characterSpacing: 2,
        lineHeight: 1.15,
      },
      circle: {
        font: "RobotoSlab",
        color: "#FFFFFF",
      },
      smallCircle: {
        fontSize: 20,
        bold: true,
      },
      mediumCircle: {
        fontSize: 30,
      },
      largeCircle: {
        fontSize: 40,
      },
      circleDescription: {
        bold: true,
        color: "#404040",
      },
      largeDescription: {
        fontSize: 15,
      },
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream("report.pdf"));
  pdfDoc.end();
};

const data = {
  city: "chorzów",
  date: "2022-01",
  month: "STYCZEŃ",
  raportId: "13",
  street: "nomiarki",
  year: "2022",
};

generatePDF(data);
// export default generatePDF;
