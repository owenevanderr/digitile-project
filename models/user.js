'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post}) {
      // define association here
      this.hasMany(Post, {foreignKey: 'userId', as: 'posts'});
    }

    static async login(email, password){
      const user = await User.findOne({where: {email}});

      if(!user){
        throw new Error('incorrect email');
      }

      const auth = await bcrypt.compare(password, user.password);

      if(!auth){
        throw new Error('incorrect password');
      }

      return user;
    }

    toJSON(){
      return {...this.get(), id: undefined};
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'user must have a name'},
        notEmpty: {msg: 'name must not be empty'},
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'user must have a email'},
        notEmpty: {msg: 'email must not be empty'},
        isEmail: {msg: 'must be a valid email address'},
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
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    hooks: {
      beforeCreate: async(user) => {
        if(user.password){
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  });
  return User;
};