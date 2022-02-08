const { dialog } = require("@electron/remote");
const path = require("path");
const fs = require("fs");
const os = require("os");
const PdfPrinter = require("pdfmake");

const fonts = {
  Roboto: {
    normal: path.join(__dirname, "/fonts/Roboto/Roboto-Regular.ttf"),
    bold: path.join(__dirname, "/fonts/Roboto/Roboto-Bold.ttf"),
  },
  RedHatText: {
    normal: path.join(__dirname, "/fonts/RedHatText/RedHatText-Regular.ttf"),
    bold: path.join(__dirname, "/fonts/RedHatText/RedHatText-Bold.ttf"),
  },
  RedHatTextMedium: {
    normal: path.join(__dirname, "/fonts/RedHatText/RedHatText-Medium.ttf"),
  },
  RobotoSlab: {
    normal: path.join(__dirname, "/fonts/RobotoSlab/RobotoSlab-Regular.ttf"),
    bold: path.join(__dirname, "/fonts/RobotoSlab/RobotoSlab-Bold.ttf"),
  },
};

const printer = new PdfPrinter(fonts);

const calcMargin = (data, a, b, shift = 2) => {
  return a * data.length + b + (data.match(/1/g) || []).length * shift;
};

const splitInput = (textArray) => {
  return textArray.map((item) => [
    {
      text:
        (item.match(/\*\*.*\*\*/) || [""])[0]
          .replace(/\*/g, "")
          .toUpperCase() || "BRAK",
      style: ["mediumHeader"],
    },
    {
      text: item.replace(/\*\*.*\*\*\s*/, ""),
      style: ["items"],
    },
  ]);
};

const generatePDF = (data) => {
  const docDefinition = {
    background: (currentPage, pageSize) => {
      if (currentPage === 1) {
        return {
          image: data.backgroundImage,
        };
      }
      return {
        image: path.join(__dirname, "/images/background-image.jpg"),
      };
    },
    pageMargins: 0,
    pageSize: "A4",
    content: [
      // First Page
      {
        canvas: [
          {
            type: "rect",
            x: 40,
            y: 40,
            w: 515,
            h: 550,
            color: "#000000",
            fillOpacity: 0.6,
          },
        ],
      },
      {
        canvas: [
          {
            type: "rect",
            x: 60,
            y: -200,
            w: 475,
            h: 3,
            color: "#FFFFFF",
          },
        ],
      },
      {
        text: `INWESTYCJA DEWELOPERSKA ${data.city.toUpperCase()}\n UL. ${data.street.toUpperCase()}`,
        font: "RedHatText",
        bold: true,
        style: ["firstPage"],
        fontSize: 45,
        characterSpacing: 4,
        lineHeight: 0.85,
        margin: [60, -520, 60, 160],
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
                text: `Raport nr ${data.reportId}/${data.year}`,
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
            text: data.sendedOfferts,
            alignment: "right",
            margin: [0, 0, calcMargin(data.sendedOfferts, -8, 24), 0],
            style: ["circle", "mediumCircle"],
          },
          {
            width: "50%",
            text: data.meetingsAndPresentations,
            alignment: "left",
            margin: [
              calcMargin(data.meetingsAndPresentations, -8, 16),
              0,
              0,
              0,
            ],
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
            margin: [-195, 0, 0, 0],
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
            text: data.reservationContracts,
            alignment: "right",
            margin: [0, 0, calcMargin(data.reservationContracts, -8, 16), 0],
            style: ["circle", "mediumCircle"],
          },
          {
            width: "33%",
            text: data.developmentContracts,
            alignment: "center",
            style: ["circle", "mediumCircle"],
          },
          {
            width: "33%",
            text: data.transfer,
            alignment: "left",
            margin: [calcMargin(data.transfer, -8, 8), 0, 0, 0],
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
            text: data.otodom,
            alignment: "right",
            margin: [0, 0, calcMargin(data.otodom, -10, 20, 3), 0],
            style: ["circle", "largeCircle"],
          },
          {
            width: "33%",
            text: data.gratka,
            alignment: "center",
            style: ["circle", "largeCircle"],
          },
          {
            width: "33%",
            text: data.olx,
            alignment: "left",
            margin: [calcMargin(data.olx, -12, 24, 3), 0, 0, 0],
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
                    text: data.googleRequestOffer,
                    margin: [
                      25 + calcMargin(data.googleRequestOffer, -6, 18, 1),
                      -60,
                      0,
                      0,
                    ],
                    style: ["circle", "smallCircle"],
                  },
                ],
              ],
              margin: [0, 70, 0, 0],
            },
          ],
          {
            image: data.analyticsImage,
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
                margin: [50, -5, 0, 0],
                style: ["circleDescription"],
              },

              [
                {
                  canvas: [
                    {
                      type: "ellipse",
                      x: 55,
                      y: 18,
                      color: "#e2cb9c",
                      r1: 45,
                      r2: 45,
                    },
                  ],
                },
                {
                  text: `${data.fanpage.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`,
                  margin: [25 + calcMargin(data.fanpage, -5, 25, 1), -60, 0, 0],
                  style: ["circle", "smallCircle"],
                },
              ],
            ],
            margin: [0, 70, 0, 0],
            width: "50%",
          },

          {
            columns: [
              {
                text: "Zapytania\n o ofertę\n (total)",
                fontSize: 18,
                alignment: "center",
                margin: [20, -5, 0, 0],
                style: ["circleDescription"],
              },

              [
                {
                  canvas: [
                    {
                      type: "ellipse",
                      x: 40,
                      y: 18,
                      color: "#c8ae83",
                      r1: 45,
                      r2: 45,
                    },
                  ],
                },
                {
                  text: data.facebookRequestOffer,
                  margin: [
                    18 + calcMargin(data.facebookRequestOffer, -6, 24, 1),
                    -60,
                    0,
                    0,
                  ],
                  style: ["circle", "smallCircle"],
                },
              ],
            ],
            margin: [0, 70, 0, 0],
            width: "50%",
          },
        ],
      },
      {
        columns: [
          [
            {
              text: "Post sponsorowany:",
              style: ["smallListHeader"],
            },
            {
              ul: data.post,
              lineHeight: 1.2,
              margin: [10, 3, 0, 0],
            },
          ],

          [
            {
              text: "Grupy tematyczne:",
              style: ["smallListHeader"],
            },
            {
              ul: data.group,
              lineHeight: 1.2,
              margin: [10, 3, 0, 0],
            },
          ],
        ],
        margin: [80, 50, 0, 0],
        columnGap: 50,
        pageBreak: "after",
      },

      // fouth Page
      {
        text: "WNIOSKI",
        style: ["listHeader"],
      },
      {
        separator: ")",
        ol: data.conclusion.map((conclusion) => ({
          text: conclusion,
          style: ["listElement"],
        })),
        fontSize: 15,
        alignment: "justify",
        font: "RedHatTextMedium",
        margin: [35, 10, 50, 0],
        pageBreak: "after",
      },

      // fifth Page
      {
        text: "TEMATY BUILDMAN",
        style: ["listHeader"],
      },
      {
        separator: ")",
        ol: data.topic.map((topic) => ({
          text: topic,
          style: ["listElement"],
        })),
        fontSize: 15,
        alignment: "justify",
        font: "RedHatTextMedium",
        margin: [20, 10, 30, 0],
        pageBreak: "after",
      },

      // sixth Page
      {
        text: "REZERWACJE",
        style: ["listHeader"],
      },
      splitInput(data.reservation),
      {
        text: "",
        pageBreak: "after",
      },

      // seventh Page
      {
        text: "UMOWY DEWELOPERSKIE",
        style: ["listHeader"],
      },
      splitInput(data.development),
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

      smallListHeader: {
        fontSize: 13,
        bold: true,
      },
      listHeader: {
        fontSize: 20,
        bold: true,
        font: "RedHatText",

        margin: [20, 20, 0, 0],
      },
      listElement: {
        margin: [0, 0, 0, 20],
      },
      mediumHeader: {
        fontSize: 14,
        bold: true,
        font: "RedHatText",

        margin: [20, 15, 0, 0],
      },
      items: {
        fontSize: 14,
        font: "RedHatTextMedium",
        margin: [20, 2, 20, 5],
      },
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  dialog
    .showSaveDialog({
      title: "Wybierz ścieżke do zapisu raportu",
      defaultPath: path.join(
        os.homedir(),
        `Desktop/Raport_${data.month.toLowerCase()}-${data.year}_${data.street}`
      ),
      buttonLabel: "Zapisz",
      filters: [
        {
          name: "PDF file",
          extensions: ["pdf"],
        },
      ],
      properties: [],
    })
    .then((file) => {
      if (!file.canceled) {
        const filePath = file.filePath.toString();

        const checkedFiledPath = filePath.replace(/[.].*/, "") + ".pdf";

        console.log(checkedFiledPath);
        pdfDoc.pipe(fs.createWriteStream(checkedFiledPath));
        pdfDoc.end();
      }
    })
    .catch((error) => {
      console.log(error);
      pdfDoc.end();
    });
};

export default generatePDF;
