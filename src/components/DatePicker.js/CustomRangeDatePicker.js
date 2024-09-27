import React, { useState } from "react";
import { DatePicker, Popover, Button, Space } from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";

const { RangePicker } = DatePicker;

const getPredefinedRange = (type) => {
  const today = dayjs();
  switch (type) {
    case "last7days":
      return [today.subtract(7, "day"), today];
    case "previousWeek":
      const startOfLastWeek = today.subtract(1, "week").startOf("week");
      const endOfLastWeek = today.subtract(1, "week").endOf("week");
      return [startOfLastWeek, endOfLastWeek];
    case "currentMonth":
      return [today.startOf("month"), today.endOf("month")];
    case "nextMonth":
      const startOfNextMonth = today.add(1, "month").startOf("month");
      return [startOfNextMonth, startOfNextMonth.endOf("month")];
    default:
      return [null, null];
  }
};

const predefinedRanges = {
  "Last 7 Days": "last7days",
  "Previous Week": "previousWeek",
  "Current Month": "currentMonth",
  "Next Month": "nextMonth",
};

const CustomDateRangePicker = () => {
  const [dates, setDates] = useState([]);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleRangeClick = (type) => {
    const range = getPredefinedRange(type);
    setDates(range);
    setCalendarVisible(false);
  };

  const rangeButtons = (
    <div style={{ padding: "10px" }}>
      {Object.keys(predefinedRanges).map((label) => (
        <Button
          key={predefinedRanges[label]}
          onClick={() => handleRangeClick(predefinedRanges[label])}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        >
          {label}
        </Button>
      ))}
    </div>
  );

  const renderCalendar = () => (
    <>
      <div>
        <div style={{ marginBottom: "10px" }}>
          <Popover
            content={rangeButtons}
            title="Select Predefined Range"
            trigger="click"
            visible={calendarVisible}
            onVisibleChange={(visible) => setCalendarVisible(visible)}
          >
            <Button>Select Predefined Range</Button>
          </Popover>
        </div>
        <RangePicker
          format="YYYY-MM-DD"
          value={dates}
          onChange={(value) => setDates(value)}
          style={{ width: "100%" }}
        />
      </div>
    </>
  );

  return <div>{renderCalendar()}</div>;
};

export default CustomDateRangePicker;
