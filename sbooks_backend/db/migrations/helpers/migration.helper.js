/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const executeSQLFIle = async (queryInterface, dirname, sqlFile) => {

  const sqlFilePath = path.join(dirname, 'scripts', sqlFile);
  const sql = fs.readFileSync(sqlFilePath, 'utf8');
  const statements = sql.split(';'); // Split the SQL script into individual statements

  for (const statement of statements) {
    if (statement.trim() !== '') {
      await queryInterface.sequelize.query(statement);
    }
  }
  
}
module.exports = executeSQLFIle;