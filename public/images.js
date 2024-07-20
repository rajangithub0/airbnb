const images = [
  {
    label: 'Farms',
    imgSrc:
      'https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg',
  },
  {
    label: 'Amazing views',
    imgSrc:
      'https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg',
  },
  {
    label: 'Countrysides',
    imgSrc:
      'https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg',
  },
  {
    label: 'Earth homes',
    imgSrc:
      'https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg',
  },
  {
    label: 'Beach',
    imgSrc:
      'https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg',
  },
  {
    label: 'Amazing pools',
    imgSrc:
      'https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg',
  },
  {
    label: 'Private rooms',
    imgSrc:
      'https://a0.muscache.com/pictures/eb7ba4c0-ea38-4cbb-9db6-bdcc8baad585.jpg',
  },
  {
    label: 'Treehouses',
    imgSrc:
      'https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg',
  },
  {
    label: 'OMG!',
    imgSrc:
      'https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg',
  },
  {
    label: 'Lakefront',
    imgSrc:
      'https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg',
  },
  {
    label: 'Luxe',
    imgSrc:
      'https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg',
  },
  {
    label: 'Cabins',
    imgSrc:
      'https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg',
  },
  {
    label: 'Historical',
    imgSrc:
      'https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg',
  },
  {
    label: 'Castles',
    imgSrc:
      'https://a0.muscache.com/pictures/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg',
  },
  {
    label: 'Islands',
    imgSrc:
      'https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg',
  },
  {
    label: 'Design',
    imgSrc:
      'https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg',
  },
  {
    label: 'Iconic cities',
    imgSrc:
      'https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg',
  },
  {
    label: 'National parks',
    imgSrc:
      'https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg',
  },
  {
    label: 'Trending',
    imgSrc:
      'https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg',
  },
  {
    label: 'Mansions',
    imgSrc:
      'https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg',
  },
  {
    label: 'Off the gird',
    imgSrc:
      'https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg',
  },
  {
    label: 'Tiny homes',
    imgSrc:
      'https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg',
  },
  {
    label: 'House boats',
    imgSrc:
      'https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg',
  },
  {
    label: 'top',
    imgSrc:
      'https://a0.muscache.com/pictures/c027ff1a-b89c-4331-ae04-f8dee1cdc287.jpg',
  },
  {
    label: 'Tropical',
    imgSrc:
      'https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg',
  },
  {
    label: 'Camping',
    imgSrc:
      'https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg',
  },
  {
    label: 'Vineyards',
    imgSrc:
      'https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg',
  },
  {
    label: 'Caves',
    imgSrc:
      'https://a0.muscache.com/pictures/60ff02ae-d4a2-4d18-a120-0dd274a95925.jpg',
  },
  {
    label: 'Containers',
    imgSrc:
      'https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg',
  },
  {
    label: 'Bed&breakfast',
    imgSrc:
      'https://a0.muscache.com/pictures/0ff9740e-52a2-4cd5-ae5a-94e1bfb560d6.jpg',
  },
  {
    label: 'Play',
    imgSrc:
      'https://a0.muscache.com/pictures/5ed8f7c7-2e1f-43a8-9a39-4edfc81a3325.jpg',
  },
  {
    label: 'New',
    imgSrc:
      'https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg',
  },
  {
    label: 'Boats',
    imgSrc:
      'https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg',
  },
  {
    label: 'Creative spaces',
    imgSrc:
      'https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg',
  },
  {
    label: 'Skilling',
    imgSrc:
      'https://a0.muscache.com/pictures/8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622.jpg',
  },
  {
    label: 'A-frames',
    imgSrc:
      'https://a0.muscache.com/pictures/c8bba3ed-34c0-464a-8e6e-27574d20e4d2.jpg',
  },
  {
    label: "Chef's Kitchen",
    imgSrc:
      'https://a0.muscache.com/pictures/1d477273-96d6-4819-9bda-9085f809dad3.jpg',
  },
  {
    label: 'Desert',
    imgSrc:
      'https://a0.muscache.com/pictures/ddd13204-a5ae-4532-898c-2e595b1bb15f.jpg',
  },
  {
    label: 'Domes',
    imgSrc:
      'https://a0.muscache.com/pictures/a6dd2bae-5fd0-4b28-b123-206783b5de1d.jpg',
  },
  {
    label: 'Surfing',
    imgSrc:
      'https://a0.muscache.com/pictures/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg',
  },
  {
    label: 'Riads',
    imgSrc:
      'https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg',
  },
  {
    label: 'Arctic',
    imgSrc:
      'https://a0.muscache.com/pictures/7ff6e4a1-51b4-4671-bc9a-6f523f196c61.jpg',
  },
  {
    label: 'Windmills',
    imgSrc:
      'https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg',
  },
  {
    label: 'Ryokans',
    imgSrc:
      'https://a0.muscache.com/pictures/5cdb8451-8f75-4c5f-a17d-33ee228e3db8.jpg',
  },
  {
    label: 'Barns',
    imgSrc:
      'https://a0.muscache.com/pictures/827c5623-d182-474a-823c-db3894490896.jpg',
  },
  {
    label: 'Golfing',
    imgSrc:
      'https://a0.muscache.com/pictures/f60700bc-8ab5-424c-912b-6ef17abc479a.jpg',
  },
  {
    label: 'Towers',
    imgSrc:
      'https://a0.muscache.com/pictures/f60700bc-8ab5-424c-912b-6ef17abc479a.jpg',
  },
  {
    label: 'Minsus',
    imgSrc:
      'https://a0.muscache.com/pictures/6b639c8d-cf9b-41fb-91a0-91af9d7677cc.jpg',
  },
  {
    label: 'Yurts',
    imgSrc:
      'https://a0.muscache.com/pictures/d721318f-4752-417d-b4fa-77da3cbc3269.jpg',
  },
  {
    label: 'Dammusi',
    imgSrc:
      'https://a0.muscache.com/pictures/48b55f09-f51c-4ff5-b2c6-7f6bd4d1e049.jpg',
  },
  {
    label: 'Cycladic homes',
    imgSrc:
      'https://a0.muscache.com/pictures/4759a0a7-96a8-4dcd-9490-ed785af6df14.jpg',
  },
  {
    label: 'Ski-in/out',
    imgSrc:
      'https://a0.muscache.com/pictures/c9157d0a-98fe-4516-af81-44022118fbc7.jpg',
  },
  {
    label: 'Trulli',
    imgSrc:
      'https://a0.muscache.com/pictures/e4b12c1b-409b-4cb6-a674-7c1284449f6e.jpg',
  },
  {
    label: 'Hanoks',
    imgSrc:
      'https://a0.muscache.com/pictures/757deeaa-c78f-488f-992b-d3b1ecc06fc9.jpg',
  },
  {
    label: 'Casas particulares',
    imgSrc:
      'https://a0.muscache.com/pictures/33848f9e-8dd6-4777-b905-ed38342bacb9.jpg',
  },
  {
    label: 'Grand pianos',
    imgSrc:
      'https://a0.muscache.com/pictures/51f5cf64-5821-400c-8033-8a10c7787d69.jpg',
  },
  {
    label: 'Adapted',
    imgSrc:
      'https://a0.muscache.com/pictures/251c0635-cc91-4ef7-bb13-1084d5229446.jpg',
  },
  {
    label: 'Grand pianos',
    imgSrc:
      'https://a0.muscache.com/pictures/8eccb972-4bd6-43c5-ac83-27822c0d3dcd.jpg',
  },
  {
    label: 'Adapted',
    imgSrc:
      'https://a0.muscache.com/pictures/e22b0816-f0f3-42a0-a5db-e0f1fa93292b.jpg',
  },
  {
    label: "Shepherd's huts",
    imgSrc:
      'https://a0.muscache.com/pictures/747b326c-cb8f-41cf-a7f9-809ab646e10c.jpg',
  },
  {
    label: 'Camper vans',
    imgSrc:
      'https://a0.muscache.com/pictures/31c1d523-cc46-45b3-957a-da76c30c85f9.jpg',
  },
  {
    label: 'Lake',
    imgSrc:
      'https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg',
  },
];

module.exports = images;

