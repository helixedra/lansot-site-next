import { RiHomeSmile2Line } from "react-icons/ri";
import classes from "./ShowroomBadge.module.css";
import ui from "@/app/data/ui";

export default function ShowroomBadge({ locale }) {
  return (
    <div className={classes.showroom_badge}>
      <RiHomeSmile2Line /> {ui.global.showroom[locale]}
    </div>
  );
}
