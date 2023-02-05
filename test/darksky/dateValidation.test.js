const { expect } = require("chai");
const Api = require("../../src/api");
const moment = require("moment/moment");
let api;

describe("Verify dates within github search repository functionality", async () => {
  before(async () => {
    //Actions to perform before each test
    api = new Api();
  });

  after(async () => {
    //Actions to perform after each test
  });

  it.only("Validate search repository created_at date is not greater than updated_at date", async () => {
    const resp = await api.searchRepositories("postman", "asc", "1");

    // console.log(
    //     '\x1b[36m### Resp: %s\x1b[0m',
    //     JSON.stringify(resp, null, 2)
    //   );

    //TODO Make a Dates file under src/util and create methods to use. Could you also use DIFFERENCE function from moment?

    const createdAtDate = resp.items[0].created_at;
    //console.log(`createdAtDate -> ${createdAtDate}`);

    const updatedAtDate = resp.items[0].updated_at;
    //console.log(`updatedAtDate -> ${updatedAtDate}`);

    let isCreatedDateBeforeUpdatedDate =
      moment(createdAtDate).isBefore(updatedAtDate);

    expect(
      isCreatedDateBeforeUpdatedDate,
      "created_at date is not greater than updated_at date"
    ).to.be.true;
  });
});
