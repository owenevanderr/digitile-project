'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notNull: {msg: 'user must have a name'},
        notEmpty: {msg: 'name must not be empty'}
      }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notNull: {msg: 'user must have a email'},
        notEmpty: {msg: 'email must not be empty'},
        isEmail: {msg: 'must be a valid email address'}
      }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notNull: {msg: 'user must have a password'},
        notEmpty: {msg: 'password must not be empty'}
      }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('users');
  }
};