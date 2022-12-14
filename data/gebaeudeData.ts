const gebaeudeData = [
  {
    id: "bierpinsel",
    info: {
      name: "Bierpinsel",
      architekt: [
        {
          name: "Ralf Schüler & Ursulina Schüler-Witte",
          link: "https://de.wikipedia.org/wiki/Ralf_Sch%C3%BCler_und_Ursulina_Sch%C3%BCler-Witte"
        }
      ],
      bauzeit: "1972—1976",
      karte: "https://goo.gl/maps/SmF6s46hufEq6TfHA",
      wiki: "https://www.abandonedberlin.com/bierpinsel"
    },
    camera: {
      position: [130, 100, 100],
      zoom: 0.75
    },
    light: {
      position: [15, 25, 30],
      angle: 0.3,
      intensity: 1
    },
    model: {
      showZeroPlane: false,
      scale: 1,
      position: [0, -9.2, -1],
      rotation: [0, 0, 0]
    }
  },
  {
    id: "maeusebunker",
    info: {
      name: "Mäusebunker",
      architekt: [
        {
          name: "Gerd Hänska",
          link: "https://de.wikipedia.org/wiki/Gerd_H%C3%A4nska"
        },
        {
          name: "Kurt Schmersow",
          link: "https://de.wikipedia.org/wiki/Ralf_Sch%C3%BCler_und_Ursulina_Sch%C3%BCler-Witte"
        }
      ],
      bauzeit: "1971—1981",
      karte: "https://goo.gl/maps/eAWm1rtDrBULFQe57",
      wiki: "https://www.abandonedberlin.com/mouse-bunker/"
    },

    camera: {
      position: [130, 80, 100],
      zoom: 0.8
    },
    model: {
      showZeroPlane: false,
      scale: 0.38,
      position: [0, -1, 1.5],
      rotation: [0, -90, 0]
    },
    light: {
      position: Array(3).fill(13),
      angle: 0.8,
      intensity: 2.1
    }
  },
  {
    id: "rosaroehre",
    info: {
      name: "Rosa Röhre",
      architekt: [
        {
          name: "Ludwig Leo",
          link: "https://de.wikipedia.org/wiki/Gerd_H%C3%A4nska"
        },
        {
          name: "Christian de Boes",
          link: ""
        }
      ],
      bauzeit: "1968—1974",
      karte: "https://goo.gl/maps/zrxRS7VwsBHxxQLe7",
      wiki: "https://de.wikipedia.org/wiki/Rosa_R%C3%B6hre"
    },

    camera: {
      position: [140, 60, 100],
      zoom: 0.78
    },
    model: {
      showZeroPlane: false,
      scale: 0.4,
      position: [1.8, -3.9, -3.5],
      rotation: [0, 90, 0]
    },
    light: {
      position: Array(3).fill(14),
      angle: 0.8,
      intensity: 1.3
    }
  },
  {
    id: "trudelturm",
    info: {
      name: "Trudelturm",
      architekt: [
        {
          name: "Hermann Brenner & Werner Deutschmann",
          link: ""
        }
      ],
      bauzeit: "1934—1936",
      karte: "https://goo.gl/maps/pG92dCi76gmnbxZT6",
      wiki: "https://en.wikipedia.org/wiki/Trudelturm"
    },

    camera: {
      position: [100, 120, 100],
      zoom: 0.95
    },
    model: {
      showZeroPlane: false,
      scale: 1,
      position: [0, -6, 0],
      rotation: [0, -15, 0]
    },
    light: {
      position: [15, 35, 15],
      angle: 0.8,
      intensity: 1.3
    }
  },
  {
    id: "kugellabore",
    info: {
      name: "Isothermische Kugellabore",
      architekt: [
        {
          name: "Horst Welser",
          link: "https://de.wikipedia.org/wiki/Horst_Welser"
        }
      ],
      bauzeit: "1959—1961",
      karte: "https://goo.gl/maps/pG92dCi76gmnbxZT6",
      wiki: "https://en.wikipedia.org/wiki/Trudelturm"
    },
    camera: {
      position: [100, 50, 120],
      zoom: 1
    },
    model: {
      showZeroPlane: false,
      scale: 0.42,
      position: [-0, -3.0, 0],
      rotation: [0, 100, 0]
    },
    light: {
      position: [15, 25, 15],
      angle: 0.8,
      intensity: 0.9
    }
  }
] as CanvasArray;

export default gebaeudeData;
