import DataTypes from "sequelize"
import {sequelize} from "../config/database.js"
const Movie = sequelize.define("User", {
    id: { primaryKey: true, type:DataTypes.INTEGER, allowNull: false, autoIncrement: true},
    username: { type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, allowNull:false},
    password: { type: DataTypes.INTEGER, allowNull:false},
})

export default User

console.log(User === sequelize.models.User)