/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
/** @type {import('sequelize-cli').Migration} */
const executeSQLFIle = require('./helpers/migration.helper');

module.exports = {

  async up(queryInterface) {
    await executeSQLFIle(queryInterface, __dirname, '2024/20240311-initial-up.sql');
  },

  async down(queryInterface) {
    await executeSQLFIle(queryInterface, __dirname, '2024/20240311-initial-down.sql');
  }
};