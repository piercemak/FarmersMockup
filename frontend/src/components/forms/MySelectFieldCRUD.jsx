import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Controller} from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText';




export default function MySelectFieldCRUD(props) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const { label, name, width, control, options } = props;
  return (
    
        <Controller
          name={name}
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
          }) => (
            <FormControl variant="standard" sx={{ width:{width}}}>
            <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>  
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={value}
                error = {!!error}
                helperText = {error?.message}
                onChange={onChange}
              >
                {
                  options.map((option) => (
                    <MenuItem value={option.id}>{option.name}</MenuItem>
                  ))
                }

              </Select>
              <FormHelperText sx={{color:"#d32f2f"}}>{error?.message}</FormHelperText>
            </FormControl>
          )}

        />
  );
}
