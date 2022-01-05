const User = require("../models/user");
const { fakeUserData } = require("../fixtures/fakeUserData");
const {
  validateNotEmpty,
  validateStringEquality,
  validateMongoDuplicationError,
  validateCountResult,
} = require("../utils/test-utils/validators.util");
const { dbConnect, dbDisconnect } = require("../utils/test-utils/db-handler");

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe("User Model Test Suite", () => {
  test("should validate saving a new lead user successfully", async () => {
    const validStudentUser = new User({
      _id: fakeUserData._id,
      name: fakeUserData.name,
      lastName: fakeUserData.lastName,
      userName: fakeUserData.userName,
      password: fakeUserData.password,
      role: fakeUserData.role,
    });
    const savedStudentUser = await validStudentUser.save();

    validateNotEmpty(savedStudentUser);

    validateStringEquality(savedStudentUser.role, fakeUserData.role);
    validateStringEquality(savedStudentUser.username, fakeUserData.username);
    validateStringEquality(savedStudentUser.password, fakeUserData.password);
    validateStringEquality(savedStudentUser.firstName, fakeUserData.firstName);
    validateStringEquality(savedStudentUser.lastName, fakeUserData.lastName);
  });

  test("should validate MongoError duplicate error with code 11000", async () => {
    expect.assertions(3);
    const validStudentUser = new User({
      _id: fakeUserData._id,
      name: fakeUserData.name,
      lastName: fakeUserData.lastName,
      userName: fakeUserData.userName,
      password: fakeUserData.password,
      role: fakeUserData.role,
    });

    try {
      await validStudentUser.save();
    } catch (error) {
      const { name, code } = error;
      validateMongoDuplicationError(name, code);
    }
  });

  test("should validate fetching a user successfully", async () => {
    await User.find({ _id: "5962a5f37bde228394da6f72" })
      .exec()
      .then((user) => {
        validateNotEmpty(user);
      });
  });

  test("should validate updating a user successfully", async () => {
    await User.updateOne(
      { _id: "5962a5f37bde228394da6f72" },
      { $set: { name: "Mario" } }
    )
      .exec()
      .then((updatedUser) => {
        validateCountResult(updatedUser.modifiedCount, 1);
      });
  });

  test("should validate deleting a user successfully", async () => {
    await User.deleteOne({ _id: "5962a5f37bde228394da6f72" })
      .exec()
      .then((result) => {
        validateCountResult(result.deletedCount, 1);
      });
  });
});
