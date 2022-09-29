import axios from 'axios';
import { useEffect, useState } from 'react';
import { evaluate } from '../shared/help-functions';
import './index.css';
import { SelectOfHeadTable, SelectOfCondition } from './selects';
import Tbody from './tbody';

export type DataArguments = {
  date: Date,
  name: string,
  quantity: number,
  distance: number
}

export type HeadFieldsArguments = {
  name: 'name' | 'quantity' | 'distance',
  type: 'string' | 'number',
  conditions: string[]
}

const HEAD_FIELDS: HeadFieldsArguments[] = [
  {
    name: 'name',
    type: 'string',
    conditions: ['include'],
  },
  {
    name: 'quantity',
    type: 'number',
    conditions: ['=', '>', '<'],
  }, {
    name: 'distance',
    type: 'number',
    conditions: ['=', '>', '<'],
  },
];

const App = () => {
  const [data, setData] = useState<DataArguments[]>([]);
  const [value, setValue] = useState<string>('');
  const [
    selectedHeaderField, setSelectedHeaderField,
  ] = useState<HeadFieldsArguments>(HEAD_FIELDS[0]);
  const [
    selectedCondition, setSelectedCondition,
  ] = useState<string>(selectedHeaderField.conditions[0]);

  useEffect(() => {
    axios.get('http://localhost:8080/getData').then((res) => {
      setData(res.data);
    });
  }, []);

  const createData = () => {
    axios.get('http://localhost:8080/addData');
  };
  const deleteData = () => {
    axios.get('http://localhost:8080/deleteData');
  };

  const filteredData = data.filter((item) => {
    if (selectedHeaderField.type === 'number') {
      return evaluate(item[selectedHeaderField.name], value, selectedCondition);
    }
    if (value.length === 0) {
      return true;
    }
    return !item.name.indexOf(value);
  });

  return (
    <div className="App">
      <button type="button" onClick={createData}>addData</button>
      <button type="button" onClick={deleteData}>deleteData</button>
      <div>
        Сортировка
        <div>
          <SelectOfHeadTable HEAD_FIELDS={HEAD_FIELDS} set={setSelectedHeaderField} />
          <SelectOfCondition
            set={setSelectedCondition}
            selectedHeaderField={selectedHeaderField}
          />
          <input
            type={selectedHeaderField.type === 'string' ? 'text' : 'number'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
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
        <Tbody filteredData={filteredData} />
      </table>
    </div>
  );
};

export default App;
