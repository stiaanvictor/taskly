import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/calendarStyles.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { useState, useEffect } from "react";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function MainCalendar({ setGlobalDate, tasks }) {
  const [currDate, setCurrDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDaySelect = (date) => {
    setSelectedDate(date);
    setGlobalDate(date);
  };

  // --------------------------------------
  // CUSTOM DATE HEADER FOR MONTH VIEW
  // --------------------------------------
  const DateHeader = ({ label, date }) => {
    // Ignore weekday headers (they don't belong to the same month)
    if (date.getMonth() !== currDate.getMonth()) {
      return <span>{label}</span>;
    }

    const dayTasks = tasks.filter(
      (t) => new Date(t.dueDate).toDateString() === date.toDateString()
    );

    if (dayTasks.length === 0) {
      return (
        <span
          className="cursor-pointer"
          onClick={() => {
            setSelectedDate(date);
            setGlobalDate(date);
          }}
        >
          {label}
        </span>
      );
    }

    const now = new Date();

    const hasOverdue = dayTasks.some(
      (t) => !t.done && new Date(t.dueDate) < now
    );
    const hasImportant = dayTasks.some(
      (t) => t.priority === "important" && !t.done
    );
    const allDone = dayTasks.every((t) => t.done);

    let colorClass = "text-primary";

    if (hasOverdue) colorClass = "text-error";
    else if (hasImportant) colorClass = "text-attention";
    else if (allDone) colorClass = "text-success";

    return (
      <span
        className={colorClass + " cursor-pointer"}
        onClick={() => {
          setSelectedDate(date);
          setGlobalDate(date);
        }}
      >
        {label}
      </span>
    );
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        date={currDate}
        onNavigate={(newDate) => setCurrDate(newDate)}
        events={[]}
        defaultView="month"
        views={["month"]}
        selectable
        onSelectSlot={(slot) => onDaySelect(slot.start)}
        className="main-calendar"
        components={{
          month: {
            dateHeader: DateHeader,
          },
        }}
      />
    </div>
  );
}

export default MainCalendar;
