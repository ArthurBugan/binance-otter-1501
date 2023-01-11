import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVertRounded";

import IconRow from "./IconRow";

import { useAppDispatch, useAppSelector } from "../hooks";
import { setGrouping, selectGrouping } from "../store/orderbook";

const Header = () => {
  const dispatch = useAppDispatch();
  const group: number = useAppSelector(selectGrouping);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value: number) => {
    if (typeof value === "number") {
      dispatch(setGrouping(value));
    }
    setAnchorEl(null);
  };

  const options = [0.01, 0.1, 1, 10, 50, 100];

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <IconRow />
      </Grid>
      <Grid xs={4} item>
        <Box display="flex" justifyContent="flex-end">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {group}
            <ArrowDropDownIcon />
          </Button>

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="false"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {options.map((o) => (
              <MenuItem
                key={o}
                selected={o === group}
                onClick={() => handleClose(o)}
              >
                {o}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Header;
