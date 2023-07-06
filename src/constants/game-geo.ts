import { NUMBER_COLUMN } from '@/configs';

const convertArrayToGeo = () => {
  const array = Array(NUMBER_COLUMN * NUMBER_COLUMN).fill(null);
  let mapper = {};
  array.forEach(function (_, index) {
    if (index === 0) {
      mapper = {
        ...mapper,
        0: {
          x: 0,
          y: 0,
        },
      };
    } else {
      const y = index % NUMBER_COLUMN;
      const x = Number.parseInt(index / NUMBER_COLUMN + '');
      mapper = {
        ...mapper,
        [index]: {
          x,
          y,
        },
      };
    }
  });

  return mapper;
};

const INDEX_TO_GEO_MAPPER = convertArrayToGeo();

export { convertArrayToGeo, INDEX_TO_GEO_MAPPER };
