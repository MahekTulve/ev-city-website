export type Amenity = {
  title: string;
  image: string;
};

export const PROJECT_AMENITIES: Record<string, Amenity[]> = {
  "ev-marina-bay": [
    {
      title: "Garden",
      image: "https://cdn.evhomes.tech/42c87a83-bfce-4173-bbf2-e8ef6b4fbee7-IMG-20241205-WA0000.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjQyYzg3YTgzLWJmY2UtNDE3My1iYmYyLWU4ZWY2YjRmYmVlNy1JTUctMjAyNDEyMDUtV0EwMDAwLmpwZyIsImlhdCI6MTczMzM4NzY0NH0.38HmSl2LQT75-wJSeMriTQbDbVAgTUId1pAgPuEYy5Y",
    },
    {
      title: "Swimming Pool",
      image: "https://cdn.evhomes.tech/490abe2a-36d3-405e-b54c-ee828c29657d-SAVE_20241205_163028.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjQ5MGFiZTJhLTM2ZDMtNDA1ZS1iNTRjLWVlODI4YzI5NjU3ZC1TQVZFXzIwMjQxMjA1XzE2MzAyOC5qcGciLCJpYXQiOjE3MzMzOTY0ODh9.LgbLlFxbVlCOAkiUwJE92ZNOsgqKlS3diAUN1ZTgi5o",
    },
     {
      title: "Yoga",
      image: "https://cdn.evhomes.tech/77be64b4-8bdd-41ee-8b6b-35e6716dbbd0-12454.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6Ijc3YmU2NGI0LThiZGQtNDFlZS04YjZiLTM1ZTY3MTZkYmJkMC0xMjQ1NC5qcGciLCJpYXQiOjE3MzM1NjM0NzB9.eyAOgBKFvwxgFPWAr5COM8kmXdnM-WGKuYHa589NF8A",
    },
    {
      title: "Gym",
      image: "https://cdn.evhomes.tech/be58c024-dda3-48e1-80c2-8b57e90b7cf0-contemporary-spotless-fitness-gym-center-interiorgenerative-ai.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6ImJlNThjMDI0LWRkYTMtNDhlMS04MGMyLThiNTdlOTBiN2NmMC1jb250ZW1wb3Jhcnktc3BvdGxlc3MtZml0bmVzcy1neW0tY2VudGVyLWludGVyaW9yZ2VuZXJhdGl2ZS1haS5wbmciLCJpYXQiOjE3MzMzOTU3OTF9.rgJNHfWKsx9sj1gAnO1ZFzaDGBtSAX3vgTcPvGXTv9U",
    },
    {
      title: "Meditation",
      image: "https://cdn.evhomes.tech/4d7640f5-7755-4e6b-bfef-79f7e6faf0dd-still-life-yoga-equipment.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjRkNzY0MGY1LTc3NTUtNGU2Yi1iZmVmLTc5ZjdlNmZhZjBkZC1zdGlsbC1saWZlLXlvZ2EtZXF1aXBtZW50LnBuZyIsImlhdCI6MTczMzM5NTg2MH0.01IsXVq_EsroHsjEZ52Q2AcLfLUq9B0YwkoDQjWKayI",
    },
     {
      title: "Party Lounge",
      image: "https://cdn.evhomes.tech/2d612c3e-2b6e-4138-af20-13b11b074814-balcony-with-view-city-ocean.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjJkNjEyYzNlLTJiNmUtNDEzOC1hZjIwLTEzYjExYjA3NDgxNC1iYWxjb255LXdpdGgtdmlldy1jaXR5LW9jZWFuLnBuZyIsImlhdCI6MTczMzM5NjMzMH0.EOO4mbYLJtVP_Vi45cM8ojxSB_j0ETv2B25bSt53AMM",
    },
  ],

  "ev-heart-city-1": [
    {
      title: "Indoor Games",
      image: "/amenities/indoor-games.png",
    },
    {
      title: "Kids Play Area",
      image: "/amenities/playground.png",
    },
  ],

  "ev-zion-1": [
    {
      title: "Yoga Deck",
      image: "/amenities/yoga.png",
    },
    {
      title: "Swimming Pool",
      image: "/amenities/pool.png",
    },
  ],

  "ev-carmel": [],
  "ev-regency": [],
};
