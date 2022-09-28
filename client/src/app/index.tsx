import axios from 'axios';
import { useEffect, useState } from 'react';
import './index.css';

type DataArguments = {
  date: string,
  name: string,
  quantity: number,
  distance: number
}

type HeadFieldsArguments = 'name' | 'quantity' | 'distance';

const HEAD_FIELDS: string[] = ['name', 'quantity', 'distance'];
const CONDITIONS: string[] = ['=', 'include', '>', '<'];

function App() {
  const [data, setData] = useState<DataArguments[]>([]);
  const [value, setValue] = useState<number | string>('');
  const [selectedHeaderField, setSelectedHeaderField] = useState<string>('name');
  const [selectedCondition, setSelectedCondition] = useState<string>('=');
  useEffect(() => {
    axios.get('http://localhost:8080/getData').then((res) => {
      console.log(res.data);
      setData(res.data);
    })
  }, [])
  const createData = () => {
    axios.get('http://localhost:8080/createData');
  }
  const deleteData = () => {
    axios.get('http://localhost:8080/deleteData');
  }
  const filteredData = data.filter((item) => {
    if (selectedHeaderField === 'quantity' || selectedHeaderField === 'distance') {
      if (selectedCondition === '=') {
        return item[selectedHeaderField] == value;
      } else if (selectedCondition === '>') {
        return item[selectedHeaderField] > value;
      } else if (selectedCondition === '<') {
        return item[selectedHeaderField] < value;
      }
    } else {
      if (typeof value === 'string') {
        if (value.length === 0) {
          return true
        }
        return !item.name.indexOf(value);
      }
    }
    return false;
  })
  console.log(filteredData);
  console.log(selectedHeaderField);
  console.log(selectedCondition);
  console.log(value);

  return (
    <div className="App">
      <button onClick={createData}>createData</button>
      <button onClick={deleteData}>deleteData</button>
      <div>
        Сортировка
        <div>
          <select
            onChange={(e) => setSelectedHeaderField(e.target.value)}
          >
            {HEAD_FIELDS.map((value) => (
              <option value={value}>{value}</option>
            ))}
          </select>
          <select
            onChange={(e) => setSelectedCondition(e.target.value)}
          >
            {
              selectedHeaderField !== 'name'
                ?
                CONDITIONS.map((value) => (
                  value !== 'include'
                    ? <option value={value}>{value}</option>
                    : null
                ))
                : <option>include</option>
            }
          </select>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>date</th>
            <th>quanity</th>
            <th>distance</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>{item.quantity}</td>
              <td>{item.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
