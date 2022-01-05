const Team = require("../models/team");
const { fakeTeamData } = require("../fixtures/fakeTeamData");
const {
  validateNotEmpty,
  validateStringEquality,
  validateMongoDuplicationError,
  validateCountResult,
} = require("../utils/test-utils/validators.util");
const { dbConnect, dbDisconnect } = require("../utils/test-utils/db-handler");

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe("Team Model Test Suite", () => {
  test("should validate saving a new Team successfully", async () => {
    const validTeam = new Team({
      _id: fakeTeamData._id,
      name: fakeTeamData.name,
    });
    const savedTeam = await validTeam.save();

    validateNotEmpty(savedTeam);

    validateStringEquality(savedTeam.name, fakeTeamData.name);
  });

  test("should validate MongoError duplicate error with code 11000", async () => {
    expect.assertions(3);
    const validTeam = new Team({
      _id: fakeTeamData._id,
      name: fakeTeamData.name,
    });

    try {
      await validTeam.save();
    } catch (error) {
      const { name, code } = error;
      validateMongoDuplicationError(name, code);
    }
  });

  test("should validate fetching a Team successfully", async () => {
    await Team.find({ _id: "8b0a7922c9d89830f4911578" })
      .exec()
      .then((team) => {
        validateNotEmpty(team);
      });
  });

  test("should validate updating a Team successfully", async () => {
    await Team.updateOne(
      { _id: "8b0a7922c9d89830f4911578" },
      { $set: { name: "Boss" } }
    )
      .exec()
      .then((updatedTeam) => {
        validateCountResult(updatedTeam.modifiedCount, 1);
      });
  });

  /*test("should validate deleting a user successfully", async () => {
    await Team.deleteOne({ _id: "8b0a7922c9d89830f4911578" })
      .exec()
      .then((result) => {
        validateCountResult(result.deletedCount, 1);
      });
  });*/
});
