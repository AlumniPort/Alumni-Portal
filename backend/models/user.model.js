module.exports = (sequelize, DataTypes) => {
  const UserVerification = sequelize.define('user_verification', {
    verification_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    middle_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING, allowNull: false },
    birth_date: { type: DataTypes.DATE, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    enrollment_number: { type: DataTypes.STRING, allowNull: false },
    batch_year: { type: DataTypes.INTEGER, allowNull: false },
    course_of_study: { type: DataTypes.STRING, allowNull: false },
    branch: { type: DataTypes.STRING },
    verification_status: { type: DataTypes.STRING, defaultValue: 'Pending' },
    submitted_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    user_id: { type: DataTypes.STRING, unique: true, allowNull: false }
  }, {
    tableName: 'user_verification', 
    timestamps: false
  });

  const UserSignup = sequelize.define('user_signup', {
    user_id: { type: DataTypes.STRING, primaryKey: true },
    full_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    verification_id: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'user_signup', 
    timestamps: false
  });

  const UserData = sequelize.define('user_data', {
    email: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: true }
  }, {
    timestamps: false 
  });

  return { userVerification: UserVerification, userSignup: UserSignup, userData: UserData };
};
