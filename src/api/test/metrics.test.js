const Metric = require("../models/metrics");
const { fakeMetricData } = require("../fixtures/fakeMetricsData");
const {
  validateNotEmpty,
  validateStringEquality,
  validateCountResult,
} = require("../utils/test-utils/validators.util");
const { dbConnect, dbDisconnect } = require("../utils/test-utils/db-handler");

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe("Metrics Model Test Suite", () => {
  test("should validate saving a new metric successfully", async () => {
    const validMetric = new Metric({
      _id: fakeMetricData._id,
      workedTickets: fakeMetricData.workedTickets,
      workedHours: fakeMetricData.workedHours,
      year: fakeMetricData.year,
      month: fakeMetricData.month,
      team: fakeMetricData.team,
      weekEndingDay: fakeMetricData.weekEndingDay,
      plannedUnits: fakeMetricData.plannedUnits,
      availableTime: fakeMetricData.availableTime,
      verifiedTickets: fakeMetricData.verifiedTickets,
      rejectedTickets: fakeMetricData.rejectedTickets,
      user: fakeMetricData.user,
    });
    const savedMetric = await validMetric.save();

    validateNotEmpty(savedMetric);

    validateStringEquality(savedMetric.team, fakeMetricData.team);
    validateStringEquality(savedMetric.user, fakeMetricData.user);
    validateStringEquality(
      savedMetric.verifiedTickets.toString(),
      fakeMetricData.verifiedTickets.toString()
    );
    validateStringEquality(
      savedMetric.rejectedTickets.toString(),
      fakeMetricData.rejectedTickets.toString()
    );
    validateStringEquality(
      savedMetric.plannedUnits.toString(),
      fakeMetricData.plannedUnits.toString()
    );
  });

  test("should validate fetching a metric successfully", async () => {
    await Metric.find({ _id: "5962a5f37bde228394da6f74" })
      .exec()
      .then((metric) => {
        validateNotEmpty(metric);
      });
  });

  test("should validate updating a metric successfully", async () => {
    await Metric.updateOne(
      { _id: "5962a5f37bde228394da6f74" },
      { $set: { workedHours: 40 } }
    )
      .exec()
      .then((updatedMetric) => {
        validateCountResult(updatedMetric.modifiedCount, 1);
      });
  });

  test("should validate deleting a metric successfully", async () => {
    await Metric.deleteOne({ _id: "5962a5f37bde228394da6f74" })
      .exec()
      .then((result) => {
        validateCountResult(result.deletedCount, 1);
      });
  });
});
