module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          firstName: 'Frado',
          lastName: 'W',
          email: 'frado1@gmail.com',
          password:
            '$2b$10$6/r5pBOx0p.o.v15Zx1pQO8oywNYidxSw9oVhiMUap8xmGsfEHoP2', // 123456
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user', null, {});
  },
};
