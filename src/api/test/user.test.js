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
  test("should validate saving a new user successfully", async () => {
    const validUser = new User({
      _id: fakeUserData._id,
      name: fakeUserData.name,
      lastName: fakeUserData.lastName,
      userName: fakeUserData.userName,
      password: fakeUserData.password,
      role: fakeUserData.role,
    });
    const savedUser = await validUser.save();

    validateNotEmpty(savedUser);

    validateStringEquality(savedUser.role.toString(), fakeUserData.role);
    validateStringEquality(savedUser.username, fakeUserData.username);
    validateStringEquality(savedUser.password, fakeUserData.password);
    validateStringEquality(savedUser.firstName, fakeUserData.firstName);
    validateStringEquality(savedUser.lastName, fakeUserData.lastName);
  });

  test("should validate MongoError duplicate error with code 11000", async () => {
    expect.assertions(3);
    const validUser = new User({
      _id: fakeUserData._id,
      name: fakeUserData.name,
      lastName: fakeUserData.lastName,
      userName: fakeUserData.userName,
      password: fakeUserData.password,
      role: fakeUserData.role,
    });

    try {
      await validUser.save();
    } catch (error) {
      const { name, code } = error;
      validateMongoDuplicationError(name, code);
    }
  });

  test("should validate fetching a user successfully", async () => {
    await User.find({ _id: "7e0a8056c9d89830f4911547" })
      .exec()
      .then((user) => {
        validateNotEmpty(user);
      });
  });

  test("should validate updating a user successfully", async () => {
    await User.updateOne(
      { _id: "7e0a8056c9d89830f4911547" },
      { $set: { name: "Mario" } }
    )
      .exec()
      .then((updatedUser) => {
        validateCountResult(updatedUser.modifiedCount, 1);
      });
  });

  /*test("should validate deleting a user successfully", async () => {
    await User.deleteOne({ _id: "7e0a8056c9d89830f4911547" })
      .exec()
      .then((result) => {
        validateCountResult(result.deletedCount, 1);
      });
  });*/
});
