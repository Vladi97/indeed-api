const Role = require("../models/role");
const { fakeRoleData } = require("../fixtures/fakeRoleData");
const {
  validateNotEmpty,
  validateStringEquality,
  validateMongoDuplicationError,
  validateCountResult,
} = require("../utils/test-utils/validators.util");
const { dbConnect, dbDisconnect } = require("../utils/test-utils/db-handler");

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe("Role Model Test Suite", () => {
  test("should validate saving a new role successfully", async () => {
    const validRole = new Role({
      _id: fakeRoleData._id,
      name: fakeRoleData.name,
    });
    const savedRole = await validRole.save();

    validateNotEmpty(savedRole);

    validateStringEquality(savedRole.name, fakeRoleData.name);
  });

  test("should validate MongoError duplicate error with code 11000", async () => {
    expect.assertions(3);
    const validRole = new Role({
      _id: fakeRoleData._id,
      name: fakeRoleData.name,
    });

    try {
      await validRole.save();
    } catch (error) {
      const { name, code } = error;
      validateMongoDuplicationError(name, code);
    }
  });

  test("should validate fetching a role successfully", async () => {
    await Role.find({ _id: "5962a5f37bde228394da6f72" })
      .exec()
      .then((role) => {
        validateNotEmpty(role);
      });
  });

  test("should validate updating a role successfully", async () => {
    await Role.updateOne(
      { _id: "5962a5f37bde228394da6f72" },
      { $set: { name: "Boss" } }
    )
      .exec()
      .then((updatedRole) => {
        validateCountResult(updatedRole.modifiedCount, 1);
      });
  });

  test("should validate deleting a user successfully", async () => {
    await Role.deleteOne({ _id: "5962a5f37bde228394da6f72" })
      .exec()
      .then((result) => {
        validateCountResult(result.deletedCount, 1);
      });
  });
});
