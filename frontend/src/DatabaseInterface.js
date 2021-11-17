import axios from "axios";

let route = process.env.REACT_APP_SERVER_LOCATION + ':';
route += process.env.REACT_APP_SERVER_PORT;
route += process.env.REACT_APP_DB_PATH_ROOT;

const DatabaseInterface = 
{
    Create: function()
    {

    },
    Read: function(tableName)
    {
        return axios.get(route + tableName);
    },
    Update: function()
    {

    },
    Delete: function()
    {

    }
};

export default DatabaseInterface;