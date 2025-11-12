import { useEffect, useState } from "react";
import "./EmployeeTable.css";

const Employee_api =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export const EmployeTable = () => {
    const [list, setList] = useState([]);
  const [isprev, setIsPrev] = useState(true);
  const [isnext, setIsNext] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

    const fetchEmployee = async () => {
      try {
        const response = await fetch(Employee_api);
        const data = await response.json();
        setList(data);
      } catch (error) {
        alert("Error fetching employee data:", error)
        console.error("Error fetching employee data:", error);
      }
      setIsNext(false)
    };

  useEffect(() => {
    fetchEmployee();
  }, []);

  useEffect(() => {
      
    const stop = Math.floor(list.length / 10) * 10;
    console.log("startIndex", startIndex);
    console.log("stop", stop);
    console.log("endIndex", endIndex);
    console.log("----------------------------------");

    if ((startIndex === 10) & (endIndex === 20)) {
      setIsPrev(false);
    }
    if ((startIndex === 0) & (endIndex === 10)) {
      setIsPrev(true);
    }
    if(startIndex === stop)
    {
        setIsNext(true)
    }
    if(endIndex === stop)
    {
        setIsNext(false)
    }
  }, [startIndex, endIndex, list.length]);

  const handlePrevious = () => {
    setStartIndex(startIndex - 10);
    setEndIndex(endIndex - 10);
  };

  const handleNext = () => {
    setStartIndex(startIndex + 10);
    setEndIndex(endIndex + 10);
  };

  return (
    <div className="table_div">
      <table>
        <thead>
          <tr className="t_head">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {list.slice(startIndex, endIndex).map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagi_div">
        <button
          disabled={isprev}
          className={isprev ? "pagi_btn_anabled" : "pagi_btn_disabled"}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <p className="pagi_num">1</p>
        <button
          disabled={isnext}
          className={isnext ? "pagi_btn_anabled" : "pagi_btn_disabled"}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
