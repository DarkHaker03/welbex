import { IncomingMessage, ServerResponse } from "http";
const db = require('./db');

type DataArguments = {
  date: string,
  name: string,
  quantity: number,
  distance: number
}

const DATA: DataArguments[] = [
  { date: '2023-03-01', name: '1', quantity: 5612, distance: 1234 },
  { date: '2033-08-21', name: '1', quantity: 5612, distance: 3234 },
  { date: '2023-01-25', name: '2', quantity: 212, distance: 234 },
  { date: '2053-06-23', name: '1', quantity: 1512, distance: 1234 },
  { date: '2023-01-15', name: '3', quantity: 312, distance: 134 },
  { date: '2023-04-26', name: '5', quantity: 512, distance: 124 },
  { date: '2183-06-09', name: '1', quantity: 2362, distance: 14 },
  { date: '2063-01-16', name: '2', quantity: 382, distance: 12334 },
  { date: '2323-02-19', name: '1', quantity: 4212, distance: 34 },
  { date: '2123-03-06', name: '3', quantity: 417, distance: 7124 },
  { date: '2023-04-30', name: '5', quantity: 812, distance: 634 },
]

class UserController {
  async createData(req: IncomingMessage, res: ServerResponse) {
    for (const item of DATA) {
      await db.query(`INSERT INTO stations (date,name,quantity, distance) values (${item.date},${item.name},${item.quantity},${item.distance})`)
    }
    res.end("all good!)");
  }
}

module.exports = new UserController();
