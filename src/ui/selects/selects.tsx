import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FC } from "react";

interface ISelectUI {
  symbols: {
    [key: string]: string;
  };
  rate: string;
  setRate: (value: string) => void;
}

const SelectUI: FC<ISelectUI> = ({ symbols, rate, setRate }): JSX.Element => {
  const keys = Object.keys(symbols);

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Rate</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Rate"
        value={rate}
        onChange={(e: SelectChangeEvent) => setRate(e.target.value)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {keys.map((key, index) => (
          <MenuItem key={index} value={key}>
            {symbols[key]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectUI;
