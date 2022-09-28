const db = require('./db');

export type DataArguments = {
  date: string,
  name: string,
  quantity: number,
  distance: number
}

const DATA: DataArguments[] = [
  { date: '2023-02-01', name: 'Timur', quantity: 5612, distance: 1234 },
  { date: '2033-08-21', name: 'Alisa', quantity: 5612, distance: 3234 },
  { date: '2023-01-25', name: 'Denis', quantity: 212, distance: 234 },
  { date: '2053-06-23', name: 'Bogdan', quantity: 1512, distance: 1234 },
  { date: '2023-01-15', name: 'Lili', quantity: 312, distance: 134 },
  { date: '2023-04-26', name: 'Radmil', quantity: 512, distance: 124 },
  { date: '2183-06-09', name: 'Ramzes', quantity: 2362, distance: 14 },
]

class UserController {
  async addData() {
    for (const item of DATA) {
      await db.query(`INSERT INTO stations (date,name,quantity, distance) values ('${item.date}','${item.name}',${item.quantity},${item.distance})`)
    }
  }
  async getData() {
    const data = await db.query('SELECT * FROM stations');
    return data.rows;
  }
  async deleteData() {
    await db.query('DELETE FROM stations')
  }
}

module.exports = new UserController();
