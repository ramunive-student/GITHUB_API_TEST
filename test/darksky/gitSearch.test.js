const { expect } = require('chai');
const Api = require('../../src/api');
let api;

describe('User verifies github scenarios', async () => {
    before(async() => {
        //Actions to perform before each tests
        api = new Api();
    });
    after(async() => {
        //Actions to perform after each tests
    });

    it ('can verify search repositories', async() => {
        const resp = await api.searchRepositories('postman', 'asc', '1');
        // console.log(
        //     '\x1b[36m### Resp: %s\x1b[0m',
        //     JSON.stringify(resp, null, 2)
        //   );

        expect(resp.total_count).to.be.greaterThan(32550);
        expect(resp.incomplete_results).to.be.false;
        expect(resp.items).to.be.an('array');
        expect(resp.items[0].node_id).to.equal("MDEwOlJlcG9zaXRvcnkyNjU3ODI5NzM=");
    });

    it ('can verify topics values', async() => {
       

        //TODO Verify topics array to have 2 values and values should be [chinese, postman]

        const resp2 = await api.searchRepositories('postman', 'asc', '1');

        let arrLength = resp2.items[0].topics.length;
        //console.log(arrLength);

        let expectedStr1 = 'chinese';
        let expectedStr2 = 'postman';

        const actualTopics = resp2.items[0].topics;

        expect(actualTopics).to.be.an('array');
        expect(arrLength).to.be.equal(2);
        expect(actualTopics).to.have.lengthOf(2);  //this is the better solution because it uses chai lengthOf

        let actualStr1 = actualTopics[0];
        let actualStr2 = actualTopics[1];

        // console.log(`value1 -> ${actualStr1}`);
        // console.log(`value2 -> ${actualStr2}`)

        expect(actualStr1).to.be.equal(expectedStr1);
        expect(actualStr2).to.be.equal(expectedStr2);

        const expectedTopics = ['chinese', 'postman'];
        expect(actualTopics).to.deep.equal(expectedTopics); // this is the better solution


    });

    it ('can verify user login details', async() => {

        let user = 'ramunive-student';
        //let user = 'mmuntakim15';

        let expectedId = 114707010;

        const resp = await api.getUserInfo(user);

        let actualId = resp.id;

        expect(resp.login).to.equal(user);
        expect(resp.id).to.equal(expectedId);

    });




})