import { useState, useEffect } from "react";
import BarWrap from "./components/BarWrap";
import "./App.css";

function App() {
  const [isclicked, setIsClicked] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [display, setDisplay] = useState({
    grouping: "status",
    ordering: "priority",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://api.quicksell.co/v1/internal/frontend-assignment"
    );
    const response = await data.json();
    const tickets = response["tickets"];
    const groupedAndOrderedData = groupAndOrderTickets(
      tickets,
      display.grouping,
      display.ordering
    );
    console.log(groupedAndOrderedData);
    setFilteredData(groupedAndOrderedData);
    setTickets(tickets);
  };

  const filterDataHandler = (grouping, ordering) => {
    const groupedAndOrderedData = groupAndOrderTickets(
      tickets,
      grouping,
      ordering
    );
    setDisplay({ grouping, ordering });
    setFilteredData(groupedAndOrderedData);
    console.log(groupedAndOrderedData);
  };

  function groupAndOrderTickets(tickets, grouping, ordering) {
    const result = [];

    const groupedData = {};
    console.log(grouping);
    tickets.forEach((ticket) => {
      const required = ticket[grouping];

      // If the status group doesn't exist, creates an empty array for it
      if (!groupedData[required]) {
        groupedData[required] = [];
      }

      // Pushing the ticket data into the corresponding status group
      groupedData[required].push({
        id: ticket.id,
        title: ticket.title,
        tag: ticket.tag,
        userId: ticket.userId,
        priority: ticket.priority,
        status: ticket.status,
      });
    });

    // Sort tickets within each status group
    Object.keys(groupedData).forEach((val) => {
      groupedData[val] = groupedData[val].sort((a, b) => {
        if (ordering === "priority") {
          return b.priority - a.priority; // Sorting by priority in descending order
        } else if (ordering === "title") {
          return a.title.localeCompare(b.title); // Sorting by title in ascending order
        }
        return 0;
      });
    });

    for (const key in groupedData) {
      result.push({ [key]: groupedData[key] });
    }

    return result;
  }

  const displayHandler = () => {
    setIsClicked(!isclicked);
  };

  const displayDropDown = () => {
    return (
      <div id="Dropdown" name="dropdown">
        <div>
          <div className="opele">
            <p>Grouping</p>
            <div>
              <select
                value={display.grouping}
                onChange={(e) =>
                  filterDataHandler(e.target.value, display.ordering)
                }
              >
                <option className="gop" value="status">
                  Status
                </option>
                <option className="gop" value="userId">
                  User
                </option>
                <option className="gop" value="priority">
                  Priority
                </option>
              </select>
            </div>
          </div>
          <div className="opele">
            <p>Ordering</p>
            <div>
              <select
                value={display.ordering}
                onChange={(e) =>
                  filterDataHandler(display.grouping, e.target.value)
                }
              >
                <option className="gop" value="priority">
                  Priority
                </option>
                <option className="gop" value="title">
                  Title
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="wrapper">
      <div className="dropdownWrap">
        <div className="display" onClick={displayHandler}>
          <span id="tune" class="material-symbols-outlined">
            tune
          </span>
          <p>Display</p>
          <span id="expand" class="material-symbols-outlined">
            expand_more
          </span>
        </div>
        {isclicked && displayDropDown()}
      </div>
      <BarWrap
        key={display.ordering}
        grouping={display.grouping}
        data={filteredData}
      />
    </div>
  );
}

export default App;
