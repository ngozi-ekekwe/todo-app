'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Todo, {
          foreignKey: 'userId',
          as: 'todos',
          onDelete: 'CASCADE'
        })
      }
    },

    instanceMethods: {
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },

      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      }
    },

    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },

      beforeUpdate(user) {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }



  });
  
  return User;
};