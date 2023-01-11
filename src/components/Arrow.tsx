import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ArrowProps, Type } from "../interfaces/arrow.interface";

const Arrow: React.FC<ArrowProps> = ({ type }) => {
  if (type == Type.NEUTRAL) {
    return null;
  }

  if (type == Type.POSITIVE) {
    return <ArrowUpwardIcon color="success" />;
  }

  return <ArrowDownwardIcon color="error" />;
};

export default Arrow;
