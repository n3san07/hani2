
import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useSnack } from '../providers/SnackBar';
const SearchBar = ({ data, onFilter, searchKeys }) => {
  const { setSnack } = useSnack();
  const handleInputChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredData = data.filter((item) =>
      searchKeys.some((key) =>
        item[key].toLowerCase().includes(searchQuery)
      )
    );
    if(filteredData.length == 0){
      setSnack("error","there is no data with that specified");
    }
    onFilter(filteredData);
  };

  return (
    <div>
      <TextField
        label="Search..."
        variant="outlined"
        onChange={handleInputChange}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
    </div>
  );
};

export default SearchBar;
