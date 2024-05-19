import { BsBarChartLine, BsCalendar2Check, BsCalendar3, BsCashCoin, BsDoorOpen, BsHouseDoor, BsPerson, BsReverseLayoutTextWindowReverse, BsStack } from "react-icons/bs";

const icons = {
    user: <BsPerson size={20} color="black" />,
    logout: <BsDoorOpen size={20} color="red" />,
    calendar: <BsCalendar3 size={20} />,
    calendarCheck: <BsCalendar2Check size={20} />,
    chart: <BsBarChartLine size={20} />,
    stack: <BsStack size={20} />,
    cash: <BsCashCoin size={20} />,
    house: <BsHouseDoor size={20} />,
    frame: <BsReverseLayoutTextWindowReverse size={20} />,
}

export default icons;