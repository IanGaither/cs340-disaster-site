import axios from "axios";

let route = process.env.REACT_APP_SERVER_LOCATION + ':';
route += process.env.REACT_APP_SERVER_PORT;
route += process.env.REACT_APP_DB_PATH_ROOT;

const DatabaseInterface = 
{
    Create: function(tableName, rowValues)
    {
        return axios.post(route + tableName, {newRow: rowValues});
    },
    Read: function(tableName)
    {
        return axios.get(route + tableName);
    },
    Update: function(tableName, rowID, rowValues)
    {
        return axios.put(route + tableName + "?row=" + rowID.toString(), {newRow: rowValues});
        // console.log({
        //     row: rowID,
        //     data: rowValues
        // })
    },
    Delete: function(tableName, rowID)
    {
        return axios.delete(route + tableName + "?row=" + rowID.toString());
        // console.log({
        //     row: rowID,
        // })
    },
    Reset: function()
    {
        return axios.get(route + 'reset');
    },
    Search: function(tableName, searchField, searchValue)
    {
        return axios.get(route + tableName + '/search?field=' + searchField + '&value=' + searchValue);
    }
};

export default DatabaseInterface;