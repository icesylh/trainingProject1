import { Select, MenuItem, SelectChangeEvent, Box, ListItemIcon, Typography } from '@mui/material';
import { CustomButton } from '../Button/CustomButton';
import Check from '@mui/icons-material/Check';

interface SortDropdownProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  isAdmin: boolean; 
  onAddProduct: () => void;
}

const dropDownBox = {
  display: 'flex',
  gap: '16px',
};

const select = {
  width: 179,
  height: 40,
  textAlign: 'center',
};

export const SortDropDown = ({ value, onChange, isAdmin, onAddProduct }: Readonly<SortDropdownProps>) => {
  return (
    <Box sx={dropDownBox}>
      <Select
        value={value}
        onChange={onChange}
        sx={select}
        renderValue={(selected) => {
          switch (selected) {
            case 'lastAdded':
              return 'Last added';
            case 'priceLowToHigh':
              return 'Price: low to high';
            case 'priceHighToLow':
              return 'Price: high to low';
            default:
              return selected;
          }
        }}
      >
        <MenuItem value="lastAdded">
          <ListItemIcon>
            {value === "lastAdded" && <Check fontSize="small" />}
          </ListItemIcon>
          <Typography>Last added</Typography>
        </MenuItem>
        <MenuItem value="priceLowToHigh">
          <ListItemIcon>
            {value === "priceLowToHigh" && <Check fontSize="small" />}
          </ListItemIcon>
          <Typography>Price: low to high</Typography>
        </MenuItem>
        <MenuItem value="priceHighToLow">
          <ListItemIcon>
            {value === "priceHighToLow" && <Check fontSize="small" />}
          </ListItemIcon>
          <Typography>Price: high to low</Typography>
        </MenuItem>
      </Select>
      {isAdmin && (
        <CustomButton
          width="133px"
          height="40px"
          text="Add Product"
          isBold={true}
          onClick={onAddProduct}
        />
      )}
    </Box>
  );
};
