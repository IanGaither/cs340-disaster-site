import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { GetTable } from "./DummyData";

const axios_instance = axios.create();
const mock = new MockAdapter(axios_instance);

mock.onGet(/\/api\/\w+/).reply((config) => {
    const elements = config.url.split('/');
    const tableName = elements.pop() || elements.pop();
    return [200, GetTable(tableName)];
});

mock.onPost(/\/api\/\w+/).reply((config) => {
    console.log(config.data);
    return [200]
});

export default axios_instance;